import { EmailForm } from "molecules";
import React from "react";
import { fireEvent, render } from "@testing-library/react";

describe("EmailForm", () => {
  it("should contain form tag", () => {
    const { getByTestId } = render(<EmailForm />);
    const result = getByTestId("email-form");
    expect(result).toBeInstanceOf(HTMLFormElement);
  });
  it("should point action to appropriate url", () => {
    const { getByTestId } = render(<EmailForm />);
    const result = getByTestId("email-form");
    expect(result).toHaveAttribute(
      "action",
      `https://tinyletter.com/${process.env.GATSBY_TINYLETTER_USERNAME}`
    );
    expect(result).toHaveAttribute("_lpchecked", "1");
    expect(result).toHaveAttribute("method", "post");
    expect(result).toHaveAttribute("target", "popupwindow");
  });
  it("should have the proper form controls", () => {
    const { getByTestId } = render(<EmailForm />);
    const result = getByTestId("email-form");
    expect(result).toHaveFormValues({
      email: "",
      embed: "1"
    });
    expect(document.querySelector("#email")).toHaveAttribute("type", "hidden");
    expect(result).toContainElement(getByTestId("submit-button"));
  });
});
