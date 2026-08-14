// club-signup/app.js와 동일한 프로젝트 정보
const SUPABASE_URL = "https://ymusefnchwhzoudqkglf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_1E3CLbvrf1l_w0Zga2q7xw_UvUyjo8G";

// 소모임 관리자끼리만 공유하는 비밀번호. 코드에 노출되므로 민감한 용도로는 쓰지 마세요.
const ADMIN_PASSWORD = "showtime2026";

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const loginCard = document.getElementById("login-card");
const listCard = document.getElementById("list-card");
const passwordInput = document.getElementById("password");
const loginMessage = document.getElementById("login-message");
const tableBody = document.getElementById("applications-body");
const countEl = document.getElementById("count");

document.getElementById("login-btn").addEventListener("click", checkPassword);
passwordInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkPassword();
});

async function checkPassword() {
  if (passwordInput.value !== ADMIN_PASSWORD) {
    loginMessage.textContent = "비밀번호가 올바르지 않습니다.";
    return;
  }
  loginCard.hidden = true;
  listCard.hidden = false;
  await loadApplications();
}

async function loadApplications() {
  const { data, error } = await sb
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    tableBody.innerHTML = "";
    const row = document.createElement("tr");
    row.textContent = "목록을 불러오지 못했습니다.";
    tableBody.appendChild(row);
    return;
  }

  countEl.textContent = data.length;
  tableBody.innerHTML = "";
  for (const app of data) {
    const row = document.createElement("tr");
    for (const value of [
      app.name,
      app.student_id,
      app.phone,
      app.motivation,
      new Date(app.created_at).toLocaleString("ko-KR"),
    ]) {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    }
    tableBody.appendChild(row);
  }
}
