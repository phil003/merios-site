create table if not exists contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  subject text not null check (char_length(subject) between 1 and 200),
  message text not null check (char_length(message) between 10 and 4000),
  type text not null check (type in ('general', 'press', 'partnership', 'support')),
  created_at timestamptz not null default now(),
  ip_country text,
  user_agent text
);
alter table contact_inquiries enable row level security;
create policy "insert_anon" on contact_inquiries for insert to anon with check (true);
