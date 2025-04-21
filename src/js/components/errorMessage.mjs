/**
 * Renders an error message inside the specified container.
 *
 * @param {string} containerSelector - A CSS selector to target the container element.
 * @param {string} error - The error message text to display.
 */
export function errorMessage(containerSelector, error) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = "";

  const errorContainer = document.createElement("div");
  errorContainer.classList.add("bg-red-100", "text-red-800", "p-4", "rounded");

  const message = document.createElement("p");
  message.classList.add("font-bold");
  message.textContent = error;

  errorContainer.appendChild(message);
  container.appendChild(errorContainer);
}
