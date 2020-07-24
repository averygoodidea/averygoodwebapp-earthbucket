import { SubmitButton } from "atoms";
import React from "react";
import { fireEvent, render } from "@testing-library/react";

describe("SubmitButton", () => {
  it("should invoke callback function", () => {
    const mockedCallback = jest.fn();
    const { getByTestId } = render(
      <SubmitButton onClick={mockedCallback} />
    );
    const button = getByTestId("submit-button");
    fireEvent.click(button);
    expect(mockedCallback).toHaveBeenCalledTimes(1);
  });
  it("should have type of submit", () => {
    const { getByTestId } = render(<SubmitButton />);
    const result = getByTestId("submit-button");
    expect(result).toHaveAttribute('type', 'submit');
  });
});
