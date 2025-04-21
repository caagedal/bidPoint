import { API_LISTINGS } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

/**
 * Creates a new listing.
 *
 * @param {object} data - The listing data.
 * @param {string} data.title - The title of the listing.
 * @param {string} data.description - The description of the listing.
 * @param {string} data.endsAt - The end date/time in ISO format.
 * @param {string[]} [data.media] - Optional array of media URLs.
 * @param {string[]} [data.tags] - Optional array of tags.
 * @returns {Promise<object>} The created listing object.
 * @throws {Error} If required fields are missing or request fails.
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

  return result.data;
}
