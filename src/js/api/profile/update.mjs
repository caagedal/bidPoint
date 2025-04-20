// src/js/api/profile/updateProfile.mjs
import { API_PROFILE, API_KEY } from "../constants.mjs";
import { load } from "../../storage/index.mjs";

/**
 * Updates the user's profile (avatar, banner, bio)
 * @param {object} data - profile update object (avatar, banner, bio)
 */
export async function updateProfile(data = {}) {
  const user = load("profile");
  if (!user?.name) throw new Error("Missing username for update");

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
