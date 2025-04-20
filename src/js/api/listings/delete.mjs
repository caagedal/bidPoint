import { API_LISTINGS } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

export async function deleteListing(id) {
  if (!id) throw new Error("Missing ID");

  try {
    const url = `${API_LISTINGS}/${id}`;
    await authFetch(url, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Failed to delete listing:", error.message);
    throw error;
  }
}