// src/js/components/createListingModal.mjs
import { createListing } from "../api/listings/create.mjs";

export function createListingModal() {
  // 🔄 Fjern eksisterende modal hvis den finnes
  document.querySelectorAll(".create-listing-modal").forEach((m) => m.remove());

  // 🖤 Bakgrunn
  const modal = document.createElement("div");
  modal.classList.add(
    "fixed", "inset-0", "bg-black/60", "flex", "items-center", "justify-center", "z-50", "create-listing-modal"
  );

  // 💬 Innhold
  const dialog = document.createElement("div");
  dialog.classList.add("bg-white", "rounded-xl", "p-6", "w-full", "max-w-md", "shadow-lg", "flex", "flex-col", "gap-4");

  const heading = document.createElement("h2");
  heading.textContent = "Create New Listing";
  heading.classList.add("text-xl", "font-bold", "text-center");

  const titleInput = document.createElement("input");
  titleInput.placeholder = "Title";
  titleInput.classList.add("p-2", "border", "rounded");

  const descInput = document.createElement("textarea");
  descInput.placeholder = "Description";
  descInput.classList.add("p-2", "border", "rounded");

  const tagsInput = document.createElement("input");
  tagsInput.placeholder = "Tags (comma-separated)";
  tagsInput.classList.add("p-2", "border", "rounded");

  const endsAtInput = document.createElement("input");
  endsAtInput.type = "datetime-local";
  endsAtInput.classList.add("p-2", "border", "rounded");

  const imageUrlInput = document.createElement("input");
  imageUrlInput.placeholder = "Image URL";
  imageUrlInput.classList.add("p-2", "border", "rounded");

  const imageAltInput = document.createElement("input");
  imageAltInput.placeholder = "Image Alt Text";
  imageAltInput.classList.add("p-2", "border", "rounded");

  const error = document.createElement("p");
  error.classList.add("text-red-600", "hidden");

  // 🔘 Knappene
  const buttons = document.createElement("div");
  buttons.classList.add("flex", "justify-between", "gap-4");

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.classList.add("bg-gray-300", "rounded", "py-2", "px-4", "w-full");
  cancelBtn.addEventListener("click", () => modal.remove());

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Create Listing";
  submitBtn.classList.add("bg-violet-700", "text-white", "rounded", "py-2", "px-4", "w-full");

  submitBtn.addEventListener("click", async () => {
    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    const tags = tagsInput.value.split(",").map((tag) => tag.trim()).filter(Boolean);
    const endsAt = new Date(endsAtInput.value).toISOString();
    const media = [{ url: imageUrlInput.value.trim(), alt: imageAltInput.value.trim() }];

    if (!title || !endsAtInput.value) {
      error.textContent = "Title and End Date are required";
      error.classList.remove("hidden");
      return;
    }

    try {
      submitBtn.disabled = true;
      const result = await createListing({ title, description, tags, media, endsAt });
      modal.remove();
      window.location.href = `/listing/?id=${result.id}`;
    } catch (err) {
      error.textContent = err.message || "Failed to create listing";
      error.classList.remove("hidden");
      submitBtn.disabled = false;
    }
  });

  buttons.append(cancelBtn, submitBtn);

  dialog.append(
    heading,
    titleInput,
    descInput,
    tagsInput,
    endsAtInput,
    imageUrlInput,
    imageAltInput,
    error,
    buttons
  );

  modal.append(dialog);
  document.body.appendChild(modal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });

  return modal;
}
