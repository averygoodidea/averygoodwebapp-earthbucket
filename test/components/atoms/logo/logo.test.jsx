import { Logo } from "atoms";
import React from "react";
import { render } from "@testing-library/react";

describe("Logo", () => {
  it("should contain a link", () => {
    const { getByTestId } = render(<Logo />);
    const result = getByTestId("logo");
    expect(result).toBeInstanceOf(HTMLAnchorElement);
  });
  it("should link to home page", () => {
    const { getByTestId } = render(<Logo />);
    const result = getByTestId("logo");
    expect(result.href).toEqual("http://localhost/");
  });
});
