import { getListing } from "../api/listings/display.mjs";
import { isLoggedIn, getUser } from "../api/auth/session.mjs";
import { createCountdown } from "../utils/countDownTimer.mjs";
import { createBidHistoryCard } from "../components/listing/bidHistoryCard.mjs";
import { errorMessage } from "../components/errorMessage.mjs";
import { createCarousel } from "../components/gallery/carousel.mjs";
import { placeBid } from "../api/listings/bid.mjs";
import { createBidModal } from "../components/listing/bidModal.mjs";
import { createHeader } from "../components/header.mjs";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

export async function renderListing() {
  const main = document.querySelector("#listingId");
  if (!main) return;

  if (!id) {
    main.textContent = "No listing ID found.";
    return;
  }

  try {
    const listing = await getListing(id);
    const user = getUser();
    const bids = listing.bids || [];
    const lastBid = bids.length > 0 ? Math.max(...bids.map((bid) => bid.amount)) : 0;

    const wrapper = document.createElement("div");
    wrapper.classList.add("max-w-6xl", "mx-auto", "p-4", "flex", "flex-col", "gap-8");

    const carousel = createCarousel(listing.media);
    carousel.classList.add("w-full", "rounded", "overflow-hidden", "shadow");

    const content = document.createElement("div");
    content.classList.add("flex", "flex-col", "gap-6", "w-full");

    const header = document.createElement("div");
    header.classList.add("flex", "justify-between", "items-start", "flex-wrap", "gap-4");

    const textInfo = document.createElement("div");

    const sellerName = listing.seller?.name || "Unknown seller";
    const sellerEl = document.createElement(isLoggedIn() ? "a" : "span");
    sellerEl.textContent = sellerName;

    if (isLoggedIn()) {
      sellerEl.href = `/user/?name=${encodeURIComponent(sellerName)}`;
      sellerEl.classList.add("text-sm", "text-blue-600", "hover:underline");
    } else {
      sellerEl.classList.add("text-sm", "text-gray-500");
    }

    const title = document.createElement("h1");
    title.textContent = listing.title;
    title.classList.add("text-3xl", "font-bold", "text-gray-900");

    textInfo.append(sellerEl, title);

    const bidInfo = document.createElement("div");
    bidInfo.classList.add("text-right");

    const currentLabel = document.createElement("p");
    currentLabel.textContent = "Current bid";
    currentLabel.classList.add("text-sm", "text-gray-500");

    const currentAmount = document.createElement("p");
    currentAmount.textContent = `$${lastBid}`;
    currentAmount.classList.add("text-2xl", "font-semibold");

    bidInfo.append(currentLabel, currentAmount);
    header.append(textInfo, bidInfo);

    const countdown = document.createElement("div");
    countdown.classList.add("text-md", "text-gray-700", "font-medium");
    createCountdown(listing.endsAt, (text) => {
      countdown.textContent = `Ends in: ${text}`;
    });

    if (listing.description) {
      const desc = document.createElement("p");
      desc.textContent = listing.description;
      desc.classList.add("text-gray-800", "leading-relaxed");
      content.appendChild(desc);
    }

    const bidButtonSection = document.createElement("div");

    if (!isLoggedIn()) {
      const msg = document.createElement("p");
      msg.textContent = "You must be logged in to place a bid.";
      msg.classList.add("text-sm", "text-gray-600");

      const loginLink = document.createElement("a");
      loginLink.href = "/user/login";
      loginLink.textContent = "Login here";
      loginLink.classList.add("text-blue-600", "hover:underline", "ml-1");

      bidButtonSection.append(msg, loginLink);
    } else if (user?.name === listing.seller?.name) {
      const msg = document.createElement("p");
      msg.textContent = "You cannot bid on your own listing.";
      msg.classList.add("text-sm", "text-gray-600");
      bidButtonSection.append(msg);
    } else {
      const bidBtn = document.createElement("button");
      bidBtn.textContent = "Place Bid";
      bidBtn.classList.add(
        "bg-violet-700", "text-white", "py-3", "px-6", "rounded",
        "hover:bg-violet-800", "transition", "w-full", "sm:w-auto"
      );

      bidBtn.addEventListener("click", () => {
        createBidModal({
          listing,
          minBid: lastBid + 1,
          onSubmit: async (amount) => {
            await placeBid(listing.id, amount);
            renderListing(); // 🔄 Refresh
          },
        });
      });

      bidButtonSection.append(bidBtn);
    }

    const historyWrapper = document.createElement("div");
    historyWrapper.classList.add("mt-6");

    const historyTitle = document.createElement("h3");
    historyTitle.textContent = "Bid History";
    historyTitle.classList.add("text-xl", "font-semibold", "mb-2");

    const historyGrid = document.createElement("div");
    historyGrid.classList.add("grid", "grid-cols-1", "sm:grid-cols-2", "gap-4");

    bids
      .sort((a, b) => new Date(b.created) - new Date(a.created))
      .forEach((bid) => {
        historyGrid.appendChild(createBidHistoryCard(bid));
      });

    historyWrapper.append(historyTitle, historyGrid);

    content.append(header, countdown, bidButtonSection, historyWrapper);
    wrapper.append(carousel, content);

    main.innerHTML = "";
    main.appendChild(wrapper);

  } catch (error) {
    console.error("Error loading listing:", error);
    errorMessage("main", error.message);
  }
}

createHeader();
renderListing();