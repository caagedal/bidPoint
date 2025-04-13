import { registerUser } from "./register.mjs";

global.fetch = jest.fn();

describe("registerUser", () => {
  it("registers a new user successfully", async () => {
    const mockData = {
      data: {
        name: "newuser",
        email: "new@stud.noroff.no"
      }
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await registerUser({
      name: "newuser",
      email: "new@stud.noroff.no",
      password: "secure123"
    });

    expect(result.data.email).toBe("new@stud.noroff.no");
  });

  it("throws error on failed registration", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        errors: [{ message: "Email already exists" }]
      }),
    });

    await expect(
      registerUser({
        name: "test",
        email: "taken@stud.noroff.no",
        password: "password"
      })
    ).rejects.toThrow("Email already exists");
  });
});
