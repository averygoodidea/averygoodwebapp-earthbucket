import { Toast } from "atoms";
import React from "react";
import { render } from "@testing-library/react";
import data from "./data";

describe("Toast", () => {
  it("should exist", () => {
    const { getByTestId } = render(<Toast />);
    const result = getByTestId("toast");
    expect(result).toBeInTheDocument();
  });
  it("should plain message", () => {
    const { message } = data;
    const { getByText } = render(<Toast message={message} />);
    const result = getByText(message);
    expect(result).toBeInTheDocument(message);
  });
  it("should html message", () => {
    const { htmlMessage } = data;
    const { getByTestId } = render(<Toast htmlMessage={htmlMessage} />);
    const result = getByTestId("toast");
    expect(result).toContainHTML(htmlMessage);
  });
  it("should display icon", () => {
    const { fontIcon } = data;
    const { getByTestId } = render(<Toast fontIcon={fontIcon} />);
    const toast = getByTestId("toast");
    const icon = getByTestId("icon");
    expect(toast).toContainElement(icon);
    expect(icon).toHaveClass(`font-icon-${fontIcon}`);
  });
  it("should contain a link", () => {
    const { to } = data;
    const { getByTestId } = render(<Toast to={to} />);
    const result = getByTestId("toast");
    expect(result).toBeInstanceOf(HTMLAnchorElement);
  });
  it("should link to submitted route", () => {
    const { to } = data;
    const { getByTestId } = render(<Toast to={to} />);
    const result = getByTestId("toast");
    expect(result.href).toEqual("http://localhost/");
  });
});
