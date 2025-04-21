import { load } from "../storage/index.mjs";

/**
 * Checks if the user is currently logged in.
 * Requires both a valid token and profile in localStorage.
 *
 * @returns {boolean} `true` if user is logged in, otherwise `false`.
 */
export function isLoggedIn() {
  return !!load("token") && !!load("profile");
}
