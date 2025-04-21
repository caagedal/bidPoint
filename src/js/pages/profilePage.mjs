import { getProfile } from "../api/profile/get.mjs";
import { getUser } from "../api/auth/session.mjs";
import { listingCard } from "../components/listingCard.mjs";
import { deleteListing } from "../api/listings/delete.mjs";
import { createListingModal } from "../components/createListingModal.mjs";
import { updateProfileModal } from "../components/updateProfileModal.mjs";
import { createHeader } from "../components/header.mjs";

/**
 * Renders a user profile page including listings, wins, and profile actions.
 * If no `name` param is found, it shows the current logged-in user's profile.
 *
 * @returns {Promise<void>} Resolves after profile data is fetched and rendered.
 */
export async function renderProfile() {
  const main = document.querySelector("#profilePage");
  if (!main) return;

  const params = new URLSearchParams(window.location.search);
  const profileName = params.get("name");

  const currentUser = getUser();
  const viewingOwnProfile = !profileName || profileName === currentUser?.name;
  const usernameToLoad = profileName || currentUser?.name;

  if (!usernameToLoad) {
    main.innerHTML = `<p class="text-red-500">No user specified.</p>`;
    return;
  }

  try {
    const response = await getProfile(usernameToLoad);
    const profile = response.data;
    const listings = profile.listings || [];
    const wins = profile.wins || [];

    // --- Banner Section ---
    const bannerWrapper = document.createElement("div");
    bannerWrapper.classList.add("relative", "mb-4");

    const banner = document.createElement("div");
    banner.classList.add("w-full", "h-40", "rounded-xl", "overflow-hidden");
    banner.style.backgroundImage = `url('${profile.banner?.url || "/public/banner.jpg"}')`;
    banner.style.backgroundSize = "cover";
    bannerWrapper.append(banner);

    // --- Edit Profile Button ---
    let editBtn;
    if (viewingOwnProfile) {
      editBtn = document.createElement("button");
      editBtn.textContent = "Edit Profile";
      editBtn.classList.add("font-semibold", "bg-rose-200", "px-3", "py-1", "rounded-xl", "shadow", "text-sm", "mb-6", "text-neutral-800");
      editBtn.addEventListener("click", () => {
        updateProfileModal(profile, () => renderProfile());
      });
    }

    // --- Profile Info Section ---
    const profileInfo = document.createElement("section");
    profileInfo.classList.add("flex", "items-center", "gap-4", "mb-6");

    const avatar = document.createElement("img");
    avatar.src = profile.avatar?.url || "/public/default-avatar.png";
    avatar.alt = profile.name;
    avatar.classList.add("w-20", "h-20", "rounded-full", "object-cover", "shadow");

    const info = document.createElement("div");

    const username = document.createElement("h1");
    username.textContent = profile.name;
    username.classList.add("text-2xl", "font-bold", "text-neutral-800");

    const email = document.createElement("p");
    email.textContent = profile.email;
    email.classList.add("text-gray-600", "text-sm");

    const bio = document.createElement("p");
    bio.textContent = profile.bio || "No bio added.";
    bio.classList.add("mt-2", "text-sm", "text-neutral-800");

    info.append(username, email, bio);
    profileInfo.append(avatar, info);

    // --- Create Listing Button ---
    let createBtn;
    if (viewingOwnProfile) {
      createBtn = document.createElement("button");
      createBtn.textContent = "Create New Listing";
      createBtn.classList.add("bg-violet-700", "text-white", "py-2", "px-4", "rounded-2xl", "my-8", "font-semibold");
      createBtn.addEventListener("click", () => {
        createListingModal(() => renderProfile());
      });
    }

    // --- Listings Section ---
    const listingsSection = document.createElement("section");
    listingsSection.classList.add("mb-10");

    const listingsTitle = document.createElement("h2");
    listingsTitle.textContent = viewingOwnProfile ? "Your Listings" : `${profile.name}'s Listings`;
    listingsTitle.classList.add("text-xl", "font-semibold", "mb-4", "mt-10", "text-neutral-800");

    const listingGrid = document.createElement("div");
    listingGrid.classList.add("grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-4", "gap-4");

    listingsSection.append(listingsTitle);

    if (listings.length === 0) {
      const emptyMsg = document.createElement("p");
      emptyMsg.textContent = viewingOwnProfile
        ? "You haven't created any listings yet."
        : `${profile.name} hasn't created any listings yet.`;
      emptyMsg.classList.add("text-gray-500", "italic", "m-4", "col-span-full", "text-center");
      listingGrid.append(emptyMsg);
    } else {
      listings.forEach((listing) => {
        const card = listingCard(listing);
        const wrapper = document.createElement("div");

        if (viewingOwnProfile) {
          const deleteWrapper = document.createElement("div");
          deleteWrapper.classList.add("flex", "justify-end");

          const deleteBtn = document.createElement("button");
          deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i> Delete';
          deleteBtn.classList.add("text-red-500", "text-sm", "mt-2", "mb-4", "hover:underline", "font-semibold");
          deleteBtn.addEventListener("click", async () => {
            if (confirm(`Are you sure you want to delete \"${listing.title}\"?`)) {
              await deleteListing(listing.id);
              renderProfile();
            }
          });

          deleteWrapper.append(deleteBtn);
          wrapper.append(card, deleteWrapper);
        } else {
          wrapper.append(card);
        }

        listingGrid.append(wrapper);
      });
    }

    listingsSection.append(listingGrid);

    // --- Wins Section (Only for self) ---
    let winsSection;
    if (viewingOwnProfile && wins.length) {
      winsSection = document.createElement("section");

      const winsTitle = document.createElement("h2");
      winsTitle.textContent = "Auctions You've Won";
      winsTitle.classList.add("text-xl", "font-semibold", "mb-4");

      const winsGrid = document.createElement("div");
      winsGrid.classList.add("grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-4", "gap-4");

      wins.forEach((win) => {
        winsGrid.appendChild(listingCard(win));
      });

      winsSection.append(winsTitle, winsGrid);
    }

    // --- Append Everything to DOM ---
    main.innerHTML = "";
    main.append(
      bannerWrapper,
      ...(editBtn ? [editBtn] : []),
      profileInfo,
      ...(createBtn ? [createBtn] : []),
      listingsSection,
      ...(winsSection ? [winsSection] : [])
    );
  } catch (error) {
    main.innerHTML = `<p class="text-red-500">Failed to load profile: ${error.message}</p>`;
  }
}

// Initialize
renderProfile();
createHeader();
