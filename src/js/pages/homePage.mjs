import { getListings } from "../api/listings/display.mjs";
import { listingCard } from "../components/listingCard.mjs";
import { renderSearchResults } from "../components/listing/renderSearchResults.mjs";
import { renderPagination } from "../components/listing/renderPagination.mjs";

export async function renderListings(limit = 24, page = 1) {
  const grid = document.querySelector(".listing-grid");
  const pagination = document.querySelector("#pagination");
  const searchInput = document.querySelector("#searchInput");

  if (!grid || !pagination) return;

  // 🔍 Søkefunksjon
  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) {
          renderSearchResults(query);
          pagination.innerHTML = ""; // skjul paginering ved søk
        }
      }
    });
  }

  try {
    const result = await getListings(limit, page);
    const listings = result.data;
    const totalPages = result.meta.pageCount;

    grid.innerHTML = ""; // Clear old listings

    listings.forEach((listing) => {
      const card = listingCard(listing);
      grid.appendChild(card);
    });

    // 📄 Paginering
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
