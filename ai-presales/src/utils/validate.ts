/**
 * Lead input validation utility.
 * Validates email, phone, and required fields.
 */

export interface LeadInput {
  name: string;
  email: string;
  phone: string;
  source?: string;
  niche?: string;
  message?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validate email format using a safe regex pattern.
 */
export function isValidEmail(email: string): boolean {
  // SECURITY_NOTE: Simple regex — avoids ReDoS. For production, use a library.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (international format, 8-15 digits).
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[1-9]\d{7,14}$/;
  return phoneRegex.test(phone.replace(/[\s\-()]/g, ""));
}

/**
 * Validate a lead input object. Returns errors if invalid.
 */
export function validateLead(data: Partial<LeadInput>): ValidationResult {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== "string" || data.name.trim().length < 2) {
    errors.push("Name is required (min 2 characters)");
  }

  if (!data.name || data.name.length > 100) {
    errors.push("Name too long (max 100 characters)");
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push("Valid email is required");
  }

  if (!data.phone || !isValidPhone(data.phone)) {
    errors.push("Valid phone number is required (8-15 digits)");
  }

  if (data.message && data.message.length > 1000) {
    errors.push("Message too long (max 1000 characters)");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
