import { API_LOGIN } from "../constants.mjs";
import { save } from "../../storage/index.mjs";

export async function loginUser(email, password) {
    const response = await fetch (API_LOGIN, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password}),
    });

    const data = await response.json();

    if (!response.ok) {
        const message = data.errors
          ? data.errors.map((e) => e.message || e).join(", ")
          : data.message || "Unknown error";
        throw new Error(message);
    }

    const { accessToken, ...user } = data.data;

    save("token", accessToken);
    save("profile", user);

    return user;
}