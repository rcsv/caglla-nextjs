-- RLS を有効化
alter table public.trips enable row level security;
alter table public.days enable row level security;
alter table public.itineraries enable row level security;
alter table public.checklists enable row level security;
alter table public.checklist_items enable row level security;

alter table public.profiles enable row level security;

-- 既存ポリシーがあれば一旦消して作り直す（安全に）
-- trips
drop policy if exists trips_select_own on public.trips;
drop policy if exists trips_insert_own on public.trips;
drop policy if exists trips_update_own on public.trips;
drop policy if exists trips_delete_own on public.trips;

-- days
drop policy if exists days_select_own on public.days;
drop policy if exists days_insert_own on public.days;
drop policy if exists days_update_own on public.days;
drop policy if exists days_delete_own on public.days;

-- itineraries
drop policy if exists itineraries_select_own on public.itineraries;
drop policy if exists itineraries_insert_own on public.itineraries;
drop policy if exists itineraries_update_own on public.itineraries;
drop policy if exists itineraries_delete_own on public.itineraries;

-- checklists
drop policy if exists checklists_select_own on public.checklists;
drop policy if exists checklists_insert_own on public.checklists;
drop policy if exists checklists_update_own on public.checklists;
drop policy if exists checklists_delete_own on public.checklists;

-- checklist_items
drop policy if exists checklist_items_select_own on public.checklist_items;
drop policy if exists checklist_items_insert_own on public.checklist_items;
drop policy if exists checklist_items_update_own on public.checklist_items;
drop policy if exists checklist_items_delete_own on public.checklist_items;

-- profiles
drop policy if exists profiles_select_own on public.profiles;
drop policy if exists profiles_insert_own on public.profiles;
drop policy if exists profiles_update_own on public.profiles;
drop policy if exists profiles_delete_own on public.profiles;

-- trips
-- 自分の行だけ見える／作れる／更新できる／消せる
create policy trips_select_own
  on public.trips
  for select
  using (auth.uid() = user_id);

create policy trips_insert_own
  on public.trips
  for insert
  with check (auth.uid() = user_id);

create policy trips_update_own
  on public.trips
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy trips_delete_own
  on public.trips
  for delete
  using (auth.uid() = user_id);

-- days
-- 自分の行だけ見える／作れる／更新できる／消せる
create policy days_select_own
  on public.days
  for select
  using (auth.uid() = (select user_id from public.trips where id = trip_id));

create policy days_insert_own
  on public.days
  for insert
  with check (auth.uid() = (select user_id from public.trips where id = trip_id));

create policy days_update_own
  on public.days
  for update
  using (auth.uid() = (select user_id from public.trips where id = trip_id))
  with check (auth.uid() = (select user_id from public.trips where id = trip_id));

create policy days_delete_own
  on public.days
  for delete
  using (auth.uid() = (select user_id from public.trips where id = trip_id));

-- itineraries
-- 自分の行だけ見える／作れる／更新できる／消せる
create policy itineraries_select_own
  on public.itineraries
  for select
  using (auth.uid() = (select user_id from public.trips where id = (select trip_id from public.days where id = day_id)));

create policy itineraries_insert_own
  on public.itineraries
  for insert
  with check (auth.uid() = (select user_id from public.trips where id = (select trip_id from public.days where id = day_id)));

create policy itineraries_update_own
  on public.itineraries
  for update
  using (auth.uid() = (select user_id from public.trips where id = (select trip_id from public.days where id = day_id)))
  with check (auth.uid() = (select user_id from public.trips where id = (select trip_id from public.days where id = day_id)));

create policy itineraries_delete_own
  on public.itineraries
  for delete
  using (auth.uid() = (select user_id from public.trips where id = (select trip_id from public.days where id = day_id)));

-- checklists
-- 自分の行だけ見える／作れる／更新できる／消せる
create policy checklists_select_own
  on public.checklists
  for select
  using (auth.uid() = (select user_id from public.trips where id = trip_id));

create policy checklists_insert_own
  on public.checklists
  for insert
  with check (auth.uid() = (select user_id from public.trips where id = trip_id));

create policy checklists_update_own
  on public.checklists
  for update
  using (auth.uid() = (select user_id from public.trips where id = trip_id))
  with check (auth.uid() = (select user_id from public.trips where id = trip_id));

create policy checklists_delete_own
  on public.checklists
  for delete
  using (auth.uid() = (select user_id from public.trips where id = trip_id));

-- checklist_items
-- 自分の行だけ見える／作れる／更新できる／消せる
create policy checklist_items_select_own
  on public.checklist_items
  for select
  using (auth.uid() = (select user_id from public.trips where id = (select trip_id from public.checklists where id = checklist_id)));

create policy checklist_items_insert_own
  on public.checklist_items
  for insert
  with check (auth.uid() = (select user_id from public.trips where id = (select trip_id from public.checklists where id = checklist_id)));

create policy checklist_items_update_own
  on public.checklist_items
  for update
  using (auth.uid() = (select user_id from public.trips where id = (select trip_id from public.checklists where id = checklist_id)))
  with check (auth.uid() = (select user_id from public.trips where id = (select trip_id from public.checklists where id = checklist_id)));

create policy checklist_items_delete_own
  on public.checklist_items
  for delete
  using (auth.uid() = (select user_id from public.trips where id = (select trip_id from public.checklists where id = checklist_id)));

-- profiles
-- 自分の行だけ見える／作れる／更新できる／消せる
create policy profiles_select_own
  on public.profiles
  for select
  using (auth.uid() = id);

create policy profiles_insert_own
  on public.profiles
  for insert
  with check (auth.uid() = id);

create policy profiles_update_own
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy profiles_delete_own
  on public.profiles
  for delete
  using (auth.uid() = id);


-- mst_activities
-- 誰でも見える
create policy mst_activities_select_all
  on public.mst_activities
  for select
  using (true);

-- mst_check_items
-- 誰でも見える
create policy mst_check_items_select_all
  on public.mst_check_items
  for select
  using (true);

-- mst_currencies
-- 誰でも見える
create policy mst_currencies_select_all
  on public.mst_currencies
  for select
  using (true);

-- mst_locales
-- 誰でも見える
create policy mst_locales_select_all
  on public.mst_locales
  for select
  using (true);

-- mst_timezones
-- 誰でも見える
create policy mst_timezones_select_all
  on public.mst_timezones
  for select
  using (true);

-- mst_activities
alter table public.mst_activities enable row level security;
-- mst_check_items
alter table public.mst_check_items enable row level security;
-- mst_currencies
alter table public.mst_currencies enable row level security;
-- mst_locales
alter table public.mst_locales enable row level security;
-- mst_timezones
alter table public.mst_timezones enable row level security;

