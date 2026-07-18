# Wedding website

## RSVP backend

The React form posts to `/api/rsvp`. Vercel serves that endpoint as a serverless function, which validates the RSVP and appends it to Google Sheets. Google credentials remain on the server.

### Google setup

1. In Google Cloud, create a project, enable the **Google Sheets API**, and create a service account.
2. Create a JSON key for the service account. Copy its `client_email` and `private_key` values.
3. Create a spreadsheet with a tab named `RSVPs` (or use another tab name in `GOOGLE_SHEET_TAB`). Add this header row: `Submitted at`, `Name`, `Email`, `Phone`, `Attendance`, `Guests`, `Message`, `Relationship`. A two-person RSVP creates two rows; the second is marked as the primary guest's guest.
4. Share the spreadsheet with the service account email as an **Editor**.
5. Copy the spreadsheet ID: the portion between `/d/` and `/edit` in its URL.

### Vercel deployment

1. Push this repository to GitHub and import it into Vercel, or deploy it with the Vercel CLI.
2. Leave the framework preset as **Vite**. The build command is `npm run build` and output directory is `dist`.
3. In **Project Settings → Environment Variables**, add the four values from `.env.example`. For `GOOGLE_PRIVATE_KEY`, paste the full key with literal `\\n` line breaks.
4. Deploy. Vercel deploys the frontend and `api/rsvp.js` together; no separate backend host is needed.

For local testing, put the same values in a private `.env.local` file and run Vercel's local development command so `/api/rsvp` is available.
