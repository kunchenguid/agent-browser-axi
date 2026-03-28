import { describe, it, expect } from "vitest";
import { getSuggestions } from "../src/suggestions.js";

describe("getSuggestions", () => {
  it("suggests snapshot for wait command", () => {
    const suggestions = getSuggestions({ command: "wait" });
    expect(suggestions).toHaveLength(1);
    expect(suggestions[0]).toContain("snapshot");
  });

  it("suggests snapshot for eval command", () => {
    const suggestions = getSuggestions({ command: "eval" });
    expect(suggestions).toHaveLength(1);
    expect(suggestions[0]).toContain("snapshot");
  });

  it("suggests filling inputs after open", () => {
    const snapshot = `- document "Login"
  - textbox "Username" ref=1
  - button "Sign In" ref=2`;
    const suggestions = getSuggestions({ command: "open", snapshot });
    expect(suggestions.some((s) => s.includes("fill"))).toBe(true);
  });

  it("suggests submit after fill", () => {
    const snapshot = `- document "Login"
  - textbox "Username" ref=1
  - button "Submit" ref=2`;
    const suggestions = getSuggestions({ command: "fill", snapshot });
    expect(suggestions.some((s) => s.includes("Submit"))).toBe(true);
  });

  it("returns at most 3 suggestions", () => {
    const snapshot = `- document "Page"
  - textbox "Search" ref=1
  - button "Go" ref=2
  - link "Home" ref=3
  - link "About" ref=4
  - link "Contact" ref=5
  - link "Help" ref=6`;
    const suggestions = getSuggestions({ command: "snapshot", snapshot });
    expect(suggestions.length).toBeLessThanOrEqual(3);
  });
});
