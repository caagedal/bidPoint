import { loginUser } from "./login.mjs";
import { save } from "../../storage/index.mjs";

// Mock fetch og save
global.fetch = jest.fn();
jest.mock("../../storage/index.mjs", () => ({
  save: jest.fn(),
}));

describe("loginUser", () => {
  it("logs in successfully and saves token + profile", async () => {
    const fakeResponse = {
      data: {
        accessToken: "abc123",
        name: "Test User",
        email: "test@stud.noroff.no"
      }
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => fakeResponse,
    });

    const user = await loginUser("test@stud.noroff.no", "password123");

    expect(user.name).toBe("Test User");
    expect(save).toHaveBeenCalledWith("token", "abc123");
    expect(save).toHaveBeenCalledWith("profile", {
      name: "Test User",
      email: "test@stud.noroff.no"
    });
  });

  it("throws an error if login fails", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        errors: [{ message: "Invalid credentials" }]
      }),
    });

    await expect(loginUser("wrong@user.com", "failpass"))
      .rejects
      .toThrow("Invalid credentials");
  });
});
