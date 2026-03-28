import { describe, it, expect } from "vitest";
import { countRefs, extractRefs, extractTitle, isInputType } from "../src/snapshot.js";

describe("countRefs", () => {
  it("counts ref= occurrences", () => {
    const snapshot = `RootWebArea "Example"
  ref=1 button "Submit"
  ref=2 textbox "Name"
  ref=3 link "Home"`;
    expect(countRefs(snapshot)).toBe(3);
  });

  it("returns 0 for no refs", () => {
    expect(countRefs('RootWebArea "Empty"')).toBe(0);
  });
});

describe("extractRefs", () => {
  it("extracts ref info from snapshot lines", () => {
    const snapshot = `  - button "Submit" ref=1
  - textbox "Name" ref=2`;
    const refs = extractRefs(snapshot);
    expect(refs).toEqual([
      { ref: "1", type: "button", label: "Submit" },
      { ref: "2", type: "textbox", label: "Name" },
    ]);
  });
});

describe("extractTitle", () => {
  it("extracts title from document element", () => {
    expect(extractTitle('- document "My Page"')).toBe("My Page");
  });

  it("falls back to heading", () => {
    expect(extractTitle('  - heading "Welcome"')).toBe("Welcome");
  });

  it("returns empty for no title", () => {
    expect(extractTitle("div")).toBe("");
  });
});

describe("isInputType", () => {
  it("recognizes input types", () => {
    expect(isInputType("textbox")).toBe(true);
    expect(isInputType("searchbox")).toBe(true);
    expect(isInputType("textarea")).toBe(true);
  });

  it("rejects non-input types", () => {
    expect(isInputType("button")).toBe(false);
    expect(isInputType("link")).toBe(false);
  });
});
