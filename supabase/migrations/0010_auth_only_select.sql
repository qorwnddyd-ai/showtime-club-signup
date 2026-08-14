drop policy if exists "anyone can read applications" on applications;
revoke select on table applications from anon;

create policy "authenticated users can read applications"
  on applications for select
  to authenticated
  using (true);
