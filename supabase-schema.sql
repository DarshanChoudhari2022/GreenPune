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
