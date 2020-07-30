import { CloseButton } from "atoms";
import React from "react";
import { fireEvent, render } from "@testing-library/react";

describe("CloseButton", () => {
  it("should invoke callback function", () => {
    const mockedCallback = jest.fn();
    const { getByTestId } = render(<CloseButton onClick={mockedCallback} />);
    const button = getByTestId("close-button");
    fireEvent.click(button);
    expect(mockedCallback).toHaveBeenCalledTimes(1);
  });
  it("should display icon", () => {
    const { getByTestId } = render(<CloseButton />);
    const button = getByTestId("close-button");
    const icon = getByTestId("icon");
    expect(button).toContainElement(icon);
    expect(icon).toHaveClass(`font-icon-close`);
  });
});
