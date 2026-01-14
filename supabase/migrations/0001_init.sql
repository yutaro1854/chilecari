create extension if not exists "pgcrypto";

create type public.listing_status as enum ('active', 'reserved', 'sold', 'hidden');
create type public.delivery_method as enum ('mano_a_mano', 'envio');
create type public.transaction_status as enum ('negociando', 'confirmado', 'completado', 'cancelado');
create type public.offer_status as enum ('pending', 'accepted', 'rejected', 'countered');
create type public.notification_type as enum ('price_drop', 'offer', 'transaction');
create type public.report_target_type as enum ('listing', 'user', 'message');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  region text,
  comuna text,
  bio text,
  created_at timestamptz default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz default now()
);

insert into public.categories (name, slug)
values
  ('General', 'general'),
  ('Electronics', 'electronics'),
  ('Home', 'home'),
  ('Fashion', 'fashion');

create table public.listings (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.profiles(id) on delete cascade,
  category_id uuid references public.categories(id),
  title text not null,
  description text,
  price numeric(12, 2) not null,
  currency text default 'CLP',
  status public.listing_status not null default 'active',
  delivery public.delivery_method not null default 'mano_a_mano',
  location text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  search_tsv tsvector generated always as (
    to_tsvector(
      'simple',
      coalesce(title, '') || ' ' || coalesce(description, '')
    )
  ) stored
);

create index listings_search_idx on public.listings using gin (search_tsv);

create table public.listing_images (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  image_url text not null,
  position integer default 0,
  created_at timestamptz default now()
);

create table public.threads (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  buyer_id uuid not null references public.profiles(id) on delete cascade,
  seller_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  unique (listing_id, buyer_id, seller_id)
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.threads(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  contains_link boolean not null default false,
  created_at timestamptz default now()
);

create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null unique references public.threads(id) on delete cascade,
  status public.transaction_status not null default 'negociando',
  created_at timestamptz default now()
);

create table public.ratings (
  id uuid primary key default gen_random_uuid(),
  transaction_id uuid not null references public.transactions(id) on delete cascade,
  rater_id uuid not null references public.profiles(id) on delete cascade,
  ratee_id uuid not null references public.profiles(id) on delete cascade,
  score integer not null check (score between 1 and 5),
  comment text,
  created_at timestamptz default now(),
  unique (transaction_id, rater_id)
);

create table public.favorites (
  user_id uuid not null references public.profiles(id) on delete cascade,
  listing_id uuid not null references public.listings(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, listing_id)
);

