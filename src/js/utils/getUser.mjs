import { load } from "../storage/index.mjs";

/**
 * Retrieves the currently logged-in user's profile from localStorage.
 *
 * @returns {object|null} The user profile object if available, otherwise null.
 */
export function getUser() {
  return load("profile");
}
