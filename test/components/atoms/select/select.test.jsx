import { Select } from "atoms";
import React from "react";
import { render } from "@testing-library/react";
import data from "./data";

describe("Select", () => {
  it("should render the correct amount of values", () => {
    const { defaultValue } = data;
    const { getByText } = render(<Select defaultValue={defaultValue} />);
    for (let i = 0; i < defaultValue.length; i++) {
      expect(getByText(defaultValue[i].value)).toBeInTheDocument();
    }
  });
});
