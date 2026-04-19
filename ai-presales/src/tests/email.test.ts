import { generateEmail } from "../services/gemini.service";

describe("Email Generation (Gemini)", () => {
  it("generates non-empty email content", async () => {
    const result = await generateEmail({
      name: "Test User",
      niche: "interior design",
      message: "Looking for service",
    });
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(10);
  });

  it("includes the lead name in generated email", async () => {
    const result = await generateEmail({
      name: "Rahul",
    });
    expect(result).toContain("Rahul");
  });
});
