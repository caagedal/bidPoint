/**
 * Logs in a user by sending their credentials to the login API.
 * Stores the received access token and user profile in local storage.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} The user profile data (excluding the access token).
 * @throws {Error} If the login request fails or the response is not OK.
 */
import { API_LOGIN } from "../constants.mjs";
import { save } from "../../storage/index.mjs";

export async function loginUser(email, password) {
  const response = await fetch(API_LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    const message = data.errors
      ? data.errors.map((e) => e.message || e).join(", ")
      : data.message || "Unknown error";
    throw new Error(message);
  }

  const { accessToken, ...user } = data.data;

  save("token", accessToken);
  save("profile", user);

  return user;
}
