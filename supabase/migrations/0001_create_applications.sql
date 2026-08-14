create table applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  student_id text not null,
  phone text not null,
  motivation text not null,
  created_at timestamptz not null default now()
);

alter table applications enable row level security;

-- 누구나 신청서를 제출(insert)할 수 있지만, 조회/수정/삭제는 불가 (대시보드에서만 확인)
create policy "anyone can submit an application"
  on applications for insert
  to anon
  with check (true);
