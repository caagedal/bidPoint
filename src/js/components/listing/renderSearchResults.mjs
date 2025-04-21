import { getListingsBySearch } from "../../api/listings/display.mjs";
import { listingCard } from "../listingCard.mjs";

/**
 * Renders search results into a `.listing-grid` container based on the query.
 *
 * @param {string} query - The search term to query listings by.
 * @returns {Promise<void>} Resolves once the results are rendered.
 */
export async function renderSearchResults(query) {
  const grid = document.querySelector(".listing-grid");
  if (!grid || !query) return;

  // Clear previous results
  grid.replaceChildren();

  // Show loading message
  const loadingMsg = document.createElement("p");
  loadingMsg.textContent = `Searching for "${query}"...`;
  loadingMsg.classList.add("text-gray-600", "italic");
  grid.appendChild(loadingMsg);

  try {
    const listings = await getListingsBySearch(query);

    // Clear grid again before rendering results
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
