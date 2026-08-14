create or replace function debug_policies()
returns table(policyname text, permissive text, roles text, cmd text, qual text, withcheck text)
language sql security definer as $$
  select policyname, permissive, roles::text, cmd::text, qual::text, with_check::text
  from pg_policies
  where tablename = 'applications';
$$;

grant execute on function debug_policies() to anon, authenticated;
