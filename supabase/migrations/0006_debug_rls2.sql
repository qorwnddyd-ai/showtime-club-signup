create or replace function debug_rls()
returns text
language sql security definer as $$
  select 'relrowsecurity=' || relrowsecurity::text
      || ' forcerowsecurity=' || relforcerowsecurity::text
      || ' relkind=' || relkind::text
      || ' nspname=' || nspname
  from pg_class c
  join pg_namespace n on n.oid = c.relnamespace
  where relname = 'applications';
$$;

grant execute on function debug_rls() to anon, authenticated;

create or replace function debug_insert_test()
returns text
language plpgsql security invoker as $$
begin
  insert into applications(name, student_id, phone, motivation)
  values ('rpc-test','123','010','test');
  return 'ok';
exception when others then
  return 'error: ' || sqlerrm;
end;
$$;

grant execute on function debug_insert_test() to anon, authenticated;
