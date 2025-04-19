// export function listingCard(listing){

//     const imageUrl = listing.media[0]?.url || "placeholder"

//     const bids = listing.bids || [];
//     const highestBid = bids.length > 0 
//     ? Math.max(...bids.map(bid => bid.amount))
//     : 0;

//     const cardContainer = document.createElement("article");
//     cardContainer.classList.add("w-2xs", "h-xs", "relative");

//     // const timeLeft = document.createElement("")

//     const imageContainer = document.createElement("div");
//     imageContainer.classList.add("");

//     const image = document.createElement("img");
//     image.classList.add("");
//     image.src = imageUrl;
//     image.alt = listing.title;

//     imageContainer.append(image);

//     const infoContainer = document.createElement("div");
//     infoContainer.classList.add("");
    
//     const title = document.createElement("h2");
//     title.classList.add("text-4xl concate");
//     title.textContent = listing.title;

//     const currentBid = document.createElement("p");
//     currentBid.classList.add("");
//     currentBid.textContent = `Current bid: $${highestBid}`;



// }

// export function listingCard(listing) {
//     const imageUrl = listing.media?.[0]?.url || "https://via.placeholder.com/300x200?text=No+Image";
  
//     const cardContainer = document.createElement("article");
//     cardContainer.classList.add(
//       "bg-white", "rounded-xl", "shadow", "overflow-hidden", "w-full", "max-w-sm", "flex", "flex-col"
//     );
  
//     // Image
//     const image = document.createElement("img");
//     image.classList.add("w-full", "h-48", "object-cover");
//     image.src = imageUrl;
//     image.alt = listing.title;
//     cardContainer.appendChild(image);
  
//     // Info wrapper
//     const infoContainer = document.createElement("div");
//     infoContainer.classList.add("p-4", "flex", "flex-col", "gap-3");
  
//     // Title
//     const title = document.createElement("h2");
//     title.classList.add("text-lg", "font-bold", "truncate");
//     title.textContent = listing.title;
//     infoContainer.appendChild(title);
  
//     // Current Bid
//     const bids = listing.bids || [];
//     const highestBid = bids.length > 0 ? Math.max(...bids.map((bid) => bid.amount)) : 0;
  
//     const currentBid = document.createElement("p");
//     currentBid.classList.add("text-gray-700");
//     currentBid.textContent = `Current bid: $${highestBid}`;
//     infoContainer.appendChild(currentBid);
  
//     // Countdown Timer
//     const countdown = document.createElement("div");
//     countdown.classList.add("flex", "justify-center", "gap-2", "text-center");
  
//     const createBox = (value, label) => {
//       const wrapper = document.createElement("div");
//       wrapper.classList.add("bg-gray-100", "px-3", "py-2", "rounded", "w-12");
  
//       const number = document.createElement("div");
//       number.classList.add("text-lg", "font-bold");
//       number.textContent = value.toString().padStart(2, "0");
  
//       const text = document.createElement("div");
//       text.classList.add("text-xs", "text-gray-500");
//       text.textContent = label;
  
//       wrapper.appendChild(number);
//       wrapper.appendChild(text);
  
//       return wrapper;
//     };
  
//     const updateCountdown = () => {
//       const endsAt = new Date(listing.endsAt);
//       const now = new Date();
//       const diff = endsAt - now;
  
//       if (diff <= 0) {
//         countdown.innerHTML = `<span class="text-red-500 font-bold">Auction ended</span>`;
//         return;
//       }
  
//       const totalSeconds = Math.floor(diff / 1000);
//       const days = Math.floor(totalSeconds / (3600 * 24));
//       const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
//       const minutes = Math.floor((totalSeconds % 3600) / 60);
//       const seconds = totalSeconds % 60;
  
//       countdown.innerHTML = ""; // Clear old content
//       countdown.appendChild(createBox(days, "d"));
//       countdown.appendChild(createColon());
//       countdown.appendChild(createBox(hours, "h"));
//       countdown.appendChild(createColon());
//       countdown.appendChild(createBox(minutes, "m"));
//       countdown.appendChild(createColon());
//       countdown.appendChild(createBox(seconds, "s"));
//     };
  
