import { load } from "../storage/index.mjs";
import { API_KEY } from "./constants.mjs";

export function headers() {
    const token = load("token");
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "x-Noroff-API-Key": API_KEY,
    };
}

export async function authFetch(url, options = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...headers(),
                ...options.headers,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            const message = data.errors
                ? JSON.stringify(data.errors, null, 2)
                : data.message || "unknown error";

            throw new Error(message);
        }

        return data;
    } catch (error) {
        console.error("authFetch error", error);
        throw error;
    }
}