import { google } from 'googleapis';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const allowedAttendance = new Set(['yes', 'no']);
let rateLimiter;

function getRateLimiter() {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
        return null;
    }

    if (!rateLimiter) {
        rateLimiter = new Ratelimit({
            redis: Redis.fromEnv(),
            limiter: Ratelimit.slidingWindow(3, '15 m'),
            prefix: 'wedding:rsvp',
            analytics: true,
        });
    }

    return rateLimiter;
}

function getClientIp(req) {
    const forwardedFor = req.headers['x-forwarded-for'];
    const firstForwardedIp = Array.isArray(forwardedFor)
        ? forwardedFor[0]
        : forwardedFor?.split(',')[0];

    return firstForwardedIp?.trim() || req.headers['x-real-ip'] || 'unknown';
}

function getConfirmedGuestCount(rows) {
    return rows.reduce((total, [attendance, guestCount]) => {
        if (String(attendance).trim().toLowerCase() !== 'yes') {
            return total;
        }

        const guests = Number.parseInt(guestCount, 10);
        return total + (Number.isInteger(guests) && guests > 0 ? guests : 0);
    }, 0);
}

function readBody(body) {
    if (typeof body === 'string') {
        try {
            return JSON.parse(body);
        } catch {
            return {};
        }
    }
    return body || {};
}

function clean(value, maxLength = 500) {
    return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed.' });
    }

    const limiter = getRateLimiter();
    if (!limiter) {
        console.error('Upstash rate-limit environment variables are missing.');
        return res.status(503).json({ error: 'RSVP service is temporarily unavailable.' });
    }

    try {
        const limit = await limiter.limit(getClientIp(req));
        res.setHeader('X-RateLimit-Limit', limit.limit);
        res.setHeader('X-RateLimit-Remaining', Math.max(0, limit.remaining));

        if (!limit.success) {
            const retryAfterSeconds = Math.max(1, Math.ceil((limit.reset - Date.now()) / 1000));
            res.setHeader('Retry-After', retryAfterSeconds);
            return res.status(429).json({
                error: 'Too many RSVP attempts. Please try again in a few minutes.',
            });
        }
    } catch (error) {
        console.error('Rate-limit check failed:', error.message);
        return res.status(503).json({ error: 'RSVP service is temporarily unavailable.' });
    }

    const body = readBody(req.body);
    const name = clean(body.name, 120);
    const email = clean(body.email, 254).toLowerCase();
    const phone = clean(body.phone, 40);
    const message = clean(body.message, 1000);
    const attendance = clean(body.attendance, 3);
    const guestValue = clean(String(body.guests), 1);
    const guests = Number.parseInt(guestValue, 10);

    if (!name || !email || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ error: 'Please provide a valid name and email address.' });
    }

    if (!allowedAttendance.has(attendance) || !/^[12]$/.test(guestValue) || !Number.isInteger(guests)) {
        return res.status(400).json({ error: 'Please provide valid RSVP details.' });
    }

    const {
        GOOGLE_SHEET_ID,
        GOOGLE_SERVICE_ACCOUNT_EMAIL,
        GOOGLE_PRIVATE_KEY,
        GOOGLE_SHEET_TAB = 'RSVPs',
        MAX_ATTENDEES = '1',
    } = process.env;
    const maxAttendees = Number.parseInt(MAX_ATTENDEES, 10);
    if (!GOOGLE_SHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
        console.error('Google Sheets environment variables are missing.');
        return res.status(500).json({ error: 'RSVP service is not configured yet.' });
    }

    if (!Number.isInteger(maxAttendees) || maxAttendees < 1) {
        console.error('MAX_ATTENDEES is invalid.');
        return res.status(500).json({ error: 'RSVP service is not configured yet.' });
    }

    try {
        const auth = new google.auth.JWT({
            email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        const sheets = google.sheets({ version: 'v4', auth });
        const tabRange = `'${GOOGLE_SHEET_TAB.replace(/'/g, "''")}'`;

        const existingRsvps = await sheets.spreadsheets.values.get({
            spreadsheetId: GOOGLE_SHEET_ID,
            range: `${tabRange}!E2:F`,
        });
        const confirmedGuests = getConfirmedGuestCount(existingRsvps.data.values || []);

        if (confirmedGuests >= maxAttendees || (attendance === 'yes' && confirmedGuests + guests > maxAttendees)) {
            return res.status(409).json({
                error: `RSVP is now closed because all ${maxAttendees} seats have been reserved.`,
            });
        }

        await sheets.spreadsheets.values.append({
            spreadsheetId: GOOGLE_SHEET_ID,
            range: `${tabRange}!A:G`,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [[new Date().toISOString(), name, email, phone, attendance, guests, message]],
            },
        });

        return res.status(201).json({ success: true });
    } catch (error) {
        console.error('Unable to append RSVP:', error.message);
        return res.status(502).json({ error: 'Unable to save your RSVP. Please try again.' });
    }
}
