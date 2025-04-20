// src/js/api/listings/createListing.mjs
import { API_LISTINGS } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

/**
 * Creates a new listing
 * @param {object} data - Listing data object (title, description, endsAt, media, tags)
 * @returns {object} - The created listing
 */


export async function createListing(data) {
  if (!data?.title || !data?.endsAt) {
    throw new Error("Title and end date are required.");
  }

  const result = await authFetch(API_LISTINGS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return result.data; // ✔️ Dette er selve listing-objektet, med .id
}


