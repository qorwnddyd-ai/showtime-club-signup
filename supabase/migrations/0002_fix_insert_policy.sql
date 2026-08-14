drop policy if exists "anyone can submit an application" on applications;

create policy "anyone can submit an application"
  on applications for insert
  to public
  with check (true);
