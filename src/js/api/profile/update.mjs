import { API_PROFILE, API_KEY } from "../constants.mjs";
import { load } from "../../storage/index.mjs";

/**
 * Updates the user's profile with new avatar, banner, or bio.
 *
 * @param {object} data - The profile update data.
 * @param {string} [data.avatar] - Optional URL to the user's new avatar image.
 * @param {string} [data.banner] - Optional URL to the user's new banner image.
 * @param {string} [data.bio] - Optional user bio text.
 * @returns {Promise<object>} The updated profile object.
 * @throws {Error} If the user is not logged in or the request fails.
 */
export async function updateProfile(data = {}) {
  const user = load("profile");
  if (!user?.name) throw new Error("Missing username for profile update.");

  const url = `${API_PROFILE}/${user.name}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${load("token")}`,
      "Content-Type": "application/json",
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Failed to update profile: ${message}`);
  }

  return await response.json();
}
