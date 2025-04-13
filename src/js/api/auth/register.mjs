import { API_REG } from "../constants.mjs";

export async function registerUser({name, email, password}){
     const response = await fetch(API_REG, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, email, password}),
     });

     const data = await response.json();

     if (!response.ok) {
        const message = data.errors
          ? data.errors.map((e) => e.message || e).join(", ")
          : data.message || "Unknown error";
        throw new Error(message);
    }

    return data;
}