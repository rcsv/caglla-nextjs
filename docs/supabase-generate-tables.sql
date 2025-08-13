-- Supabase SQL script to generate tables and relationships
-- set ids to uuid and add default values
-- CreateTable
create table if not exists "public"."mst_currencies" (
  "id" uuid not null default uuid_generate_v4 (),
  "code" TEXT not null,
  "name" TEXT not null,
  "symbol" TEXT,
  "created_at" timestamptz not null default CURRENT_TIMESTAMP,
  "updated_at" timestamptz not null default CURRENT_TIMESTAMP,
  constraint "mst_currencies_pkey" primary key ("id")
);

-- CreateTable
create table if not exists "public"."mst_timezones" (
  "id" uuid not null default uuid_generate_v4 (),
  "name" TEXT not null,
  "offset" TEXT,
  "created_at" timestamptz not null default CURRENT_TIMESTAMP,
  "updated_at" timestamptz not null default CURRENT_TIMESTAMP,
  constraint "mst_timezones_pkey" primary key ("id")
);

-- CreateTable
create table if not exists "public"."mst_check_items" (
  "id" uuid not null default uuid_generate_v4 (),
  "label" TEXT not null,
  "category" TEXT,
  "created_at" timestamptz not null default CURRENT_TIMESTAMP,
  "updated_at" timestamptz not null default CURRENT_TIMESTAMP,
  constraint "mst_check_items_pkey" primary key ("id")
);

-- CreateTable
create table if not exists "public"."mst_activities" (
  "id" uuid not null default uuid_generate_v4 (),
  "name" TEXT not null,
  "category" TEXT,
  "created_at" timestamptz not null default CURRENT_TIMESTAMP,
  "updated_at" timestamptz not null default CURRENT_TIMESTAMP,
  constraint "mst_activities_pkey" primary key ("id")
);

-- CreateTable
create table if not exists "public"."mst_locales" (
  "id" uuid not null default uuid_generate_v4 (),
  "code" TEXT not null,
  "label" TEXT not null,
  "created_at" timestamptz not null default CURRENT_TIMESTAMP,
  "updated_at" timestamptz not null default CURRENT_TIMESTAMP,
  constraint "mst_locales_pkey" primary key ("id")
);

-- CreateTable
create table if not exists "public"."profiles" (
  "id" uuid not null default uuid_generate_v4 (),
  "user_id" uuid not null,
  "nickname" TEXT,
  "locale_id" uuid,
  "currency_id" uuid,
  "timezone_id" uuid,
  "created_at" timestamptz not null default CURRENT_TIMESTAMP,
  "updated_at" timestamptz not null default CURRENT_TIMESTAMP,
  constraint "profiles_pkey" primary key ("id")
);

-- CreateTable
create table if not exists "public"."trips" (
  "id" uuid not null default uuid_generate_v4 (),
  "user_id" uuid not null,
  "title" TEXT not null,
  "purpose" TEXT,
  "start_date" timestamptz not null,
  "end_date" timestamptz not null,
  "currency_id" uuid,
  "timezone_id" uuid,
  "created_at" timestamptz not null default CURRENT_TIMESTAMP,
  "updated_at" timestamptz not null default CURRENT_TIMESTAMP,
  constraint "trips_pkey" primary key ("id")
);

-- CreateTable
create table if not exists "public"."days" (
  "id" uuid not null default uuid_generate_v4 (),
  "trip_id" uuid not null,
  "date" timestamptz not null,
  "note" TEXT,
  "created_at" timestamptz not null default CURRENT_TIMESTAMP,
  "updated_at" timestamptz not null default CURRENT_TIMESTAMP,
  constraint "days_pkey" primary key ("id")
);

-- CreateTable
create table if not exists "public"."itineraries" (
  "id" uuid not null default uuid_generate_v4 (),
  "day_id" uuid not null,
  "start_time" timestamptz not null,
  "end_time" timestamptz,
  "location" TEXT,
  "memo" TEXT,
  "activity_id" uuid,
  "created_at" timestamptz not null default CURRENT_TIMESTAMP,
  "updated_at" timestamptz not null default CURRENT_TIMESTAMP,
  constraint "itineraries_pkey" primary key ("id")
);