//     const createColon = () => {
//       const colon = document.createElement("div");
//       colon.classList.add("text-lg", "font-bold", "text-gray-700", "flex", "items-center");
//       colon.textContent = ":";
//       return colon;
//     };
  
//     updateCountdown(); // Initial call
//     setInterval(updateCountdown, 1000); // Update every second
  
//     infoContainer.appendChild(countdown);
//     cardContainer.appendChild(infoContainer);
  
//     return cardContainer;
// //   }

// export function listingCard(listing) {
//     const imageUrl =
//       listing.media?.[0]?.url || "https://via.placeholder.com/300x200?text=No+Image";
  
//     // Wrapp alt i <a>
//     const link = document.createElement("a");
//     link.href = `/listing/?id=${listing.id}`;
//     link.classList.add(
//         "relative",
//         "block",
//         "bg-white",
//         "rounded-xl",
//         "shadow",
//         "overflow-hidden",
//         "w-full",
//         "max-w-sm",
//         "flex",
//         "flex-col",
//         "transition-transform",
//         "hover:shadow-xl",
//         "hover:scale-[1.01]",
//         "duration-200"
//     );
  
//     // Image
//     const image = document.createElement("img");
//     image.classList.add("w-full", "h-48", "object-cover", "transition-transform", "duration-300", "hover:scale-105");
//     image.src = imageUrl;
//     image.alt = listing.title;
//     link.appendChild(image);
  
//     // Info wrapper
//     const infoContainer = document.createElement("div");
//     infoContainer.classList.add("p-4", "flex", "flex-col", "gap-3");
  
//     // Title
//     const title = document.createElement("h2");
//     title.classList.add("text-lg", "font-bold", "truncate");
//     title.textContent = listing.title;
//     infoContainer.appendChild(title);
  
//     // Current Bid
//     const bids = listing.bids || [];
//     const highestBid = bids.length > 0 ? Math.max(...bids.map((bid) => bid.amount)) : 0;
  
//     const currentBid = document.createElement("p");
//     currentBid.classList.add("text-gray-700");
//     currentBid.textContent = `Current bid: $${highestBid}`;
//     infoContainer.appendChild(currentBid);
  
//     // Countdown Timer
//     const countdown = document.createElement("div");
//     countdown.classList.add("flex", "justify-center", "gap-2", "text-center", "absolute", "top-[30px]",
//   "left-1/2",
//   "-translate-x-1/2",
//   "z-10",);
  
//     const createBox = (value, label) => {
//       const wrapper = document.createElement("div");
//       wrapper.classList.add("bg-gray-100", "px-3", "py-2", "rounded", "w-12");
  
//       const number = document.createElement("div");
//       number.classList.add("text-lg", "font-bold");
//       number.textContent = value.toString().padStart(2, "0");
  
//       const text = document.createElement("div");
//       text.classList.add("text-xs", "text-gray-500");
//       text.textContent = label;
  
//       wrapper.appendChild(number);
//       wrapper.appendChild(text);
  
//       return wrapper;
//     };
  
//     const createColon = () => {
//       const colon = document.createElement("div");
//       colon.classList.add("text-lg", "font-bold", "text-gray-700", "flex", "items-center");
//       colon.textContent = ":";
//       return colon;
//     };
  
//     const updateCountdown = () => {
//       const endsAt = new Date(listing.endsAt);
//       const now = new Date();
//       const diff = endsAt - now;
  
//       if (diff <= 0) {
//         countdown.innerHTML = `<span class="text-red-500 font-bold">Auction ended</span>`;
//         return;
//       }
  
//       const totalSeconds = Math.floor(diff / 1000);
//       const days = Math.floor(totalSeconds / (3600 * 24));
//       const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
//       const minutes = Math.floor((totalSeconds % 3600) / 60);
//       const seconds = totalSeconds % 60;
  
