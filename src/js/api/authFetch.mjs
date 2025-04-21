import { load } from "../storage/index.mjs";
import { API_KEY } from "./constants.mjs";

/**
 * Constructs default headers for authenticated API requests.
 *
 * @returns {object} An object containing the necessary headers, including token and API key.
 */
export function headers() {
  const token = load("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "x-Noroff-API-Key": API_KEY,
  };
}

/**
 * Performs an authenticated fetch request with standardized error handling and headers.
 *
 * @param {string} url - The endpoint to fetch.
 * @param {object} [options={}] - Optional fetch options (method, headers, body, etc.).
 * @returns {Promise<object>} The parsed JSON response.
 * @throws {Error} If the response is not ok or fetch fails.
 */
export async function authFetch(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers(),
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const message = data.errors
        ? JSON.stringify(data.errors, null, 2)
        : data.message || "Unknown error";

      throw new Error(message);
    }

    return data;
  } catch (error) {
    console.error("authFetch error:", error);
    throw error;
  }
}
