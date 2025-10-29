
// ===== CONFIGURAÇÃO =====
const AUTH_KEY = "sagip_auth";

// ===== LOGIN SIMPLES =====
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (email === "denisantos@petroeng.com.br" && password === "1234") {
        // salva sessão
        localStorage.setItem(AUTH_KEY, JSON.stringify({ email }));
        window.location.href = "app.html";
      } else {
        alert("E-mail ou senha incorretos!");
      }
    });
  }

  // ===== LOGOUT =====
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem(AUTH_KEY);
      window.location.href = "login.html";
    });
  }

  // ===== VERIFICAÇÃO DE SESSÃO (para app.html) =====
  if (window.location.pathname.includes("app.html")) {
    const session = JSON.parse(localStorage.getItem(AUTH_KEY) || "null");
    if (!session || !session.email) {
      window.location.href = "login.html";
    }
  }
});
