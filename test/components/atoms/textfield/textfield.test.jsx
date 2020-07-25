import { Textfield } from "atoms";
import React from "react";
import { render } from "@testing-library/react";
import data from "./data";

describe("Textfield", () => {
  it("should exist", () => {
    const { getByTestId } = render(<Textfield />);
    const result = getByTestId("textfield");
    expect(result).toBeInTheDocument();
  });
  it("should render default value", () => {
    const { defaultValue } = data;
    const { getByTestId } = render(<Textfield defaultValue={defaultValue} />);
    const result = getByTestId("textfield");
    expect(result.defaultValue).toEqual(defaultValue);
  });
});
