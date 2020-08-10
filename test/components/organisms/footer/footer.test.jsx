import { Footer } from "organisms";
import React from "react";
import { render } from "@testing-library/react";

describe("Footer", () => {
  it("should exist", () => {
    const { getByTestId } = render(<Footer />);
    const result = getByTestId("footer");
    expect(result).toBeInTheDocument();
  });
});
