import { DislikeButton } from "atoms";
import React from "react";
import { fireEvent, render } from "@testing-library/react";

describe("DislikeButton", () => {
  it("should invoke callback function", () => {
    const mockedCallback = jest.fn();
    const { getByTestId } = render(<DislikeButton onClick={mockedCallback} />);
    const button = getByTestId("dislike-button");
    fireEvent.click(button);
    expect(mockedCallback).toHaveBeenCalledTimes(1);
  });
  it("should display icon", () => {
    const { getByTestId } = render(<DislikeButton />);
    const button = getByTestId("dislike-button");
    const icon = getByTestId("icon");
    expect(button).toContainElement(icon);
    expect(icon).toHaveClass(`font-icon-dislike`);
  });
});
