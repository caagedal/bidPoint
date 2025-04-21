import { API_LISTINGS } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

/**
 * Deletes a listing by ID.
 *
 * @param {string} id - The ID of the listing to delete.
 * @returns {Promise<void>} Resolves if deletion is successful.
 * @throws {Error} If the ID is missing or the request fails.
 */
export async function deleteListing(id) {
  if (!id) throw new Error("Missing listing ID.");

  const url = `${API_LISTINGS}/${id}`;

  try {
    await authFetch(url, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("❌ Failed to delete listing:", error.message);
    throw new Error("Could not delete listing. " + error.message);
  }
}
