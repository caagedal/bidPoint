import { getListingsBySearch } from "../../api/listings/display.mjs";
import { listingCard } from "../listingCard.mjs";

export async function renderSearchResults(query) {
  const grid = document.querySelector(".listing-grid");
  if (!grid || !query) return;

  // Fjern tidligere innhold
  grid.replaceChildren();

  // 🔍 Vis "søker"-melding
  const loadingMsg = document.createElement("p");
  loadingMsg.textContent = `Searching for "${query}"...`;
  loadingMsg.classList.add("text-gray-600", "italic");
  grid.appendChild(loadingMsg);

  try {
    const listings = await getListingsBySearch(query);

    // Tøm grid og fjern loading
    grid.replaceChildren();

    if (listings.length === 0) {
      const noResultMsg = document.createElement("p");
      noResultMsg.textContent = `No results found for "${query}"`;
      noResultMsg.classList.add("text-red-500", "font-medium");
      grid.appendChild(noResultMsg);
      return;
    }

    listings.forEach(listing => {
      const card = listingCard(listing);
      grid.appendChild(card);
    });

  } catch (error) {
    grid.replaceChildren();
    const errorMsg = document.createElement("p");
    errorMsg.textContent = `Search failed: ${error.message}`;
    errorMsg.classList.add("text-red-600", "font-medium");
    grid.appendChild(errorMsg);
  }
}
