import { load } from "../../storage/index.mjs";

export function isLoggedIn() {
    return !!load("token");
  }
  
  export function getUser() {
    return load("profile");
  }
  
  export function getCredits() {
    const user = getUser();
    return user?.credits || 0;
  }