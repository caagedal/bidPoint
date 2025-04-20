import { renderListings } from "./pages/homePage.mjs";
import { renderListing } from "./pages/listing.mjs";
import { loginForm } from "./listeners/loginFormHandler.mjs";
import { registerForm } from "./listeners/registerFormHandler.mjs";
import { renderProfile } from "./pages/profilePage.mjs";

export function router() {
  const path = location.pathname;

  switch (true) {
    case path === "/":
      renderListings();
      break;

    case path.startsWith("/listing/"):
      renderListing();
      break;

    case path === "/user/" || path.startsWith("/user/?"):
      renderProfile();
      break;

    case path === "/user/login/index.html":
      loginForm();
      break;

    case path === "/user/register/index.html":
      registerForm();
      break;

    default:
      document.body.innerHTML = `
        <main class="p-10 text-center text-red-600 text-xl">
          404 – Page not found 😢<br>
          <a href="/" class="text-blue-600 underline">Go to homepage</a>
        </main>
      `;
  }
}
