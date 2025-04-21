import { API_PROFILE } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

/**
 * Retrieves the full, up-to-date profile of the logged-in user.
 * Includes the user's listings, bids, and wins.
 *
 * @param {string} name - The username of the profile to fetch.
 * @returns {Promise<object>} The profile data from the API.
 * @throws {Error} If the username is missing or the request fails.
 */
export async function getProfile(name) {
  if (!name) {
    throw new Error("Username is required to fetch profile.");
  }

  const url = `${API_PROFILE}/${name}?_listings=true&_bids=true&_wins=true`;
  return await authFetch(url);
}
