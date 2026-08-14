create or replace function debug_role()
returns text
language sql security invoker as $$
  select current_user::text || ' / ' || current_setting('request.jwt.claims', true);
$$;

grant execute on function debug_role() to anon, authenticated;
