import { Textarea } from "atoms";
import React from "react";
import { render } from "@testing-library/react";
import data from "./data";

describe("Textarea", () => {
  it("should exist", () => {
    const { getByTestId } = render(<Textarea />);
    const result = getByTestId("textarea");
    expect(result).toBeInTheDocument();
  });
  it("should render default value", () => {
    const { defaultValue } = data;
    const { getByTestId } = render(<Textarea defaultValue={defaultValue} />);
    const result = getByTestId("textarea");
    expect(result.defaultValue).toEqual(defaultValue);
  });
});
