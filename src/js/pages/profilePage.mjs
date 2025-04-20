import { getProfile } from "../api/profile/get.mjs";
import { getUser } from "../api/auth/session.mjs";
import { listingCard } from "../components/listingCard.mjs";
import { deleteListing } from "../api/listings/delete.mjs";
import { createListingModal } from "../components/createListingModal.mjs";

export async function renderProfile() {
  const main = document.querySelector("#profilePage");
  const { name: loggedInName } = getUser();

  try {
    const response = await getProfile(loggedInName); // ✅ Bruk ny fetch-funksjon
    const profile = response.data;
    const listings = profile.listings || [];
    const wins = profile.wins || [];

    // 🔹 Banner
    const bannerWrapper = document.createElement("div");
    bannerWrapper.classList.add("relative", "mb-4");

    const banner = document.createElement("div");
    banner.classList.add("w-full", "h-40", "rounded-xl", "overflow-hidden");
    banner.style.backgroundImage = `url('${profile.banner?.url || "/public/banner.jpg"}')`;
    banner.style.backgroundSize = "cover";

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️ Edit Profile";
    editBtn.classList.add("absolute", "top-2", "right-2", "bg-white", "px-3", "py-1", "rounded", "shadow", "text-sm");
    editBtn.addEventListener("click", () => {
      alert("Redigering åpnes her!");
    });

    bannerWrapper.append(banner, editBtn);

    // 🔹 Profilinfo
    const profileInfo = document.createElement("section");
    profileInfo.classList.add("flex", "items-center", "gap-4", "mb-6");

    const avatar = document.createElement("img");
    avatar.src = profile.avatar?.url || "/public/default-avatar.png";
    avatar.alt = profile.name;
    avatar.classList.add("w-20", "h-20", "rounded-full", "object-cover", "shadow");

    const info = document.createElement("div");

    const username = document.createElement("h1");
    username.textContent = profile.name;
    username.classList.add("text-2xl", "font-bold");

    const email = document.createElement("p");
    email.textContent = profile.email;
    email.classList.add("text-gray-600", "text-sm");

    const bio = document.createElement("p");
    bio.textContent = profile.bio || "No bio added.";
    bio.classList.add("mt-2", "text-sm");

    info.append(username, email, bio);
    profileInfo.append(avatar, info);

    // 🔹 Create listing button
    const createBtn = document.createElement("button");
    createBtn.textContent = "➕ Create New Listing";
    createBtn.classList.add("bg-blue-600", "text-white", "py-2", "px-4", "rounded", "mb-6");

    createBtn.addEventListener("click", () => {
      createListingModal(); // 🟣 Viser modal
    });
    

    // 🔹 Dine listings
    const listingsSection = document.createElement("section");
    listingsSection.classList.add("mb-10");

    const listingsTitle = document.createElement("h2");
    listingsTitle.textContent = "Your Listings";
    listingsTitle.classList.add("text-xl", "font-semibold", "mb-4");

    const listingGrid = document.createElement("div");
    listingGrid.classList.add("grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-4", "gap-4");

    listings.forEach((listing) => {
      const card = listingCard(listing);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑️ Delete";
      deleteBtn.classList.add("text-red-500", "text-sm", "mt-2", "hover:underline");
      deleteBtn.addEventListener("click", async () => {
        if (confirm(`Are you sure you want to delete "${listing.title}"?`)) {
          await deleteListing(listing.id);
          renderProfile(); // 🔄 Refresh
        }
      });

      const wrapper = document.createElement("div");
      wrapper.append(card, deleteBtn);
      listingGrid.append(wrapper);
    });

    listingsSection.append(listingsTitle, listingGrid);

    // 🔹 Wins
    const winsSection = document.createElement("section");
    const winsTitle = document.createElement("h2");
    winsTitle.textContent = "Auctions You've Won";
    winsTitle.classList.add("text-xl", "font-semibold", "mb-4");

    const winsGrid = document.createElement("div");
    winsGrid.classList.add("grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-4", "gap-4");

    wins.forEach((win) => {
      winsGrid.appendChild(listingCard(win));
    });

    winsSection.append(winsTitle, winsGrid);

    // 👇 Sett alt inn
    main.innerHTML = "";
    main.append(bannerWrapper, profileInfo, createBtn, listingsSection, winsSection);
  } catch (error) {
    main.innerHTML = `<p class="text-red-500">Failed to load profile: ${error.message}</p>`;
  }
}

renderProfile();
