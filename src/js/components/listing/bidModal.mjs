import { getProfile } from "../../api/profile/get.mjs";
import { getUser } from "../../api/auth/session.mjs";

export async function createBidModal({ listing, minBid, onSubmit }) {
  
  const modal = document.createElement("div");
  modal.classList.add(
    "fixed", "inset-0", "bg-black/60", "flex", "items-center", "justify-center", "z-50", "bid-modal"
  );

  const dialog = document.createElement("div");
  dialog.classList.add(
    "bg-white", "rounded-xl", "p-6", "max-w-md", "w-full", "flex", "flex-col", "gap-4", "shadow-lg"
  );

  const avatar = document.createElement("img");
  avatar.src = listing.media?.[0]?.url || "/public/bidPoint.jpg";
  avatar.alt = listing.title;
  avatar.classList.add("w-12", "h-12", "rounded-full", "mx-auto");

  const title = document.createElement("h2");
  title.textContent = listing.title;
  title.classList.add("text-xl", "font-bold", "text-center");

  const bidLabel = document.createElement("p");
  bidLabel.textContent = `Current bid: $${minBid - 1}`;
  bidLabel.classList.add("text-center", "text-gray-700");

  const input = document.createElement("input");
  input.type = "number";
  input.min = minBid;
  input.placeholder = `Minimum: $${minBid}`;
  input.classList.add("border", "rounded", "p-2", "w-full");

  const creditsText = document.createElement("p");
  creditsText.textContent = "Loading credits...";
  creditsText.classList.add("text-sm", "text-gray-500", "text-center");

  // 🔄 Hent profil og vis kreditter
  try {
    const { name } = getUser();
    const profileResponse = await getProfile(name);
    const profile = profileResponse?.data || profileResponse; // fallback i tilfelle direkte respons
    const userCredits = profile?.credits ?? 0;

    creditsText.textContent = `Available credits: ${userCredits}`;

    if (userCredits < minBid) {
      const warning = document.createElement("p");
      warning.textContent = "You don't have enough credits to place this bid.";
      warning.classList.add("text-red-600", "text-center", "font-semibold");
      dialog.appendChild(warning);
      input.disabled = true;
    }
  } catch {
    creditsText.textContent = "Could not load your credits.";
  }

  const errorMessage = document.createElement("p");
  errorMessage.classList.add("text-red-600", "text-center", "hidden");

  const buttons = document.createElement("div");
  buttons.classList.add("flex", "justify-between", "gap-2", "mt-4");

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Place bid";
  submitBtn.classList.add("bg-blue-600", "text-white", "py-2", "px-4", "rounded");

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.classList.add("bg-gray-300", "py-2", "px-4", "rounded");
  cancelBtn.addEventListener("click", () => modal.remove());

  submitBtn.addEventListener("click", async () => {
    const amount = parseFloat(input.value);

    if (isNaN(amount) || amount < minBid) {
      errorMessage.textContent = `Please enter a valid bid of at least $${minBid}`;
      errorMessage.classList.remove("hidden");
      return;
    }

    try {
      await onSubmit(amount);
      modal.remove();
      location.reload();
    } catch (error) {
      errorMessage.textContent = error.message;
      errorMessage.classList.remove("hidden");
    }
  });

  buttons.append(cancelBtn, submitBtn);
  dialog.append(avatar, title, bidLabel, input, creditsText, errorMessage, buttons);
  modal.appendChild(dialog);

  
  document.body.appendChild(modal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  });

  return modal;
}
