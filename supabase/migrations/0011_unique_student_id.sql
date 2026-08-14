delete from applications;

alter table applications add constraint applications_student_id_key unique (student_id);
