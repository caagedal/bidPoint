import { isLoggedIn } from "../../api/auth/session.mjs";

export function createBidHistoryCard({ bidder, amount }) {
  const card = document.createElement("article");
  card.classList.add("w-60", "bg-rose-200", "rounded-4xl", "p-5");

  const container = document.createElement("div");
  container.classList.add("flex", "justify-between", "items-center");

  const avatar = document.createElement("img");
  avatar.classList.add("rounded-full", "w-5");
  avatar.src = bidder?.avatar?.url || "/public/bidPoint.jpg";
  avatar.alt = bidder?.avatar?.alt || "User avatar";

  const info = document.createElement("div");

  const nameEl = document.createElement(isLoggedIn() ? "a" : "span");
  nameEl.textContent = bidder.name;

  if (isLoggedIn()) {
    const profileUrl = new URL("/user/", window.location.origin);
    profileUrl.searchParams.set("name", bidder.name);
    nameEl.href = profileUrl.pathname + profileUrl.search;
    nameEl.classList.add("text-blue-700", "hover:underline");
  } else {
    nameEl.classList.add("text-gray-600");
  }

  const amountText = document.createElement("p");
  amountText.textContent = `$${amount}`;

  info.append(nameEl, amountText);
  container.append(avatar, info);
  card.appendChild(container);

  return card;
}
