import { placeholder } from "../../utils/placeholder.mjs";

/**
 * Creates a fullscreen modal for viewing images in a lightbox-style carousel.
 *
 * @param {Array<{url: string, alt?: string}>} images - Array of image objects to display in the modal.
 * @returns {HTMLElement} A DOM element with a `.show(index)` method to open the modal at a specific image.
 */
export function createModal(images = []) {
  const modal = document.createElement("div");
  modal.classList.add(
    "fixed", "inset-0", "bg-black/80", "z-50", "hidden",
    "flex", "items-center", "justify-center"
  );

  const container = document.createElement("div");
  container.classList.add("relative");

  const img = document.createElement("img");
  img.classList.add("max-w-4xl", "max-h-[80vh]", "rounded", "shadow-lg");
  container.appendChild(img);

  // Left navigation button
  const prevBtn = document.createElement("button");
  prevBtn.textContent = "❮";
  prevBtn.classList.add(
    "absolute", "left-[-3rem]", "top-1/2", "-translate-y-1/2",
    "text-white", "p-2", "text-4xl"
  );

  // Right navigation button
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "❯";
  nextBtn.classList.add(
    "absolute", "right-[-3rem]", "top-1/2", "-translate-y-1/2",
    "text-white", "p-2", "text-4xl"
  );

  container.append(prevBtn, nextBtn);
  modal.appendChild(container);

  let currentIndex = 0;

  /**
   * Updates the modal content to display the image at the specified index.
   *
   * @param {number} index - Index of the image to display.
   */
  function updateModal(index) {
    currentIndex = (index + images.length) % images.length;
    const { url, alt } = images[currentIndex] || {};
    img.src = url || placeholder;
    img.alt = alt || `Image ${currentIndex + 1}`;
  }

  /**
   * Shows the modal and displays the image at the given index.
   *
   * @param {number} [index=0] - The index of the image to show.
   */
  modal.show = (index = 0) => {
    updateModal(index);
    modal.classList.remove("hidden");
  };

  // Navigation button events
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    updateModal(currentIndex - 1);
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    updateModal(currentIndex + 1);
  });

  // Click outside the image closes the modal
  modal.addEventListener("click", () => modal.classList.add("hidden"));

  // Prevent image container clicks from closing modal
  container.addEventListener("click", (e) => e.stopPropagation());

  return modal;
}
