import { API_LISTINGS } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

/**
 * Places a bid on a specific listing
 * @param {string} id - Listing ID
 * @param {number} amount - Bid amount
 * @returns {Promise<object>} - The response data from the API
 * @throws {Error} - If missing input or fetch fails
 */
export async function placeBid(id, amount) {
  if (!id) throw new Error("Missing listing ID.");
  if (!amount) throw new Error("Missing bid amount.");

  const url = `${API_LISTINGS}/${id}/bids`;

  try {
    const response = await authFetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });

    return response; // authFetch already parses JSON + handles errors
  } catch (error) {
    console.error("❌ Failed to place bid:", error.message);
    throw new Error("Could not place bid. " + error.message);
  }
}
