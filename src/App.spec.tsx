import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "./App";

describe("App", () => {
  it("true to be true", () => {
    render(<App />);
    expect(true).toBe(true);
  });
});
