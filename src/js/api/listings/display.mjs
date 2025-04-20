import { API_LISTINGS, API_SEARCH } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

// For listing grid
const listQuery = "?_seller=true&_bids=true&sort=created&sortOrder=desc";

// For single listing view
const detailQuery = "?_seller=true&_bids=true";

export async function getListings(limit = 24, page = 1) {
  try {
    const url = `${API_LISTINGS}${listQuery}&limit=${limit}&page=${page}`;
    return await authFetch(url);
  } catch (error) {
    throw new Error("Error receiving listings: " + error.message);
  }
}

export async function getListing(id) {
  if (!id) {
    throw new Error("No ID found");
  }

  try {
    const url = `${API_LISTINGS}/${id}${detailQuery}`;
    const response = await authFetch(url);
    return response.data; // ✅ riktig struktur
  } catch (error) {
    throw new Error("Error getting listing: " + error.message);
  }
}


export async function getListingsBySearch(query) {
  if (!query) throw new Error("Search query is required");

  try {
    const url = `${API_SEARCH}?q=${encodeURIComponent(query)}&_seller=true&_bids=true&sort=created&sortOrder=desc`;
    const response = await authFetch(url);
    return response.data;
  } catch (error) {
    throw new Error("Search failed: " + error.message);
  }
}



