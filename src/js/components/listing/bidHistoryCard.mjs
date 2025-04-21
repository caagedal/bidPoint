import { isLoggedIn } from "../../api/auth/session.mjs";

/**
 * Creates a bid history card displaying bidder info and bid amount.
 *
 * @param {object} bid - The bid data.
 * @param {object} bid.bidder - The bidder's profile.
 * @param {string} bid.bidder.name - The name of the bidder.
 * @param {object} [bid.bidder.avatar] - Optional avatar object.
 * @param {string} [bid.bidder.avatar.url] - URL to the bidder's avatar image.
 * @param {string} [bid.bidder.avatar.alt] - Alt text for the avatar image.
 * @param {number} bid.amount - The bid amount.
 * @returns {HTMLElement} A DOM element representing the bid card.
 */
export function createBidHistoryCard({ bidder, amount }) {
  const card = document.createElement("article");
  card.classList.add("w-50", "bg-rose-200", "rounded-4xl", "p-5");

  const container = document.createElement("div");
  container.classList.add("flex", "justify-between" ,"items-center");

  const avatar = document.createElement("img");
  avatar.classList.add("rounded-full", "w-12", "h-12");
  avatar.src = bidder?.avatar?.url || "/public/bidPoint.jpg";
  avatar.alt = bidder?.avatar?.alt || "User avatar";

  const info = document.createElement("div");
  info.classList.add("flex", "flex-col", "items-end")

  const nameEl = document.createElement(isLoggedIn() ? "a" : "span");
  nameEl.textContent = bidder.name;

  if (isLoggedIn()) {
    const profileUrl = new URL("/user/", window.location.origin);
    profileUrl.searchParams.set("name", bidder.name);
    nameEl.href = profileUrl.pathname + profileUrl.search;
    nameEl.classList.add("text-neutral-800", "font-semibold", "font-inter");
  } else {
    nameEl.classList.add("text-gray-600");
  }

  const amountText = document.createElement("p");
  amountText.textContent = `$${amount}`;
  amountText.classList.add("text-sm", "text-neutral-800", "font-semibold")

  info.append(nameEl, amountText);
  container.append(avatar, info);
  card.appendChild(container);

  return card;
}
