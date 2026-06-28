create table if not exists public.event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id text not null,
  name text not null,
  phone text not null,
  address text not null,
  can_bring_tree boolean not null,
  created_at timestamptz not null default now()
);

create index if not exists event_registrations_event_id_idx
  on public.event_registrations (event_id);

alter table public.event_registrations enable row level security;

drop policy if exists "Service role can manage registrations"
  on public.event_registrations;

create policy "Service role can manage registrations"
  on public.event_registrations
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create table if not exists public.events (
  id text primary key,
  title_english text not null,
  title_devanagari text not null,
  organizer text not null,
  organizer_english text not null,
  date date not null,
  date_label text not null,
  date_label_english text not null,
  location text not null,
  location_english text not null,
  theme text not null,
  theme_english text not null,
  summary text not null,
  summary_marathi text not null,
  status text not null check (status in ('open', 'upcoming', 'completed')),
  updated_at timestamptz not null default now()
);

create index if not exists events_status_idx
  on public.events (status);

alter table public.events enable row level security;

drop policy if exists "Service role can manage events"
  on public.events;

create policy "Service role can manage events"
  on public.events
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
