-- Delete Tables
drop table if exists 
  public._prisma_migrations ; 

drop table if exists 
  public.checklist_items,
  public.checklists ;

drop table if exists 
  public.itineraries, 
  public.days, 
  public.profiles, 
  public.trips;

drop table if exists 
  public.mst_activities, 
  public.mst_check_items, 
  public.mst_currencies, 
  public.mst_locales, 
  public.mst_timezones ;