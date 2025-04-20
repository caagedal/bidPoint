import { isLoggedIn } from "../api/auth/session.mjs";
import { createCountdown } from "../utils/countDownTimer.mjs";

export function listingCard(listing) {
  const imageUrl = listing.media?.[0]?.url || "/public/bidPoint.jpg";

  const wrapper = document.createElement("div");
  wrapper.classList.add("flex", "flex-col", "items-center", "gap-2");

  const countdown = document.createElement("div");
  countdown.classList.add("text-sm", "font-medium", "text-gray-700");

  const link = document.createElement("a");
  link.href = `/listing/?id=${listing.id}`;
  link.classList.add(
    "group", "bg-white", "rounded-xl", "shadow", "overflow-hidden",
    "w-full", "max-w-sm", "flex", "flex-col",
    "transition-transform", "hover:shadow-xl", "hover:scale-[1.01]", "duration-200"
  );

  const imageWrapper = document.createElement("div");
  imageWrapper.classList.add("overflow-hidden");

  const image = document.createElement("img");
  image.classList.add(
    "w-full", "h-48", "object-cover", "transition-transform",
    "duration-500", "ease-in-out", "group-hover:scale-110"
  );
  image.src = imageUrl;
  image.alt = listing.title;

  imageWrapper.appendChild(image);

  const infoContainer = document.createElement("div");
  infoContainer.classList.add("p-4", "flex", "flex-col", "gap-3");

  const title = document.createElement("h2");
  title.classList.add("text-lg", "font-bold", "truncate");
  title.textContent = listing.title;

  const bids = listing.bids || [];
  const highestBid = bids.length > 0 ? Math.max(...bids.map(b => b.amount)) : 0;

  const currentBid = document.createElement("p");
  currentBid.classList.add("text-gray-700");
  currentBid.textContent = `Current bid: $${highestBid}`;

  // countdown
  createCountdown(listing.endsAt, (text, expired) => {
    countdown.textContent = text;
    if (expired) {
      image.classList.add("grayscale", "brightness-75");
    }
  });

  infoContainer.append(title, currentBid);
  link.append(imageWrapper, infoContainer);
  wrapper.append(countdown, link);

  return wrapper;
}
