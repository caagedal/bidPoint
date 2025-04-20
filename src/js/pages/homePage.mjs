import { getListings } from "../api/listings/display.mjs";
import { listingCard } from "../components/listingCard.mjs";

export async function renderListings(limit = 24, page = 1) {
  const grid = document.querySelector(".listing-grid");

  if (!grid) return;

  try {
    const result = await getListings(limit, page);
    const listings = result.data;

    grid.innerHTML = ""; // Clear old listings

    listings.forEach((listing) => {
      const card = listingCard(listing);
      grid.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to render listings:", error.message);

    const errorBox = document.createElement("div");
    errorBox.classList.add("text-red-600", "text-center", "p-6", "bg-red-100", "rounded");
    errorBox.textContent = `Something went wrong: ${error.message}`;

    grid.innerHTML = "";
    grid.appendChild(errorBox);
  }
}
