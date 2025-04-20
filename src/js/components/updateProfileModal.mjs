import { updateProfile } from "../api/profile/update.mjs";

export function updateProfileModal(profile, onSuccess) {
  // Fjern tidligere modal hvis den finnes
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

  const bioInput = document.createElement("textarea");
  bioInput.placeholder = "Bio";
  bioInput.value = profile.bio || "";
  bioInput.classList.add("border", "rounded", "p-2", "w-full");

  const avatarInput = document.createElement("input");
  avatarInput.type = "url";
  avatarInput.placeholder = "Avatar URL";
  avatarInput.value = profile.avatar?.url || "";
  avatarInput.classList.add("border", "rounded", "p-2", "w-full");

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
      if (typeof onSuccess === "function") onSuccess(updated);
    } catch (err) {
      error.textContent = err.message || "Failed to update profile";
      error.classList.remove("hidden");
    }
  });

  buttons.append(cancelBtn, saveBtn);
  dialog.append(title, bioInput, avatarInput, bannerInput, error, buttons);
  modal.appendChild(dialog);

  document.body.appendChild(modal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });

  return modal;
}
