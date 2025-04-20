import { getListing } from "../api/listings/display.mjs";
import { isLoggedIn, getUser } from "../api/auth/session.mjs";
import { createCountdown } from "../utils/countDownTimer.mjs";
import { createBidHistoryCard } from "../components/listing/bidHistoryCard.mjs";
import { errorMessage } from "../components/errorMessage.mjs";
import { createCarousel } from "../components/gallery/carousel.mjs";

import { placeBid } from "../api/listings/bid.mjs";
import { createBidModal } from "../components/listing/bidModal.mjs";


const params = new URLSearchParams(window.location.search);
const id = params.get("id");

export async function renderListing(){

  const main = document.querySelector("#listingId");  

  if (!id) {
    main.textContent = "No listing ID found.";
    return;
  }

  try{
    const listing = await getListing(id);
    const user = getUser();
    const bids = listing.bids || [];
    const lastBid = bids.length > 0 ? Math.max(...bids.map((bid) => bid.amount)) : 0;

    // Wrapper - 1
    const wrapper = document.createElement("div");
    wrapper.classList.add("flex", "flex-col")

    // Image container - 2
    // const imgContainer = document.createElement("div");
    // imgContainer.id = "imgContainer";
    const imgCarousel = createCarousel(listing.media);

    // Content container - 2
    const contentContainer = document.createElement("div");
    contentContainer.classList.add("flex", "flex-col", "p-6");

    // text-container
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("flex", "justify-between");

    const textContainer = document.createElement("div");
    textContainer.classList.add("flex", "flex-col");

    const sellerLink = document.createElement("a");
    sellerLink.href = `/profile/?name=${listing.seller?.name}`;
    sellerLink.textContent = listing.seller?.name;

    const title = document.createElement("h1");
    title.textContent = listing.title;

    textContainer.append(sellerLink, title);

    // Current bid information
    const currentBidInfo = document.createElement("div");
    currentBidInfo.classList.add("flex", "flex-col");

    const currentBid = document.createElement("p");
    currentBid.classList.add("text-gray-500");
    currentBid.textContent = "Current bid";

    const currentBidAmount = document.createElement("p");
    currentBidAmount.classList.add("font-semibold");
    currentBidAmount.textContent = "$" + lastBid;

    currentBidInfo.append(currentBid, currentBidAmount);

    // Countdown container - 3
    const countDownContainer = document.createElement("div");

    createCountdown(listing.endsAt, (text, expired) => {
      countDownContainer.textContent = text;
    });

    // Bid history container - 3
    const historyContainer = document.createElement("div");
    historyContainer.classList.add("flex", "flex-wrap", "gap-6");

    bids
  .sort((a, b) => new Date(b.created) - new Date(a.created))
  .forEach((bid) => {
    const bidCard = createBidHistoryCard(bid);
    historyContainer.append(bidCard);
  });

    
    // bid button - 3 
    const bidButtonContainer = document.createElement("div");

    if (!isLoggedIn()){
      const logInMessage = document.createElement("p");
      logInMessage.classList.add("font-semibold");
      logInMessage.textContent = "You have to be logged in to place a bid.";

      const loginLink = document.createElement("a");
      loginLink.href = "/user/login";

      bidButtonContainer.append(logInMessage, loginLink);
    }else if(user?.name === listing.seller?.name){
      const userMessage = document.createElement("p");
      userMessage.classList.add("font-semibold");
      userMessage.textContent = "You cannot place bids on your own listings."

      bidButtonContainer.append(userMessage);
    }else{
      const bidButton = document.createElement("button");
      bidButton.classList.add("bg-violet-700","rounded-4xl","py-3", "px-12", "text-white", "font-semibold");
      bidButton.textContent = "Place bid";
      bidButton.addEventListener("click", () => {
        createBidModal({
          listing,
          minBid: lastBid + 1,
          onSubmit: async (amount) => {
            await placeBid(listing.id, amount);
          },
        });
      });


      bidButtonContainer.append(bidButton);

    }
    
    wrapper.append(imgCarousel, contentContainer);
    contentContainer.append(infoContainer, countDownContainer, bidButtonContainer, historyContainer);
    infoContainer.append(textContainer, currentBidInfo);
    main.append(wrapper);
  }catch (error) {
    console.error("Error loading listing:", error);
    errorMessage("main", error.message);
  }
  

}

renderListing();

