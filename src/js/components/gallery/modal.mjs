import { placeholder } from "../../utils/placeholder.mjs";

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

  // Navigasjon ←
  const prevBtn = document.createElement("button");
  prevBtn.textContent = "←";
  prevBtn.classList.add(
    "absolute", "left-[-3rem]", "top-1/2", "-translate-y-1/2",
    "text-white", "bg-black/60", "rounded-full", "px-3", "py-1", "text-xl", "hover:bg-black"
  );

  // Navigasjon →
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "→";
  nextBtn.classList.add(
    "absolute", "right-[-3rem]", "top-1/2", "-translate-y-1/2",
    "text-white", "bg-black/60", "rounded-full", "px-3", "py-1", "text-xl", "hover:bg-black"
  );

  container.append(prevBtn, nextBtn);
  modal.appendChild(container);

  let currentIndex = 0;

  function updateModal(index) {
    currentIndex = (index + images.length) % images.length; // wrap
    const { url, alt } = images[currentIndex] || {};
    img.src = url || placeholder;
    img.alt = alt || `Image ${currentIndex + 1}`;
  }

  modal.show = (index = 0) => {
    updateModal(index);
    modal.classList.remove("hidden");
  };

  // Navigering
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    updateModal(currentIndex - 1);
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    updateModal(currentIndex + 1);
  });

  // Klikk utenfor lukker modalen
  modal.addEventListener("click", () => modal.classList.add("hidden"));

  // Hindrer at man klikker på bildet og lukker
  container.addEventListener("click", (e) => e.stopPropagation());

  return modal;
}
