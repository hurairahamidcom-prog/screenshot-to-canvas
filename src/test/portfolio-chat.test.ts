import { describe, expect, it } from "vitest";

import { answerPortfolioQuestion } from "@/lib/portfolio-chat";

describe("portfolio-chat", () => {
  it("answers email, phone, and GitHub questions from portfolio data", () => {
    expect(answerPortfolioQuestion("What is your email?").text).toContain("hurairahamid.com@gmail.com");
    expect(answerPortfolioQuestion("What is your phone number?").text).toContain("+92 311 1689934");

    const githubReply = answerPortfolioQuestion("Share your GitHub");
    expect(githubReply.text).toContain("https://github.com/hurairahamidcom-prog");
    expect(githubReply.text).toContain("https://github.com/hurairahamidcom-prog/screenshot-to-canvas");
  });

  it("answers skills and services without removed Data Analysis entries", () => {
    const skillsReply = answerPortfolioQuestion("What are your skills?");
    expect(skillsReply.text).toContain("React.js");
    expect(skillsReply.text).not.toContain("Data Analysis");

    const servicesReply = answerPortfolioQuestion("What services do you offer?");
    expect(servicesReply.text).toContain("Web Development");
    expect(servicesReply.text).not.toContain("Data Analysis:");
  });

  it("returns project details for specific project queries", () => {
    const reply = answerPortfolioQuestion("Tell me about the Weather App");
    expect(reply.text).toContain("Weather Application");
    expect(reply.text).toContain("API Integration");
  });

  it("welcomes clients and guides project inquiries to contact", () => {
    const greetReply = answerPortfolioQuestion("Hello");
    expect(greetReply.text).toContain("Welcome!");
    expect(greetReply.action?.href).toBe("#contact");

    const clientReply = answerPortfolioQuestion("I am a client looking for a quote");
    expect(clientReply.text).toContain("hurairahamid.com@gmail.com");
    expect(clientReply.action?.href).toBe("#contact");
  });

  it("gives a grounded fallback for out-of-scope questions", () => {
    const reply = answerPortfolioQuestion("What is the capital of France?");
    expect(reply.text).toContain("portfolio");
    expect(reply.text).toContain("hurairahamid.com@gmail.com");
  });
});
