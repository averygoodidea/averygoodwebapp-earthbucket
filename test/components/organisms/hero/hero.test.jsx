import { Hero } from "organisms";
import React from "react";
import { fireEvent, render } from "@testing-library/react";

describe("Hero", () => {
  it("should exist", () => {
    const { getByTestId } = render(<Hero />);
    const result = getByTestId("hero");
    expect(result).toBeInTheDocument();
  });
});
