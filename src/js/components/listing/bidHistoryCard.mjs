export function createBidHistoryCard({ bidder, amount }) {
    const card = document.createElement("article");
    card.classList.add("w-60", "bg-rose-200", "rounded-4xl", "p-5");
  
    const container = document.createElement("div");
    container.classList.add("flex", "justify-between", "items-center");
  
    const avatar = document.createElement("img");
    avatar.classList.add("rounded-full", "w-5");
    avatar.src = bidder?.avatar?.url || "/public/bidPoint.jpg"; // fallback
    avatar.alt = bidder?.avatar?.alt || "User avatar";
  
    const info = document.createElement("div");
  
    const nameLink = document.createElement("a");
    nameLink.href = `/profile/?name=${encodeURIComponent(bidder.name)}`;
    nameLink.textContent = bidder.name;
  
    const amountText = document.createElement("p");
    amountText.textContent = `$${amount}`;
  
    info.append(nameLink, amountText);
    container.append(avatar, info);
    card.appendChild(container);
  
    return card;
  }
  