//       countdown.innerHTML = "";
//       countdown.appendChild(createBox(days));
//       countdown.appendChild(createColon());
//       countdown.appendChild(createBox(hours));
//       countdown.appendChild(createColon());
//       countdown.appendChild(createBox(minutes));
//       countdown.appendChild(createColon());
//       countdown.appendChild(createBox(seconds));
//     };
  
//     updateCountdown();
//     setInterval(updateCountdown, 1000);
  
//     infoContainer.appendChild(countdown);
//     link.appendChild(infoContainer);
  
//     return link;
//   }
  
 
// export function listingCard(listing) {
//     const imageUrl =
//       listing.media?.[0]?.url || "https://via.placeholder.com/300x200?text=No+Image";
  
//     // 🧱 Wrapper som holder både countdown og kortet
//     const wrapper = document.createElement("div");
//     wrapper.classList.add("flex", "flex-col", "items-center", "gap-2");
  
//     // 🕒 Countdown (plassert over kortet)
//     const countdown = document.createElement("div");
//     countdown.classList.add("text-sm", "font-medium", "text-gray-700");
  
//     const updateCountdown = () => {
//       const endsAt = new Date(listing.endsAt);
//       const now = new Date();
//       const diff = endsAt - now;
  
//       if (diff <= 0) {
//         countdown.textContent = "Auction ended";
//         countdown.classList.add("text-red-600");
//         return;
//       }
  
//       const totalSeconds = Math.floor(diff / 1000);
//       const days = Math.floor(totalSeconds / (3600 * 24));
//       const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
//       const minutes = Math.floor((totalSeconds % 3600) / 60);
//       const seconds = totalSeconds % 60;
  
//       countdown.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
//     };
  
//     updateCountdown();
//     setInterval(updateCountdown, 1000);
  
//     // 🃏 Kortet som <a>
//     const link = document.createElement("a");
//     link.href = `/listing/?id=${listing.id}`;
//     link.classList.add(
//       "bg-white",
//       "rounded-xl",
//       "shadow",
//       "overflow-hidden",
//       "w-full",
//       "max-w-sm",
//       "flex",
//       "flex-col",
//       "transition-transform",
//       "hover:shadow-xl",
//       "hover:scale-[1.01]",
//       "duration-200"
//     );
  
//     // 🖼️ Image
//     const image = document.createElement("img");
//     image.classList.add("w-full", "h-48", "object-cover", "transition-transform", "duration-300", "hover:scale-105");
//     image.src = imageUrl;
//     image.alt = listing.title;
//     link.appendChild(image);
  
//     // 📄 Info container
//     const infoContainer = document.createElement("div");
//     infoContainer.classList.add("p-4", "flex", "flex-col", "gap-3");
  
//     const title = document.createElement("h2");
//     title.classList.add("text-lg", "font-bold", "truncate");
//     title.textContent = listing.title;
//     infoContainer.appendChild(title);
  
//     const bids = listing.bids || [];
//     const highestBid = bids.length > 0 ? Math.max(...bids.map((bid) => bid.amount)) : 0;
  
//     const currentBid = document.createElement("p");
//     currentBid.classList.add("text-gray-700");
//     currentBid.textContent = `Current bid: $${highestBid}`;
//     infoContainer.appendChild(currentBid);
  
//     link.appendChild(infoContainer);
  
//     // 🧩 Sett sammen alt
//     wrapper.appendChild(countdown);
//     wrapper.appendChild(link);
  
//     return wrapper;
//   }

// export function listingCard(listing) {
//     const imageUrl =
//       listing.media?.[0]?.url || "https://via.placeholder.com/300x200?text=No+Image";
  
//     const wrapper = document.createElement("div");
//     wrapper.classList.add("flex", "flex-col", "items-center", "gap-2");
  
//     const countdown = document.createElement("div");
//     countdown.classList.add("text-sm", "font-medium", "text-gray-700");
  
//     const link = document.createElement("a");
//     link.href = `/listing/?id=${listing.id}`;
//     link.classList.add(
//       "bg-white",
//       "rounded-xl",
//       "shadow",
//       "overflow-hidden",
//       "w-full",
//       "max-w-sm",
//       "flex",
//       "flex-col",
//       "transition-transform",
//       "hover:shadow-xl",
//       "hover:scale-[1.01]",
//       "duration-200"
//     );
  
