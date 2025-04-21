import { API_LISTINGS, API_SEARCH } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

// For listing grid
const listQuery = "?_seller=true&_bids=true&sort=created&sortOrder=desc";

// For single listing view
const detailQuery = "?_seller=true&_bids=true";

/**
 * Fetches a paginated list of listings with seller and bid details.
 *
 * @param {number} [limit=24] - Number of listings per page.
 * @param {number} [page=1] - Page number to retrieve.
 * @returns {Promise<object>} The listings data from the API.
 * @throws {Error} If the request fails.
 */
export async function getListings(limit = 24, page = 1) {
  try {
    const url = `${API_LISTINGS}${listQuery}&limit=${limit}&page=${page}`;
    return await authFetch(url);
  } catch (error) {
    throw new Error("Error receiving listings: " + error.message);
  }
}

/**
 * Fetches a single listing by ID, including seller and bid details.
 *
 * @param {string} id - The ID of the listing to fetch.
 * @returns {Promise<object>} The listing data.
 * @throws {Error} If the ID is missing or request fails.
 */
export async function getListing(id) {
  if (!id) {
    throw new Error("Listing ID is required.");
  }

  try {
    const url = `${API_LISTINGS}/${id}${detailQuery}`;
    const response = await authFetch(url);
    return response.data;
  } catch (error) {
    throw new Error("Error getting listing: " + error.message);
  }
}

/**
 * Searches for listings based on a query string.
 *
 * @param {string} query - The search term.
 * @returns {Promise<object[]>} Array of matching listing objects.
 * @throws {Error} If the query is missing or request fails.
 */
export async function getListingsBySearch(query) {
  if (!query) throw new Error("Search query is required.");

  try {
    const url = `${API_SEARCH}?q=${encodeURIComponent(query)}&_seller=true&_bids=true&sort=created&sortOrder=desc`;
    const response = await authFetch(url);
    return response.data;
  } catch (error) {
    throw new Error("Search failed: " + error.message);
  }
}
