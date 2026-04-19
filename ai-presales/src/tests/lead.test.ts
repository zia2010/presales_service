import { validateLead, isValidEmail, isValidPhone } from "../utils/validate";

describe("Lead Validation", () => {
  // --- Valid cases ---
  it("accepts a valid lead with all fields", () => {
    const result = validateLead({
      name: "John Doe",
      email: "john@example.com",
      phone: "+919876543210",
      source: "linkedin",
      niche: "interior design",
      message: "Interested in your service",
    });
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("accepts a valid lead with only required fields", () => {
    const result = validateLead({
      name: "Jane",
      email: "jane@test.com",
      phone: "+14155551234",
    });
    expect(result.valid).toBe(true);
  });

  // --- Invalid cases ---
  it("rejects missing email", () => {
    const result = validateLead({
      name: "John",
      phone: "+919876543210",
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Valid email is required");
  });

  it("rejects invalid email format", () => {
    const result = validateLead({
      name: "John",
      email: "not-an-email",
      phone: "+919876543210",
    });
    expect(result.valid).toBe(false);
  });

  it("rejects missing phone", () => {
    const result = validateLead({
      name: "John",
      email: "john@test.com",
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Valid phone number is required (8-15 digits)");
  });

  it("rejects invalid phone (too short)", () => {
    const result = validateLead({
      name: "John",
      email: "john@test.com",
      phone: "123",
    });
    expect(result.valid).toBe(false);
  });

  it("rejects missing name", () => {
    const result = validateLead({
      email: "john@test.com",
      phone: "+919876543210",
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Name is required (min 2 characters)");
  });

  it("rejects name that is too short", () => {
    const result = validateLead({
      name: "J",
      email: "john@test.com",
      phone: "+919876543210",
    });
    expect(result.valid).toBe(false);
  });

  it("rejects message that is too long", () => {
    const result = validateLead({
      name: "John",
      email: "john@test.com",
      phone: "+919876543210",
      message: "a".repeat(1001),
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Message too long (max 1000 characters)");
  });

  it("rejects completely empty object", () => {
    const result = validateLead({});
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});

describe("Email validation", () => {
  it("accepts valid emails", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
    expect(isValidEmail("test.user@domain.co.in")).toBe(true);
  });

  it("rejects invalid emails", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("noatsign")).toBe(false);
    expect(isValidEmail("@nodomain")).toBe(false);
    expect(isValidEmail("spaces in@email.com")).toBe(false);
  });
});

describe("Phone validation", () => {
  it("accepts valid phone numbers", () => {
    expect(isValidPhone("+919876543210")).toBe(true);
    expect(isValidPhone("+14155551234")).toBe(true);
    expect(isValidPhone("9876543210")).toBe(true);
  });

  it("rejects invalid phone numbers", () => {
    expect(isValidPhone("123")).toBe(false);
    expect(isValidPhone("")).toBe(false);
    expect(isValidPhone("abcdefghij")).toBe(false);
  });
});
