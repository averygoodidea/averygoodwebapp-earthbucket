import { Button } from "atoms";
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import data from "./data";

describe("Button", () => {
  it("should render text", () => {
    const { labelText } = data;
    const { getByText } = render(<Button label={labelText} />);
    expect(getByText(labelText)).toBeInTheDocument();
  });
  it("should invoke callback function", () => {
    const { labelText } = data;
    const mockedCallback = jest.fn();
    const { getByTestId } = render(
      <Button label={labelText} onClick={mockedCallback} />
    );
    const button = getByTestId("button");
    fireEvent.click(button);
    expect(mockedCallback).toHaveBeenCalledTimes(1);
  });
  it("should display icon", () => {
    const { fontIcon, labelText } = data;
    const { getByTestId } = render(
      <Button label={labelText} fontIcon={fontIcon} />
    );
    const button = getByTestId("button");
    const icon = getByTestId("icon");
    expect(button).toContainElement(icon);
    expect(icon).toHaveClass(`font-icon-${fontIcon}`);
  });
  it("should align icon to the right", () => {
    const { fontIcon, labelText } = data;
    const { getByTestId } = render(
      <Button align="right" label={labelText} fontIcon={fontIcon} />
    );
    const button = getByTestId("button");
    const icon = getByTestId("icon");
    expect(button).toContainElement(icon);
    expect(icon).toHaveClass(`font-icon-${fontIcon}`);
    expect(button.firstChild).not.toBe(icon);
  });
});
