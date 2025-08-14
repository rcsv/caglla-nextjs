-- Insert Into Master Table
-- This SQL script is used to insert data into the master table for the application.

insert into public.mst_currencies (code, name, symbol) values
  ('USD', 'United States Dollar', '$'),
  ('EUR', 'Euro', '€'),
  ('JPY', 'Japanese Yen', '¥');

insert into public.mst_timezones (name, "offset") values
  ('UTC', '00:00'),
  ('JST', '+09:00'),
  ('EST', '-05:00');

insert into public.mst_check_items (label, category) values
  ('Passport', 'Travel Documents'),
  ('Tickets', 'Travel Documents'),
  ('Sunscreen', 'Health & Safety');

insert into public.mst_activities (name, category) values
  ('Hiking', 'Outdoor'),
  ('Swimming', 'Outdoor'),
  ('Sightseeing', 'Cultural');

insert into public.mst_locales (code, label) values
  ('en-US', 'English (United States)'),
  ('ja-JP', 'Japanese (Japan)'),
  ('fr-FR', 'French (France)');

