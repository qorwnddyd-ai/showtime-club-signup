grant select on table applications to anon, authenticated;

create policy "anyone can read applications"
  on applications for select
  to public
  using (true);
