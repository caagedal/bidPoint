import { load } from "../../storage/index.mjs";

/**
 * Checks whether the user is currently logged in.
 *
 * @returns {boolean} True if a token exists, false otherwise.
 */
export function isLoggedIn() {
  return Boolean(load("token"));
}

/**
 * Retrieves the current user's profile data from storage.
 *
 * @returns {Object|null} The user profile object, or null if not found.
 */
export function getUser() {
  return load("profile");
}

/**
 * Gets the user's available credits from their profile.
 *
 * @returns {number} The number of credits, or 0 if unavailable.
 */
export function getCredits() {
  const user = getUser();
  return user?.credits || 0;
}
