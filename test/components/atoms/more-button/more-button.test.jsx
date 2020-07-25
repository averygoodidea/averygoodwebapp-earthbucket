import { MoreButton } from "atoms";
import React from "react";
import { fireEvent, render } from "@testing-library/react";

describe("MoreButton", () => {
  it("should invoke callback function", () => {
    const mockedCallback = jest.fn();
    const { getByTestId } = render(<MoreButton onClick={mockedCallback} />);
    const button = getByTestId("more-button");
    fireEvent.click(button);
    expect(mockedCallback).toHaveBeenCalledTimes(1);
  });
  it("should display icon", () => {
    const { getByTestId } = render(<MoreButton />);
    const button = getByTestId("more-button");
    const icon = getByTestId("icon");
    expect(button).toContainElement(icon);
    expect(icon).toHaveClass(`font-icon-ellipsis`);
  });
});
