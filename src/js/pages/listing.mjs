// import { getListing } from "../api/listings/display.mjs";
// import { getUser } from "../utils/getUser.mjs";

// const params = new URLSearchParams(window.location.search);
// const id = params.get("id");
// const main = document.querySelector("#listingId");

// export async function renderListing() {
//   if (!id) {
//     main.textContent = "No listing ID found.";
//     return;
//   }

//   try {
//     const listing = await getListing(id);
//     const user = getUser();

//     const container = document.createElement("div");
//     container.classList.add("flex", "flex-col", "gap-4");

//     // Image
//     const img = document.createElement("img");
//     img.src = listing.media?.[0]?.url || "https://via.placeholder.com/600x400";
//     img.alt = listing.title;
//     img.classList.add("w-full", "rounded", "shadow");

//     // Title + Description
//     const title = document.createElement("h1");
//     title.textContent = listing.title;
//     title.classList.add("text-3xl", "font-bold");

//     const desc = document.createElement("p");
//     desc.textContent = listing.description || "No description.";
//     desc.classList.add("text-gray-600");

//     container.append(img, title, desc);

//     // Check if user can bid
//     if (user && user.name !== listing.seller.name) {
//       const form = document.createElement("form");
//       form.classList.add("flex", "gap-2");

//       const input = document.createElement("input");
//       input.type = "number";
//       input.min = 1;
//       input.placeholder = "Your bid...";
//       input.classList.add("border", "p-2", "rounded");

//       const btn = document.createElement("button");
//       btn.textContent = "Place bid";
//       btn.type = "submit";
//       btn.classList.add("bg-blue-600", "text-white", "px-4", "py-2", "rounded");

//       form.append(input, btn);
//       container.appendChild(form);

//       form.addEventListener("submit", (e) => {
//         e.preventDefault();
//         const bidAmount = parseFloat(input.value);
//         // TODO: validate + send to API
//         console.log("Place bid:", bidAmount);
//       });
//     } else if (!user) {
//       const msg = document.createElement("p");
//       msg.textContent = "You must be logged in to place a bid.";
//       msg.classList.add("text-red-500");
//       container.appendChild(msg);
//     }

//     main.appendChild(container);
//   } catch (error) {
//     console.error("Error loading listing:", error);
//     main.textContent = "Could not load listing.";
//   }
// }

// renderListing();


import { getListing } from "../api/listings/display.mjs";
import { getUser } from "../utils/getUser.mjs";
// import { placeBid } from "../api/listings/bids.mjs"; // hvis du lager denne!

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const main = document.querySelector("#listingId");

export async function renderListing() {
  if (!id) {
    main.textContent = "No listing ID found.";
    return;
  }

  try {
    const { data: listing } = await getListing(id); // viktig at getListing returnerer { data }
    const user = getUser();

    const container = document.createElement("div");
    container.classList.add("flex", "flex-col", "gap-4", "max-w-3xl", "mx-auto", "p-4");

    // 🖼️ Bilde
    const img = document.createElement("img");
    img.src = listing.media?.[0]?.url || "https://via.placeholder.com/600x400";
    img.alt = listing.title;
    img.classList.add("w-full", "rounded", "shadow");

    // 🏷️ Tittel
    const title = document.createElement("h1");
    title.textContent = listing.title;
    title.classList.add("text-3xl", "font-bold");

    // 📝 Beskrivelse
    const desc = document.createElement("p");
    desc.textContent = listing.description || "No description provided.";
    desc.classList.add("text-gray-700");

    // 👤 Selger
    const seller = document.createElement("p");
    seller.innerHTML = `<strong>Seller:</strong> ${listing.seller?.name || "Unknown"}`;

    // 💰 Høyeste bud
    const bids = listing.bids || [];
    const highestBid = bids.length > 0 ? Math.max(...bids.map(bid => bid.amount)) : 0;

    const bidInfo = document.createElement("p");
    bidInfo.innerHTML = `<strong>Current highest bid:</strong> $${highestBid}`;

    container.append(img, title, desc, seller, bidInfo);

    // 🎯 Budskjema (hvis IKKE eier og logget inn)
    if (user && user.name !== listing.seller?.name) {
      const form = document.createElement("form");
      form.classList.add("flex", "gap-2", "items-center");

      const input = document.createElement("input");
      input.type = "number";
      input.min = highestBid + 1;
      input.placeholder = `Min: $${highestBid + 1}`;
      input.classList.add("border", "p-2", "rounded", "w-32");

      const btn = document.createElement("button");
      btn.textContent = "Place bid";
      btn.type = "submit";
      btn.classList.add("bg-blue-600", "text-white", "px-4", "py-2", "rounded");

      form.append(input, btn);
      container.appendChild(form);

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const bidAmount = parseFloat(input.value);

        if (isNaN(bidAmount) || bidAmount <= highestBid) {
          alert(`Please enter a valid bid greater than $${highestBid}`);
          return;
        }

        // TODO: Send til API:
        console.log("💸 Placing bid:", bidAmount);

        // Eksempel:
        // try {
        //   await placeBid(listing.id, bidAmount);
        //   alert("Bid placed!");
        //   location.reload();
        // } catch (error) {
        //   console.error("Failed to place bid:", error);
        //   alert("Could not place bid.");
        // }
      });
    } 
    // 🛑 Eier
    else if (user && user.name === listing.seller?.name) {
      const msg = document.createElement("p");
      msg.textContent = "You are the seller of this listing.";
      msg.classList.add("text-yellow-600", "font-medium");
      container.appendChild(msg);
    } 
    // ❌ Ikke logget inn
    else {
      const msg = document.createElement("p");
      msg.textContent = "You must be logged in to place a bid.";
      msg.classList.add("text-red-500");
      container.appendChild(msg);
    }

    main.appendChild(container);
  } catch (error) {
    console.error("Error loading listing:", error);
    main.textContent = "Could not load listing.";
  }
}

renderListing();
