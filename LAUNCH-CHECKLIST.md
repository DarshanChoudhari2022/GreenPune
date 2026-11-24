# GreenPune launch checklist

Updated 22 November 2026.

## Implemented

- The custom 404 links back to the main pages. The public footer shares an aligned layout, contact links, privacy link, and a static faded GreenPune wordmark.
- The homepage, About, Register, FAQ, Privacy, Events, Gallery, and confirmation page each have a title, description, canonical URL, and social metadata. The generated share image is 1200 x 630.
- The sitemap lists the seven indexable pages. The confirmation and admin pages are noindex and are not listed in the sitemap. Robots points to the sitemap.
- The registration API validates input, discards honeypot submissions, and rate-limits requests. The form advances after a successful save. Web3Forms, when configured, sends an optional notification; the saved registration is the authoritative record.
- The site does not load GA4 or display an analytics consent dialog. The privacy page identifies Web3Forms, describes the admin session cookie, and lists the existing GreenPune contact details.
- Existing FAQ content remains in place. No testimonials, customer photos, ratings, or review schema were invented.

## Checked locally

- Production build, eight public route responses and their metadata, public image alt attributes, sitemap, robots, custom HTTP 404, and anonymous admin redirect.
- Footer at 320, 390, 768 and 1440 pixels; archive navigation and layout, gallery preview, and forwarding from the former home-page gallery link.
- Malformed and invalid registration requests, honeypot response, and rate limit. No valid registration was sent.

## Before production launch

1. **Admin access:** Set `ADMIN_PASSWORD` in the host environment. A unique, randomly generated password of at least 16 characters is recommended. Production login is disabled without a configured password. Existing admin sessions must sign in again. Put a host-side rate limit on the admin sign-in route.
2. **Durable storage:** Apply `supabase-schema.sql` and configure the Supabase URL, service role key and table names in the host. Set `SUPABASE_EVENTS_TABLE=events` for publishing to persist. Verify a test entry is visible in admin, and test publishing an event, editing questions, and uploading gallery media on staging. Question editing uses a local file and needs a persistent writable filesystem or a cloud-backed store. Custom answers beyond the built-in tree question are not persisted by the current cloud registration insert.
3. **Notification delivery:** When using Web3Forms, configure `WEB3FORMS_ACCESS_KEY` on the host (the legacy public name still works; prefer the server-only name). Check the provider plan and domain restrictions. Submit one authorized test registration and confirm the saved record, redirect and inbox notification separately. No real submission or email was sent during the local checks.
4. **Analytics:** GA4 is not installed. Remove any unused measurement ID from the hosting environment and confirm no tracking tag is injected by the host. Use stored registrations as the authoritative count.
5. **Domain and indexing:** The live www site, sitemap and robots responded with HTTP 200; the tested apex and HTTP variants reached the www site. Recheck redirects and certificates after deploy. Keep `NEXT_PUBLIC_SITE_URL=https://www.greenpune.in` for that deployment. Verify the domain in Google Search Console through DNS or set `GOOGLE_SITE_VERIFICATION` to the HTML-tag token, then submit the production sitemap.
6. **Privacy and content:** Confirm coordinator details and FAQ claims, review the actual processor and retention arrangements, and get permission and exact wording before publishing testimonials. Preview the live sharing card in WhatsApp and LinkedIn.

## Operational limitations

- Production gallery uploads require `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` on the host. Run the gallery portion of `supabase-schema.sql` in Supabase SQL Editor to provision the public `gallery-media` bucket and gallery metadata columns. Keep the service-role key server-only. The admin browser compresses eligible photos and videos before upload; the final file must be 4 MB or less. Keep original proof files separately. The public gallery groups media by upload date in India time, not the date the photo or video was taken. Existing bundled media remains visible without a migration.

- The registration rate limit runs per server instance and resets on restart. Use a host/WAF rule or shared limit store for sustained abuse protection. Local JSON files are unsuitable for durable writes on ephemeral hosts.
- Production credentials, staging writes, inbox delivery and Search Console verification are not confirmed by local checks.