-- CreateTable
create table if not exists "public"."checklists" (
  "id" uuid not null default uuid_generate_v4 (),
  "trip_id" uuid not null,
  "title" TEXT not null,
  "created_at" timestamptz not null default CURRENT_TIMESTAMP,
  "updated_at" timestamptz not null default CURRENT_TIMESTAMP,
  constraint "checklists_pkey" primary key ("id")
);

-- CreateTable
create table if not exists "public"."checklist_items" (
  "id" uuid not null default uuid_generate_v4 (),
  "checklist_id" uuid not null,
  "checkitem_id" uuid not null,
  "is_checked" BOOLEAN not null default false,
  "created_at" timestamptz not null default CURRENT_TIMESTAMP,
  "updated_at" timestamptz not null default CURRENT_TIMESTAMP,
  constraint "checklist_items_pkey" primary key ("id")
);

-- CreateIndex
create unique INDEX "mst_currencies_code_key" on "public"."mst_currencies" ("code");

create unique INDEX "mst_timezones_name_key" on "public"."mst_timezones" ("name");

create unique INDEX "mst_activities_name_key" on "public"."mst_activities" ("name");

create unique INDEX "mst_locales_code_key" on "public"."mst_locales" ("code");

create unique INDEX "profiles_user_id_key" on "public"."profiles" ("user_id");

-- AddForeignKey
alter table "public"."profiles"
add constraint "profiles_locale_id_fkey" foreign KEY ("locale_id") references "public"."mst_locales" ("id") on delete set null on update CASCADE;

alter table "public"."profiles"
add constraint "profiles_currency_id_fkey" foreign KEY ("currency_id") references "public"."mst_currencies" ("id") on delete set null on update CASCADE;

alter table "public"."profiles"
add constraint "profiles_timezone_id_fkey" foreign KEY ("timezone_id") references "public"."mst_timezones" ("id") on delete set null on update CASCADE;

alter table "public"."trips"
add constraint "trips_currency_id_fkey" foreign KEY ("currency_id") references "public"."mst_currencies" ("id") on delete set null on update CASCADE;

alter table "public"."trips"
add constraint "trips_timezone_id_fkey" foreign KEY ("timezone_id") references "public"."mst_timezones" ("id") on delete set null on update CASCADE;

alter table "public"."days"
add constraint "days_trip_id_fkey" foreign KEY ("trip_id") references "public"."trips" ("id") on delete RESTRICT on update CASCADE;

alter table "public"."itineraries"
add constraint "itineraries_day_id_fkey" foreign KEY ("day_id") references "public"."days" ("id") on delete RESTRICT on update CASCADE;

alter table "public"."itineraries"
add constraint "itineraries_activity_id_fkey" foreign KEY ("activity_id") references "public"."mst_activities" ("id") on delete set null on update CASCADE;

alter table "public"."checklists"
add constraint "checklists_trip_id_fkey" foreign KEY ("trip_id") references "public"."trips" ("id") on delete RESTRICT on update CASCADE;

alter table "public"."checklist_items"
add constraint "checklist_items_checklist_id_fkey" foreign KEY ("checklist_id") references "public"."checklists" ("id") on delete RESTRICT on update CASCADE;

alter table "public"."checklist_items"
add constraint "checklist_items_checkitem_id_fkey" foreign KEY ("checkitem_id") references "public"."mst_check_items" ("id") on delete RESTRICT on update CASCADE;

-- set update
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_trips_set_updated_at on public.trips;
create trigger trg_trips_set_updated_at 
    before update on public.trips
    for each row execute function public.set_updated_at();

drop trigger if exists trg_profiles_set_updated_at on public.profiles;
create trigger trg_profiles_set_updated_at 
    before update on public.profiles
    for each row execute function public.set_updated_at();

drop trigger if exists trg_days_set_updated_at on public.days;
create trigger trg_days_set_updated_at
	before update on public.days
	for each row execute function public.set_updated_at();

drop trigger if exists trg_itineraries_set_updated_at on public.itineraries;
create trigger trg_itineraries_set_updated_at
	before update on public.itineraries
	for each row execute function public.set_updated_at();

drop trigger if exists trg_checklists_set_updated_at on public.checklists;
create trigger trg_checklists_set_updated_at
	before update on public.checklists
	for each row execute function public.set_updated_at();

drop trigger if exists trg_checklist_items_set_updated_at on public.checklist_items;
create trigger trg_checklist_items_set_updated_at
	before update on public.checklist_items
	for each row execute function public.set_updated_at();

