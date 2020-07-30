import { Select } from "atoms";
import React from "react";
import { render } from "@testing-library/react";
import data from "./data";

describe("Select", () => {
  it("should render the correct amount of values", () => {
    const { defaultValue } = data;
    const { getByText } = render(<Select defaultValue={defaultValue} />);
    defaultValue.forEach(option =>
      expect(getByText(option.value)).toBeInTheDocument()
    );
  });
});
