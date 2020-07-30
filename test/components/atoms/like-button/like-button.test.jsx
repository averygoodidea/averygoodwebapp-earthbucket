import { LikeButton } from "atoms";
import React from "react";
import { fireEvent, render } from "@testing-library/react";

describe("LikeButton", () => {
  it("should invoke callback function", () => {
    const mockedCallback = jest.fn();
    const { getByTestId } = render(<LikeButton onClick={mockedCallback} />);
    const button = getByTestId("like-button");
    fireEvent.click(button);
    expect(mockedCallback).toHaveBeenCalledTimes(1);
  });
  it("should display icon", () => {
    const { getByTestId } = render(<LikeButton />);
    const button = getByTestId("like-button");
    const icon = getByTestId("icon");
    expect(button).toContainElement(icon);
    expect(icon).toHaveClass(`font-icon-like`);
  });
});
