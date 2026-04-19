import { scoreLead } from "../services/gemini.service";

describe("Gemini Scoring", () => {
  it("returns a score between 1 and 10", async () => {
    const result = await scoreLead({
      name: "Test Lead",
      source: "linkedin",
      niche: "dental",
      message: "Need help with marketing",
    });
    expect(result.score).toBeGreaterThanOrEqual(1);
    expect(result.score).toBeLessThanOrEqual(10);
  });

  it("returns a reasoning string", async () => {
    const result = await scoreLead({ name: "Lead" });
    expect(typeof result.reasoning).toBe("string");
    expect(result.reasoning.length).toBeGreaterThan(0);
  });
});
