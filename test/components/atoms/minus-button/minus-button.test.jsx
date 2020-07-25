import { MinusButton } from "atoms";
import React from "react";
import { fireEvent, render } from "@testing-library/react";

describe("MinusButton", () => {
  it("should invoke callback function", () => {
    const mockedCallback = jest.fn();
    const { getByTestId } = render(<MinusButton onClick={mockedCallback} />);
    const button = getByTestId("minus-button");
    fireEvent.click(button);
    expect(mockedCallback).toHaveBeenCalledTimes(1);
  });
  it("should display icon", () => {
    const { getByTestId } = render(<MinusButton />);
    const button = getByTestId("minus-button");
    const icon = getByTestId("icon");
    expect(button).toContainElement(icon);
    expect(icon).toHaveClass(`font-icon-minus`);
  });
});
