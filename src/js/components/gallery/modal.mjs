import { placeholder } from "../../utils/placeHolder.mjs";

export function createModal(images = []) {
  const modal = document.createElement("div");
  modal.classList.add("fixed", "inset-0", "bg-black/80", "z-50", "hidden", "flex", "items-center", "justify-center");

  const img = document.createElement("img");
  img.classList.add("max-w-4xl", "max-h-[80vh]", "rounded");
  modal.appendChild(img);

  modal.addEventListener("click", () => modal.classList.add("hidden"));

  let currentIndex = 0;

  function updateModal(index) {
    currentIndex = index;
    const { url, alt } = images[index] || {};
    img.src = url || placeholder;
    img.alt = alt || `Image ${index + 1}`;
  }

  modal.show = (index = 0) => {
    updateModal(index);
    modal.classList.remove("hidden");
  };

  return modal;
}
