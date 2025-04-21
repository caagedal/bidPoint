import { registerUser } from "../api/auth/register.mjs";    
import { loginUser } from "../api/auth/login.mjs";
import { createHeader } from "../components/header.mjs";

/**
 * Sets up the registration form's submit behavior.
 * 
 * Registers a new user and logs them in automatically on success.
 * Redirects to the homepage after successful login.
 *
 * @returns {void}
 */
export function registerForm() {
  const form = document.querySelector("#registerForm");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const user = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
    };

    try {
      const regData = await registerUser(user);
      console.log("✅ Registration successful:", regData);

      const loginData = await loginUser(user.email, user.password);
      console.log("✅ Auto login successful:", loginData);

      window.location.href = "/"; // Redirect to homepage
    } catch (error) {
      console.error("❌ Registration or login failed:", error.message);
      alert("Registration failed: " + error.message);
    }
  });
}

// Initialize header and form behavior
createHeader();
registerForm();
