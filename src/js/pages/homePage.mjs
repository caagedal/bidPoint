import { getListings } from "../api/listings/display.mjs";
import { listingCard } from "../components/listingCard.mjs";
import { renderSearchResults } from "../components/listing/renderSearchResults.mjs";
import { renderPagination } from "../components/listing/renderPagination.mjs";
import { createHeader } from "../components/header.mjs";

/**
 * Renders a paginated list of listings and attaches search functionality.
 *
 * @param {number} [limit=24] - Number of listings per page.
 * @param {number} [page=1] - Current page number.
 * @returns {Promise<void>} Resolves when listings and pagination are rendered.
 */
export async function renderListings(limit = 24, page = 1) {
  const grid = document.querySelector(".listing-grid");
  const pagination = document.querySelector("#pagination");
  const searchInput = document.querySelector("#searchInput");

  if (!grid || !pagination) return;

  // 🔍 Search input listener
  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) {
          renderSearchResults(query);
          pagination.innerHTML = ""; // Hide pagination on search
        }
      }
    });
  }

  try {
    const result = await getListings(limit, page);
    const listings = result.data;
    const totalPages = result.meta.pageCount;

    grid.innerHTML = ""; // Clear previous results

    listings.forEach((listing) => {
      const card = listingCard(listing);
      grid.appendChild(card);
    });

    // 📄 Pagination
    renderPagination(pagination, page, totalPages, (newPage) => renderListings(limit, newPage));
  } catch (error) {
    console.error("Failed to render listings:", error.message);

    const errorBox = document.createElement("div");
    errorBox.classList.add("text-red-600", "text-center", "p-6", "bg-red-100", "rounded");
    errorBox.textContent = `Something went wrong: ${error.message}`;

    grid.innerHTML = "";
    grid.appendChild(errorBox);
    pagination.innerHTML = "";
  }
}

// Initialize page
renderListings();
createHeader();
