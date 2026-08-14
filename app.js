// Supabase 프로젝트 생성 후 아래 두 값을 채워주세요.
// Project Settings > API 에서 확인 가능합니다.
const SUPABASE_URL = "https://ymusefnchwhzoudqkglf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_1E3CLbvrf1l_w0Zga2q7xw_UvUyjo8G";

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const form = document.getElementById("signup-form");
const submitBtn = document.getElementById("submit-btn");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  message.textContent = "";
  message.className = "message";

  // 봇 방지용 허니팟: 사람 눈에는 안 보이는 필드라 채워져 있으면 봇으로 간주
  if (form.website.value) return;

  submitBtn.disabled = true;

  const { error } = await sb.from("applications").insert({
    name: form.name.value.trim(),
    student_id: form.student_id.value.trim(),
    phone: form.phone.value.replace(/\D/g, ""),
    motivation: form.motivation.value.trim(),
  });

  if (error) {
    message.textContent = error.code === "23505"
      ? "이미 신청된 학번입니다."
      : "신청에 실패했습니다. 잠시 후 다시 시도해 주세요.";
    message.classList.add("error");
    submitBtn.disabled = false;
    return;
  }

  message.textContent = "신청이 완료되었습니다!";
  message.classList.add("success");
  form.reset();
  submitBtn.disabled = false;
});
