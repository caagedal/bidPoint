import { API_LISTINGS } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

/**
 * Places a bid on a specific listing.
 *
 * @param {string} id - The ID of the listing to bid on.
 * @param {number} amount - The bid amount.
 * @returns {Promise<object>} The response data from the API.
 * @throws {Error} If required inputs are missing or the request fails.
 */
export async function placeBid(id, amount) {
  if (!id) throw new Error("Missing listing ID.");
  if (amount == null) throw new Error("Missing bid amount.");

  const url = `${API_LISTINGS}/${id}/bids`;

  try {
    return await authFetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });
  } catch (error) {
    console.error("❌ Failed to place bid:", error.message);
    throw new Error("Could not place bid. " + error.message);
  }
}
