import { updateProfile } from "../api/profile/update.mjs";

/**
 * Creates and displays a modal for editing the user's profile.
 *
 * @param {object} profile - The current user profile data.
 * @param {string} [profile.bio] - The user's bio text.
 * @param {object} [profile.avatar] - The user's avatar object.
 * @param {string} [profile.avatar.url] - URL to the avatar image.
 * @param {object} [profile.banner] - The user's banner object.
 * @param {string} [profile.banner.url] - URL to the banner image.
 * @param {function} [onSuccess] - Optional callback to execute after a successful update.
 * @returns {HTMLElement} The modal DOM element.
 */
export function updateProfileModal(profile, onSuccess) {
  // Remove any existing modals
  document.querySelectorAll(".update-profile-modal").forEach((m) => m.remove());

  const modal = document.createElement("div");
  modal.classList.add(
    "fixed", "inset-0", "bg-black/60", "flex", "items-center", "justify-center", "z-50", "update-profile-modal"
  );

  const dialog = document.createElement("div");
  dialog.classList.add(
    "bg-white", "rounded-xl", "p-6", "max-w-md", "w-full", "flex", "flex-col", "gap-4", "shadow-lg"
  );

  const title = document.createElement("h2");
  title.textContent = "Edit Profile";
  title.classList.add("text-xl", "font-bold", "text-center");

  const bioTitle = document.createElement("p");
  bioTitle.textContent = "Bio";
  bioTitle.classList.add("font-semibold", "text-violet-700");

  const bioInput = document.createElement("textarea");
  bioInput.placeholder = "Bio";
  bioInput.value = profile.bio || "";
  bioInput.classList.add("border", "rounded", "p-2", "w-full");

  const avatarTitle = document.createElement("p");
  avatarTitle.textContent = "Avatar url";
  avatarTitle.classList.add("font-semibold", "text-violet-700");

  const avatarInput = document.createElement("input");
  avatarInput.type = "url";
  avatarInput.placeholder = "Avatar URL";
  avatarInput.value = profile.avatar?.url || "";
  avatarInput.classList.add("border", "rounded", "p-2", "w-full");

  const bannerTitle = document.createElement("p");
  bannerTitle.textContent = "Banner url";
  bannerTitle.classList.add("font-semibold", "text-violet-700");

  const bannerInput = document.createElement("input");
  bannerInput.type = "url";
  bannerInput.placeholder = "Banner URL";
  bannerInput.value = profile.banner?.url || "";
  bannerInput.classList.add("border", "rounded", "p-2", "w-full");

  const error = document.createElement("p");
  error.classList.add("text-red-600", "text-center", "hidden");

  const buttons = document.createElement("div");
  buttons.classList.add("flex", "justify-between", "gap-2", "mt-4");

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.classList.add("bg-violet-700", "text-white", "py-2", "px-4", "rounded", "w-full");

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.classList.add("bg-gray-300", "py-2", "px-4", "rounded", "w-full");
  cancelBtn.addEventListener("click", () => modal.remove());

  saveBtn.addEventListener("click", async () => {
    error.classList.add("hidden");

    try {
      const updated = await updateProfile({
        bio: bioInput.value.trim(),
        avatar: { url: avatarInput.value.trim(), alt: "Avatar" },
        banner: { url: bannerInput.value.trim(), alt: "Banner" },
      });

      modal.remove();
      if (typeof onSuccess === "function") {
        onSuccess(updated);
      }
    } catch (err) {
      error.textContent = err.message || "Failed to update profile";
      error.classList.remove("hidden");
    }
  });

  buttons.append(cancelBtn, saveBtn);
  dialog.append(title, bioTitle, bioInput, avatarTitle, avatarInput, bannerTitle, bannerInput, error, buttons);
  modal.appendChild(dialog);
  document.body.appendChild(modal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });

  return modal;
}
