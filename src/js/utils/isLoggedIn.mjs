import { load } from "../storage/index.mjs";

export function isLoggedIn(){
    return !!load("token") && !!load("profile");
}