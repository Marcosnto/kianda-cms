import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AlertStatus from ".";

describe("Alert Status", () => {
  it("Should render When pass a type and a description", () => {
    render(<AlertStatus type="info" description="This is an alert" />);

    const alert = screen.getByRole("alert", { name: "" });

    expect(alert).toBeInTheDocument();
    expect(alert.firstChild).toHaveTextContent("This is an alert");
  });
});
