import { getProfile } from "../api/profile/get.mjs";
import { isLoggedIn, getUser } from "../api/auth/session.mjs";

export async function createHeader() {
  const header = document.querySelector("header");
  header.classList.add(
    "bg-white", "shadow", "sticky", "top-0", "z-50"
  );

  const nav = document.createElement("nav");
  nav.classList.add("max-w-6xl", "flex", "justify-between", "items-center", "mx-auto", "p-4", "w-full");

  // 🔹 Logo
  const logo = document.createElement("a");
  logo.href = "/";
  logo.textContent = "bidPoint";
  logo.classList.add("text-4xl", "sm:text-5xl", "font-bold", "text-violet-700", "font-rock");

  // 🔹 Toggle button for mobile
  const toggleBtn = document.createElement("button");
  toggleBtn.classList.add("md:hidden", "text-2xl");
  toggleBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`;

  // 🔹 Right section (initially hidden on mobile)
  const rightSection = document.createElement("div");
  rightSection.classList.add(
    "flex-col", "md:flex", "md:flex-row", "items-start", "md:items-center", "gap-6",
    "hidden", "md:flex", "absolute", "md:static", "top-full", "left-0", "w-full", "md:w-auto", "bg-white", "p-4", "md:p-0", "shadow", "md:shadow-none", "transition-all"
  );

  // 🔹 Toggle logic
  toggleBtn.addEventListener("click", () => {
    rightSection.classList.toggle("hidden");
  });

  if (isLoggedIn()) {
    const user = getUser();
    const response = await getProfile(user.name);
    const profile = response?.data;
    const credits = profile?.credits ?? 0;

    const userInfo = document.createElement("div");
    userInfo.classList.add("flex", "gap-3", "items-center");

    const avatar = document.createElement("img");
    avatar.src = profile?.avatar?.url || "/public/default-avatar.png";
    avatar.alt = user.name;
    avatar.classList.add("w-10", "h-10", "rounded-full", "object-cover");

    const profileLink = document.createElement("a");
    profileLink.href = `/user/?name=${user.name}`;
    profileLink.classList.add("flex", "flex-col", "text-md", "font-semibold");

    const name = document.createElement("span");
    name.textContent = user.name;
    name.classList.add("text-lg");

    const credit = document.createElement("span");
    credit.textContent = `$${credits}`;
    credit.classList.add("text-gray-500");

    profileLink.append(name, credit);
    userInfo.append(avatar, profileLink);

    const logout = document.createElement("button");
    logout.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i>';
    logout.classList.add("text-violet-700", "text-2xl", "ml-auto", "md:ml-0", "cursor-pointer", "hover:text-violet-500");
    logout.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "/";
    });

    rightSection.append(userInfo, logout);
  } else {
    const login = document.createElement("a");
    login.href = "/user/login/index.html";
    login.textContent = "Login";
    login.classList.add("text-white","bg-violet-700", "rounded-xl","py-2", "px-4", "font-medium", "hover:bg-violet-600", "cursor-pointer");

    const register = document.createElement("a");
    register.href = "/user/register/index.html";
    register.textContent = "Register";
    register.classList.add("text-violet-700","bg-rose-200", "rounded-xl","py-2", "px-4", "font-medium", "hover:bg-rose-100", "cursor-pointer");

    rightSection.append(login, register);
  }

  nav.append(logo, toggleBtn, rightSection);
  header.append(nav);
}

