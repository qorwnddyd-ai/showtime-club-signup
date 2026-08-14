drop function if exists debug_policies();
drop function if exists debug_role();
drop function if exists debug_rls();
drop function if exists debug_insert_test();

delete from applications where name in ('테스트', 'rpc-test');