create table public.offers (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.threads(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  amount numeric(12, 2) not null,
  status public.offer_status not null default 'pending',
  created_at timestamptz default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type public.notification_type not null,
  data jsonb not null default '{}'::jsonb,
  read_at timestamptz,
  created_at timestamptz default now()
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  target_type public.report_target_type not null,
  target_id uuid not null,
  reason text,
  created_at timestamptz default now()
);

create table public.blocks (
  blocker_id uuid not null references public.profiles(id) on delete cascade,
  blocked_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (blocker_id, blocked_id)
);

create or replace function public.is_blocked(user_a uuid, user_b uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.blocks
    where (blocker_id = user_a and blocked_id = user_b)
       or (blocker_id = user_b and blocked_id = user_a)
  );
$$;

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.listings enable row level security;
alter table public.listing_images enable row level security;
alter table public.threads enable row level security;
alter table public.messages enable row level security;
alter table public.transactions enable row level security;
alter table public.ratings enable row level security;
alter table public.favorites enable row level security;
alter table public.offers enable row level security;
alter table public.notifications enable row level security;
alter table public.reports enable row level security;
alter table public.blocks enable row level security;

create policy "Profiles are public" on public.profiles
  for select using (true);

create policy "Profiles are editable by owner" on public.profiles
  for update using (auth.uid() = id);

create policy "Categories are public" on public.categories
  for select using (true);

create policy "Active listings are public" on public.listings
  for select using (status = 'active' or seller_id = auth.uid());

create policy "Listings are insertable by seller" on public.listings
  for insert with check (auth.uid() = seller_id);

create policy "Listings are updatable by seller" on public.listings
  for update using (auth.uid() = seller_id);

create policy "Listing images are public for active listings" on public.listing_images
  for select using (
    exists (
      select 1 from public.listings
      where listings.id = listing_images.listing_id
        and listings.status = 'active'
    )
    or exists (
      select 1 from public.listings
      where listings.id = listing_images.listing_id
        and listings.seller_id = auth.uid()
    )
  );

create policy "Listing images are manageable by owner" on public.listing_images
  for insert with check (
    exists (
      select 1 from public.listings
      where listings.id = listing_images.listing_id
        and listings.seller_id = auth.uid()
    )
  );

create policy "Listing images are updatable by owner" on public.listing_images
  for update using (
    exists (
      select 1 from public.listings
      where listings.id = listing_images.listing_id
        and listings.seller_id = auth.uid()
    )
  );

create policy "Listing images are deletable by owner" on public.listing_images
  for delete using (
    exists (
      select 1 from public.listings
      where listings.id = listing_images.listing_id
        and listings.seller_id = auth.uid()
    )
  );

create policy "Threads are visible to participants" on public.threads
  for select using (auth.uid() = buyer_id or auth.uid() = seller_id);

create policy "Threads are insertable by participants" on public.threads
  for insert with check (
    (auth.uid() = buyer_id or auth.uid() = seller_id)
    and not public.is_blocked(buyer_id, seller_id)
  );

create policy "Threads are updatable by participants" on public.threads
  for update using (auth.uid() = buyer_id or auth.uid() = seller_id);

create policy "Messages are visible to participants" on public.messages
  for select using (
    exists (
      select 1
      from public.threads
      where threads.id = messages.thread_id
        and (threads.buyer_id = auth.uid() or threads.seller_id = auth.uid())
    )
  );

create policy "Messages are insertable by participants" on public.messages
  for insert with check (
    sender_id = auth.uid()
    and exists (
      select 1
      from public.threads
      where threads.id = messages.thread_id
        and (threads.buyer_id = auth.uid() or threads.seller_id = auth.uid())
        and not public.is_blocked(threads.buyer_id, threads.seller_id)
    )
  );

create policy "Messages are updatable by sender" on public.messages
  for update using (sender_id = auth.uid());

create policy "Transactions are visible to participants" on public.transactions
  for select using (
    exists (
      select 1
      from public.threads
      where threads.id = transactions.thread_id
        and (threads.buyer_id = auth.uid() or threads.seller_id = auth.uid())
    )
  );

create policy "Transactions are insertable by participants" on public.transactions
  for insert with check (
    exists (
      select 1
      from public.threads
      where threads.id = transactions.thread_id
        and (threads.buyer_id = auth.uid() or threads.seller_id = auth.uid())
    )
  );

create policy "Transactions are updatable by participants" on public.transactions
  for update using (
    exists (
      select 1
      from public.threads
      where threads.id = transactions.thread_id
        and (threads.buyer_id = auth.uid() or threads.seller_id = auth.uid())
    )
  );

create policy "Ratings are visible to participants" on public.ratings
  for select using (auth.uid() = rater_id or auth.uid() = ratee_id);

create policy "Ratings are insertable after completion" on public.ratings
  for insert with check (
    auth.uid() = rater_id
    and exists (
      select 1
      from public.transactions
      join public.threads on threads.id = transactions.thread_id
      where transactions.id = ratings.transaction_id
        and transactions.status = 'completado'
        and (threads.buyer_id = auth.uid() or threads.seller_id = auth.uid())
    )
  );

create policy "Favorites are visible to owner" on public.favorites
  for select using (auth.uid() = user_id);

create policy "Favorites are insertable by owner" on public.favorites
  for insert with check (auth.uid() = user_id);

create policy "Favorites are deletable by owner" on public.favorites
  for delete using (auth.uid() = user_id);

create policy "Offers are visible to participants" on public.offers
  for select using (
    exists (
      select 1
      from public.threads
      where threads.id = offers.thread_id
        and (threads.buyer_id = auth.uid() or threads.seller_id = auth.uid())
    )
  );

create policy "Offers are insertable by participants" on public.offers
  for insert with check (
    sender_id = auth.uid()
    and exists (
      select 1
      from public.threads
      where threads.id = offers.thread_id
        and (threads.buyer_id = auth.uid() or threads.seller_id = auth.uid())
    )
  );

create policy "Offers are updatable by participants" on public.offers
  for update using (
    exists (
      select 1
      from public.threads
      where threads.id = offers.thread_id
        and (threads.buyer_id = auth.uid() or threads.seller_id = auth.uid())
    )
  );

create policy "Notifications are visible to owner" on public.notifications
  for select using (auth.uid() = user_id);

create policy "Notifications are updatable by owner" on public.notifications
  for update using (auth.uid() = user_id);

create policy "Reports are visible to reporter" on public.reports
  for select using (auth.uid() = reporter_id);

create policy "Reports are insertable by reporter" on public.reports
  for insert with check (auth.uid() = reporter_id);

create policy "Blocks are visible to blocker" on public.blocks
  for select using (auth.uid() = blocker_id);

create policy "Blocks are insertable by blocker" on public.blocks
  for insert with check (auth.uid() = blocker_id);

create policy "Blocks are deletable by blocker" on public.blocks
  for delete using (auth.uid() = blocker_id);
