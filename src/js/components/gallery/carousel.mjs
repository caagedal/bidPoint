import { createModal } from "./modal.mjs";
import { placeholder } from "../../utils/placeholder.mjs";

/**
 * Lager bildekarusell for én listing.
 */
export function createCarousel(media = []) {
  const images = media.length ? media : [{ url: placeholder, alt: "No image" }];
  let currentIndex = 0;

  // 🌟 Wrapper for hele karusellen
  const wrapper = document.createElement("div");
  wrapper.classList.add("relative", "w-full");

  // 🖼️ Hovedbilde
  const mainImage = document.createElement("img");
  mainImage.src = images[currentIndex].url;
  mainImage.alt = images[currentIndex].alt || "Image";
  mainImage.classList.add(
    "w-full", "aspect-video", "rounded", "object-cover", "cursor-pointer",
    "transition-transform", "duration-300", "ease-in-out", "hover:scale-105", "shadow"
  );

  // 📸 Modal
  const modal = createModal(images);
  document.body.appendChild(modal);
  mainImage.addEventListener("click", () => modal.show(currentIndex));

  // ⬅️ Navigasjon venstre
  const navLeft = document.createElement("button");
  navLeft.innerHTML = "❮";
  navLeft.classList.add(
    "absolute", "top-1/2", "left-4", "-translate-y-1/2",
    "bg-black/60", "text-white", "rounded-full", "w-10", "h-10", "flex", "items-center", "justify-center",
    "hover:bg-black", "transition", "duration-200"
  );
  navLeft.addEventListener("click", () => navigate(-1));

  // ➡️ Navigasjon høyre
  const navRight = document.createElement("button");
  navRight.innerHTML = "❯";
  navRight.classList.add(
    "absolute", "top-1/2", "right-4", "-translate-y-1/2",
    "bg-black/60", "text-white", "rounded-full", "w-10", "h-10", "flex", "items-center", "justify-center",
    "hover:bg-black", "transition", "duration-200"
  );
  navRight.addEventListener("click", () => navigate(1));

  // 🧩 Thumbnails
  const thumbs = document.createElement("div");
  thumbs.classList.add("flex", "gap-3", "mt-4", "justify-center", "flex-wrap");

  images.forEach((img, i) => {
    const thumb = document.createElement("img");
    thumb.src = img.url || placeholder;
    thumb.alt = img.alt || `Image ${i + 1}`;
    thumb.classList.add(
      "w-16", "h-16", "object-cover", "rounded", "cursor-pointer",
      "transition", "duration-200", i === 0 ? "ring-2" : "opacity-60"
    );

    thumb.addEventListener("click", () => {
      currentIndex = i;
      updateImage();
    });

    thumbs.appendChild(thumb);
  });

  const navigate = (step) => {
    currentIndex = (currentIndex + step + images.length) % images.length;
    updateImage();
  };

  const updateImage = () => {
    const { url, alt } = images[currentIndex];
    mainImage.src = url || placeholder;
    mainImage.alt = alt || `Image ${currentIndex + 1}`;

    [...thumbs.children].forEach((thumb, i) => {
      thumb.classList.toggle("ring-2", i === currentIndex);
      thumb.classList.toggle("opacity-60", i !== currentIndex);
    });
  };

  wrapper.append(mainImage);
  if (images.length > 1) {
    wrapper.append(navLeft, navRight);
  }

  const container = document.createElement("div");
  container.classList.add("w-full");
  container.append(wrapper, thumbs);

  return container;
}
