import { load } from "../storage/index.mjs";

export function getUser(){
    return load("profile");
}