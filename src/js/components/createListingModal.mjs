import { createListing } from "../api/listings/create.mjs";

export function createListingModal() {
  // Fjern tidligere modal hvis den finnes
  document.querySelectorAll(".create-listing-modal").forEach((m) => m.remove());

  const modal = document.createElement("div");
  modal.classList.add(
    "fixed", "inset-0", "bg-black/60", "flex", "items-center", "justify-center", "z-50", "create-listing-modal"
  );

  const dialog = document.createElement("div");
  dialog.classList.add(
    "bg-white", "rounded-xl", "p-6", "max-w-md", "w-full", "flex", "flex-col", "gap-4", "shadow-lg"
  );

  const title = document.createElement("h2");
  title.textContent = "Create New Listing";
  title.classList.add("text-xl", "font-bold", "text-center");

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.placeholder = "Title";
  titleInput.classList.add("border", "rounded", "p-2", "w-full");

  const descInput = document.createElement("textarea");
  descInput.placeholder = "Description";
  descInput.classList.add("border", "rounded", "p-2", "w-full");

  const endInput = document.createElement("input");
  endInput.type = "datetime-local";
  endInput.classList.add("border", "rounded", "p-2", "w-full");

  const mediaWrapper = document.createElement("div");
  mediaWrapper.classList.add("flex", "flex-col", "gap-2");

  const addMediaField = () => {
    const url = document.createElement("input");
    url.type = "url";
    url.placeholder = "Image URL";
    url.name = "imageURL";
    url.classList.add("border", "rounded", "p-2", "w-full");

    const alt = document.createElement("input");
    alt.type = "text";
    alt.placeholder = "Alt text";
    alt.name = "imageAltText";
    alt.classList.add("border", "rounded", "p-2", "w-full");

    mediaWrapper.append(url, alt);
  };

  addMediaField(); // legg til ett sett som standard

  const addMediaBtn = document.createElement("button");
  addMediaBtn.type = "button";
  addMediaBtn.textContent = "+ Add Image";
  addMediaBtn.classList.add("text-blue-600", "underline", "text-sm", "text-left");
  addMediaBtn.addEventListener("click", addMediaField);

  const errorMessage = document.createElement("p");
  errorMessage.classList.add("text-red-600", "text-center", "hidden");

  const buttons = document.createElement("div");
  buttons.classList.add("flex", "justify-between", "gap-2", "mt-4");

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Create Listing";
  submitBtn.classList.add("bg-violet-700", "text-white", "py-2", "px-4", "rounded", "w-full");

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.classList.add("bg-gray-300", "py-2", "px-4", "rounded", "w-full");

  cancelBtn.addEventListener("click", () => modal.remove());

  submitBtn.addEventListener("click", async () => {
    errorMessage.classList.add("hidden");

    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    const endsAt = new Date(endInput.value).toISOString();

    const media = Array.from(mediaWrapper.querySelectorAll('input[name="imageURL"]')).map((urlInput, i) => {
      const altInput = mediaWrapper.querySelectorAll('input[name="imageAltText"]')[i];
      return {
        url: urlInput.value,
        alt: altInput?.value || ""
      };
    }).filter(m => m.url);

    if (!title || !endInput.value) {
      errorMessage.textContent = "Title and end date are required.";
      errorMessage.classList.remove("hidden");
      return;
    }

    try {
      await createListing({ title, description, media, endsAt });

      modal.remove();               // ✅ Lukk modal
      window.location.reload();     // 🔁 Oppdater profilen
    } catch (err) {
      errorMessage.textContent = err.message || "Failed to create listing.";
      errorMessage.classList.remove("hidden");
    }
  });

  buttons.append(cancelBtn, submitBtn);
  dialog.append(title, titleInput, descInput, endInput, mediaWrapper, addMediaBtn, errorMessage, buttons);
  modal.appendChild(dialog);

  document.body.appendChild(modal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });

  return modal;
}
