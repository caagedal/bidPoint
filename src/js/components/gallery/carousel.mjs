import { createModal } from "./modal.mjs";
import { placeholder } from "../../utils/placeHolder.mjs";

/**
 * Lager bildekarusell for én listing.
 */
export function createCarousel(media = []) {
  const images = media.length ? media : [{ url: placeholder, alt: "No image" }];
  let currentIndex = 0;

  const wrapper = document.createElement("div");
  wrapper.classList.add("relative", "max-w-2xl", "mx-auto");

  const mainImage = document.createElement("img");
  mainImage.classList.add("w-full", "rounded", "object-cover", "cursor-pointer", "transition-transform", "hover:scale-105");
  mainImage.src = images[currentIndex].url;
  mainImage.alt = images[currentIndex].alt || "Image";

  const modal = createModal(images);
  document.body.appendChild(modal);
  mainImage.addEventListener("click", () => modal.show(currentIndex));

  const navLeft = document.createElement("button");
  navLeft.innerHTML = "←";
  navLeft.classList.add("absolute", "left-2", "top-1/2", "-translate-y-1/2", "bg-black/50", "text-white", "rounded-full", "px-2", "py-1", "text-xl");
  navLeft.addEventListener("click", () => navigate(-1));

  const navRight = document.createElement("button");
  navRight.innerHTML = "→";
  navRight.classList.add("absolute", "right-2", "top-1/2", "-translate-y-1/2", "bg-black/50", "text-white", "rounded-full", "px-2", "py-1", "text-xl");
  navRight.addEventListener("click", () => navigate(1));

  const thumbs = document.createElement("div");
  thumbs.classList.add("flex", "gap-2", "mt-4", "justify-center");

  images.forEach((img, i) => {
    const thumb = document.createElement("img");
    thumb.src = img.url || placeholder;
    thumb.alt = img.alt || `Thumb ${i + 1}`;
    thumb.classList.add("w-16", "h-16", "object-cover", "rounded", "cursor-pointer", i === 0 ? "ring-2" : "opacity-70");

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
      thumb.classList.toggle("opacity-70", i !== currentIndex);
    });
  };

  wrapper.append(mainImage);
  if (images.length > 1) {
    wrapper.append(navLeft, navRight);
  }

  const container = document.createElement("div");
  container.append(wrapper, thumbs);

  return container;
}
