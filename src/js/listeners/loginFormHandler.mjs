import { loginUser } from "../api/auth/login.mjs";
import { createHeader } from "../components/header.mjs";

export function loginForm() {
  const form = document.querySelector("#loginForm");

  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = form.email.value;
    const password = form.password.value;

    try {
      const user = await loginUser(email, password);
      console.log("✅ Login success:", user);
      window.location.href = "/"; // Redirect to home or dashboard
    } catch (error) {
      console.error("❌ Login error:", error.message);
      alert("Login failed: " + error.message);
    }
  });
}

createHeader();
loginForm();