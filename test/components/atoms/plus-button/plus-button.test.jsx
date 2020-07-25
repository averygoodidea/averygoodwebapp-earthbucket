import { PlusButton } from "atoms";
import React from "react";
import { fireEvent, render } from "@testing-library/react";

describe("PlusButton", () => {
  it("should invoke callback function", () => {
    const mockedCallback = jest.fn();
    const { getByTestId } = render(<PlusButton onClick={mockedCallback} />);
    const button = getByTestId("plus-button");
    fireEvent.click(button);
    expect(mockedCallback).toHaveBeenCalledTimes(1);
  });
  it("should display icon", () => {
    const { getByTestId } = render(<PlusButton />);
    const button = getByTestId("plus-button");
    const icon = getByTestId("icon");
    expect(button).toContainElement(icon);
    expect(icon).toHaveClass(`font-icon-plus`);
  });
});
