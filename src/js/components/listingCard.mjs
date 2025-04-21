import { isLoggedIn } from "../api/auth/session.mjs";
import { createCountdown } from "../utils/countDownTimer.mjs";

/**
 * Creates a card element for a single listing, including title, image,
 * current highest bid, and a countdown timer.
 *
 * @param {object} listing - The listing data.
 * @param {string} listing.id - Unique ID of the listing.
 * @param {string} listing.title - Title of the listing.
 * @param {Array<{ url: string }>} [listing.media] - Optional array of media objects.
 * @param {string} listing.endsAt - ISO date string indicating when the listing ends.
 * @param {Array<{ amount: number }>} [listing.bids] - Optional array of bid objects.
 * @returns {HTMLElement} The DOM element representing the listing card.
 */
export function listingCard(listing) {
  const imageUrl = listing.media?.[0]?.url || "/public/bidPoint.jpg";

  const wrapper = document.createElement("div");
  wrapper.classList.add("flex", "flex-col", "items-center", "gap-2");

  // Countdown timer (above card)
  const countdown = document.createElement("div");
  countdown.classList.add("text-sm", "font-medium", "text-gray-700");

  // Main card link
  const link = document.createElement("a");
  link.href = `/listing/?id=${listing.id}`;
  link.classList.add(
    "group", "bg-violet-200", "rounded-xl", "shadow", "overflow-hidden",
    "w-full", "max-w-sm", "flex", "flex-col",
    "transition-transform", "hover:shadow-xl", "hover:scale-[1.01]", "duration-200"
  );

  // Image wrapper
  const imageWrapper = document.createElement("div");
  imageWrapper.classList.add("overflow-hidden");

  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = listing.title;
  image.classList.add(
    "w-full", "h-48", "object-cover", "transition-transform",
    "duration-500", "ease-in-out", "group-hover:scale-110"
  );

  imageWrapper.appendChild(image);

  // Info section
  const infoContainer = document.createElement("div");
  infoContainer.classList.add("p-4", "flex", "flex-col", "gap-3");

  const title = document.createElement("h2");
  title.textContent = listing.title;
  title.classList.add("text-lg", "font-bold", "truncate", "text-neutral-800");

  const bids = listing.bids || [];
  const highestBid = bids.length > 0 ? Math.max(...bids.map(b => b.amount)) : 0;

  const currentBid = document.createElement("p");
  currentBid.textContent = `Current bid: $${highestBid}`;
  currentBid.classList.add("text-gray-700");

  // Apply countdown timer
  createCountdown(listing.endsAt, (text, expired) => {
    countdown.textContent = text;
    if (expired) {
      image.classList.add("grayscale", "brightness-75");
      countdown.classList.add("text-red-900")
    }
  });

  infoContainer.append(title, currentBid);
  link.append(imageWrapper, infoContainer);
  wrapper.append(countdown, link);

  return wrapper;
}
