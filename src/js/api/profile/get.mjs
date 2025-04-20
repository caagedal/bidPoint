// src/js/api/auth/getProfile.mjs
import { API_PROFILE } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

/**
 * Gets the full, up-to-date profile of the logged-in user.
 * Includes listings, bids and wins.
 * @param {string} name - Username
 * @returns {Promise<object>} - Profile data from API
 */
export async function getProfile(name) {
  if (!name) throw new Error("Missing username in getProfile");

  const url = `${API_PROFILE}/${name}?_listings=true&_bids=true&_wins=true`;
  return await authFetch(url);
}
