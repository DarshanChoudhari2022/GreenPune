# GreenPune Events

Full-stack event portfolio and registration site for GreenPune community events.

## Local Setup

```bash
npm install
npm run dev -- -p 3000
```

Open `http://127.0.0.1:3000`.

## Supabase Setup

1. Open Supabase SQL Editor.
2. Run `supabase-schema.sql`.
3. Create `.env.local`:

```bash
SUPABASE_URL=your-project-url
SUPABASE_SERVICE_ROLE_KEY=your-rotated-service-role-key
SUPABASE_TABLE=event_registrations
```

The service-role key is server-only. Do not expose it in frontend code or public repos.

## Add More Events

Add event entries in `lib/events.ts`. Use real campaign photography or final brand assets for future visual sections.
