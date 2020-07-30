import { AVeryGoodAuthenticator } from "assets-js";
import { navigate, useStaticQuery } from "gatsby";
import { AuthorSignInForm } from "organisms";
import React from "react";
import toastedNotes from "toasted-notes";
import { fireEvent, render } from "@testing-library/react";

describe("AuthorSignInForm", () => {
  it("should exist", () => {
    const { getByTestId } = render(<AuthorSignInForm />);
    const result = getByTestId("author-signin-form");
    expect(result).toBeInTheDocument();
  });
  it("should contain form tag", () => {
    const { getByTestId } = render(<AuthorSignInForm />);
    const authorSignInForm = getByTestId("author-signin-form");
    const form = document.querySelector(
      '[data-testid="author-signin-form"] form'
    );
    const submitButton = getByTestId("submit-button");
    expect(authorSignInForm).toContainElement(form);
  });
  it("should contain proper form values", () => {
    const { getByTestId } = render(<AuthorSignInForm />);
    const form = document.querySelector(
      '[data-testid="author-signin-form"] form'
    );
    expect(form).toHaveFormValues({
      email: ""
    });
  });
  it("should display help message", () => {
    const { getByTestId } = render(<AuthorSignInForm />);
    const form = document.querySelector(
      '[data-testid="author-signin-form"] form'
    );
    const emailInput = document.querySelector('input[name="email"]');
    fireEvent.change(emailInput, { target: { value: "broken @email.com" } });
    const helpMessage = getByTestId("author-signin-form-help-message");
    expect(helpMessage).toBeInTheDocument();
  });
  it("should have submit button", () => {
    const { getByTestId } = render(<AuthorSignInForm />);
    const authorSignInForm = getByTestId("author-signin-form");
    const submitButton = getByTestId("submit-button");
    expect(authorSignInForm).toContainElement(submitButton);
  });
  describe("Authentication", () => {
    it("should call onSignIn function", () => {
      const mockedOnSignIn = jest
        .spyOn(AuthorSignInForm.prototype, "onSignIn")
        .mockImplementationOnce(() => {});
      const { getByTestId } = render(<AuthorSignInForm />);
      const authorSignInForm = getByTestId("author-signin-form");
      const emailInput = document.querySelector('input[name="email"]');
      fireEvent.change(emailInput, { target: { value: "test@email.test" } });
      const submitButton = getByTestId("submit-button");
      fireEvent.click(submitButton);
      expect(mockedOnSignIn).toHaveBeenCalledTimes(1);
    });
    it("should send magic link", () => {
      global.requestAnimationFrame = jest.fn();
      jest.spyOn(toastedNotes, "notify").mockImplementationOnce(() => {});
      jest
        .spyOn(AVeryGoodAuthenticator, "sendMagicLink")
        .mockImplementationOnce(() => Promise.resolve({}));
      const { getByTestId } = render(<AuthorSignInForm />);
      const authorSignInForm = getByTestId("author-signin-form");
      const emailInput = document.querySelector('input[name="email"]');
      fireEvent.change(emailInput, { target: { value: "test@email.test" } });
      const submitButton = getByTestId("submit-button");
      fireEvent.click(submitButton);
      expect(AVeryGoodAuthenticator.sendMagicLink).toBeCalledWith(
        "test@email.test"
      );
    });
  });
});
