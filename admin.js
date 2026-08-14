// club-signup/app.js와 동일한 프로젝트 정보
const SUPABASE_URL = "https://ymusefnchwhzoudqkglf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_1E3CLbvrf1l_w0Zga2q7xw_UvUyjo8G";

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const loginCard = document.getElementById("login-card");
const listCard = document.getElementById("list-card");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginMessage = document.getElementById("login-message");
const tableBody = document.getElementById("applications-body");
const countEl = document.getElementById("count");

document.getElementById("login-btn").addEventListener("click", login);
passwordInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") login();
});

async function login() {
  loginMessage.textContent = "";
  const { error } = await sb.auth.signInWithPassword({
    email: emailInput.value.trim(),
    password: passwordInput.value,
  });

  if (error) {
    loginMessage.textContent = "로그인에 실패했습니다.";
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

// 이미 로그인된 세션이 있으면 바로 목록 표시
sb.auth.getSession().then(({ data }) => {
  if (data.session) {
    loginCard.hidden = true;
    listCard.hidden = false;
    loadApplications();
  }
});
