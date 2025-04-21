/**
 * Registers a new user by sending their information to the registration API.
 *
 * @param {Object} userInfo - The user's registration details.
 * @param {string} userInfo.name - The user's full name.
 * @param {string} userInfo.email - The user's email address.
 * @param {string} userInfo.password - The user's chosen password.
 * @returns {Promise<Object>} The response data from the API.
 * @throws {Error} If the registration request fails or the response is not OK.
 */
import { API_REG } from "../constants.mjs";

export async function registerUser({ name, email, password }) {
  const response = await fetch(API_REG, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    const message = data.errors
      ? data.errors.map((e) => e.message || e).join(", ")
      : data.message || "Unknown error";
    throw new Error(message);
  }

  return data;
}
