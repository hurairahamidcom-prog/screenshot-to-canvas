import { describe, expect, it } from "vitest";

import { contactSchema } from "@/lib/contact-schema";

const valid = {
  fullName: "Ali Khan",
  email: "ali@example.com",
  subject: "Website project",
  message: "Hi Huraira, I'd like to discuss a new website.",
};

describe("contact form validation", () => {
  it("accepts a complete message", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects an invalid email address", () => {
    expect(contactSchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
  });

  it("rejects empty required fields", () => {
    expect(contactSchema.safeParse({ ...valid, fullName: "  ", subject: "" }).success).toBe(false);
  });
});
