import { ShareButton } from "atoms";
import React from "react";
import { fireEvent, render } from "@testing-library/react";

describe("ShareButton", () => {
  it("should invoke callback function", () => {
    const mockedCallback = jest.fn();
    const { getByTestId } = render(<ShareButton onClick={mockedCallback} />);
    const button = getByTestId("share-button");
    fireEvent.click(button);
    expect(mockedCallback).toHaveBeenCalledTimes(1);
  });
  it("should display icon", () => {
    const { getByTestId } = render(<ShareButton />);
    const button = getByTestId("share-button");
    const icon = getByTestId("icon");
    expect(button).toContainElement(icon);
    expect(icon).toHaveClass(`font-icon-share`);
  });
});
