<script>
// ===== CONFIG DEMO =====
// Ajuste a duração da sessão (minutos)
const SESSION_MINUTES = 120;

// Chave usada no localStorage
const AUTH_KEY = "sagip_auth";

// Simule validação (troque por chamada ao backend depois)
function validateCredentials(email, password) {
  // Exemplo simples: aceita qualquer email com @ e senha >= 4
  return /\S+@\S+\.\S+/.test(email) && password && password.length >= 4;
}

// Salva sessão
function setSession(email) {
  const expiresAt = Date.now() + SESSION_MINUTES * 60 * 1000;
  const payload = { email, expiresAt };
  localStorage.setItem(AUTH_KEY, JSON.stringify(payload));
}

// Lê sessão
function getSession() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data?.expiresAt || Date.now() > data.expiresAt) {
      localStorage.removeItem(AUTH_KEY);
      return null;
    }
    return data;
  } catch {
    localStorage.removeItem(AUTH_KEY);
    return null;
  }
}

// === API usada nas páginas ===
async function login(email, password, redirectTo = "dashboard.html") {
  // Aqui você pode trocar por fetch() para seu backend:
  // const resp = await fetch("/api/login", { method: "POST", body: JSON.stringify({email,password}) });
  // const {token, expiresAt} = await resp.json(); // e salvar
  if (!validateCredentials(email, password)) {
    throw new Error("Credenciais inválidas. Verifique email e senha.");
  }
  setSession(email);
  window.location.href = redirectTo;
}

function logout(redirectTo = "login.html") {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = redirectTo;
}

// Chame isso logo no início das páginas protegidas
function requireAuth(redirectTo = "login.html") {
  const sess = getSession();
  if (!sess) {
    window.location.replace(redirectTo);
    return;
  }
  // Opcional: expor o email/logado
  window.__SESSION__ = sess;
}
</script>