//     const image = document.createElement("img");
//     image.classList.add("w-full", "h-48", "object-cover", "transition", "duration-300");
//     image.src = imageUrl;
//     image.alt = listing.title;
  
//     const infoContainer = document.createElement("div");
//     infoContainer.classList.add("p-4", "flex", "flex-col", "gap-3");
  
//     const title = document.createElement("h2");
//     title.classList.add("text-lg", "font-bold", "truncate");
//     title.textContent = listing.title;
  
//     const bids = listing.bids || [];
//     const highestBid = bids.length > 0 ? Math.max(...bids.map((bid) => bid.amount)) : 0;
  
//     const currentBid = document.createElement("p");
//     currentBid.classList.add("text-gray-700");
//     currentBid.textContent = `Current bid: $${highestBid}`;
  
//     // 🔁 Countdown-funksjon
//     const updateCountdown = () => {
//       const endsAt = new Date(listing.endsAt);
//       const now = new Date();
//       const diff = endsAt - now;
  
//       if (diff <= 0) {
//         // 🟥 Aukjsonen er ferdig
//         countdown.textContent = "Auction ended";
//         countdown.classList.add("text-red-600");
  
//         image.classList.add("grayscale", "brightness-75");
//         // image.src = "path/to/ended-placeholder.jpg"; // Hvis du vil bytte bilde senere
//         return;
//       }
  
//       const totalSeconds = Math.floor(diff / 1000);
//       const days = Math.floor(totalSeconds / (3600 * 24));
//       const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
//       const minutes = Math.floor((totalSeconds % 3600) / 60);
//       const seconds = totalSeconds % 60;
  
//       countdown.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
//     };
  
//     updateCountdown();
//     setInterval(updateCountdown, 1000);
  
//     infoContainer.append(title, currentBid);
//     link.append(image, infoContainer);
//     wrapper.append(countdown, link);
  
//     return wrapper;
//   }

export function listingCard(listing) {
    const imageUrl =
      listing.media?.[0]?.url || "https://via.placeholder.com/300x200?text=No+Image";
  
    const wrapper = document.createElement("div");
    wrapper.classList.add("flex", "flex-col", "items-center", "gap-2");
  
    const countdown = document.createElement("div");
    countdown.classList.add("text-sm", "font-medium", "text-gray-700");
  
    const link = document.createElement("a");
    link.href = `/listing/?id=${listing.id}`;
    link.classList.add(
      "group", // 👈 viktig for hover-effekt!
      "bg-white",
      "rounded-xl",
      "shadow",
      "overflow-hidden",
      "w-full",
      "max-w-sm",
      "flex",
      "flex-col",
      "transition-transform",
      "hover:shadow-xl",
      "hover:scale-[1.01]",
      "duration-200"
    );
  
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("overflow-hidden");
  
    const image = document.createElement("img");
    image.classList.add(
      "w-full",
      "h-48",
      "object-cover",
      "transition-transform",
      "duration-500",
      "ease-in-out",
      "group-hover:scale-110" // 👈 zoom-effekt
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
    const highestBid =
      bids.length > 0 ? Math.max(...bids.map((bid) => bid.amount)) : 0;
  
    const currentBid = document.createElement("p");
    currentBid.classList.add("text-gray-700");
    currentBid.textContent = `Current bid: $${highestBid}`;
  
    // Countdown-funksjon
    const updateCountdown = () => {
      const endsAt = new Date(listing.endsAt);
      const now = new Date();
      const diff = endsAt - now;
  
      if (diff <= 0) {
        countdown.textContent = "Auction ended";
        countdown.classList.add("text-red-600");
  
        image.classList.add("grayscale", "brightness-75");
        return;
      }
  
      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
  
      countdown.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };
  
    updateCountdown();
    setInterval(updateCountdown, 1000);
  
    infoContainer.append(title, currentBid);
    link.append(imageWrapper, infoContainer);
    wrapper.append(countdown, link);
  
    return wrapper;
  }
  
  
  