import { google } from 'googleapis';

const allowedAttendance = new Set(['yes', 'no']);

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

    const { GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_TAB = 'RSVPs' } = process.env;
    if (!GOOGLE_SHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
        console.error('Google Sheets environment variables are missing.');
        return res.status(500).json({ error: 'RSVP service is not configured yet.' });
    }

    try {
        const auth = new google.auth.JWT({
            email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        const sheets = google.sheets({ version: 'v4', auth });

        await sheets.spreadsheets.values.append({
            spreadsheetId: GOOGLE_SHEET_ID,
            range: `'${GOOGLE_SHEET_TAB.replace(/'/g, "''")}'!A:G`,
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
