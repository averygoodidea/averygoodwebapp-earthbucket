import { AVeryGoodAuthenticator } from "assets-js";
import { useStaticQuery } from "gatsby";
import { AuthorHeader } from "organisms";
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import data from "./data";

describe("AuthorHeader", () => {
  beforeAll(() => {
    useStaticQuery.mockImplementation(() => ({
      allAlbumPosts: {
        edges: [
          {
            node: {
              alternative_id: "abc123"
            }
          }
        ]
      }
    }));
  });
  afterAll(() => {
    useStaticQuery.mockRestore();
  });
  it("should exist", () => {
    const { siteDescription, siteTitle } = data;
    const { getByTestId } = render(
      <AuthorHeader
        authenticationState="signedOut"
        siteDescription={siteDescription}
        siteTitle={siteTitle}
      />
    );
    const authorHeader = getByTestId("author-header");
    const header = getByTestId("header");
    expect(authorHeader).toBeInTheDocument();
    expect(authorHeader).toContainElement(header);
  });
  it("should display site title", () => {
    const { siteDescription, siteTitle } = data;
    const { getByText } = render(
      <AuthorHeader
        authenticationState="signedOut"
        siteDescription={siteDescription}
        siteTitle={siteTitle}
      />
    );
    const result = getByText(siteTitle);
    expect(result).toBeInTheDocument();
  });
  it("should display site description", () => {
    const { siteDescription, siteTitle } = data;
    const { getByText } = render(
      <AuthorHeader
        authenticationState="signedOut"
        siteDescription={siteDescription}
        siteTitle={siteTitle}
      />
    );
    const result = getByText(siteDescription);
    expect(result).toBeInTheDocument();
  });
  it("should display section title", () => {
    const { siteDescription, sectionTitle } = data;
    const { getByText } = render(
      <AuthorHeader
        authenticationState="signedOut"
        sectionTitle={sectionTitle}
        siteDescription={siteDescription}
      />
    );
    const result = getByText(siteDescription);
    expect(result).toBeInTheDocument();
  });
  describe("SignOut Button", () => {
    it("should not contain sign out button", () => {
      const { siteDescription, siteTitle } = data;
      const { queryByTestId } = render(
        <AuthorHeader
          authenticationState="signedOut"
          siteDescription={siteDescription}
          siteTitle={siteTitle}
        />
      );
      const result = queryByTestId("author-header-signout-button");
      expect(result).not.toBeInTheDocument();
    });
    it("should contain sign out button", () => {
      const { siteDescription, siteTitle } = data;
      const { getByTestId } = render(
        <AuthorHeader
          authenticationState="signedIn"
          siteDescription={siteDescription}
          siteTitle={siteTitle}
        />
      );
      const result = getByTestId("author-header-signout-button");
      expect(result).toBeInTheDocument();
    });
    it("should sign author out", () => {
      global.confirm = jest.fn(() => true);
      jest
        .spyOn(AVeryGoodAuthenticator, "signOut")
        .mockImplementationOnce(() => {});
      const { siteDescription, siteTitle } = data;
      const { getByTestId } = render(
        <AuthorHeader
          authenticationState="signedIn"
          siteDescription={siteDescription}
          siteTitle={siteTitle}
        />
      );
      const button = document.querySelector(
        '[data-testid="author-header-signout-button"] button'
      );
      fireEvent.click(button);
      expect(global.confirm).toHaveBeenCalledTimes(1);
      expect(AVeryGoodAuthenticator.signOut).toHaveBeenCalledTimes(1);
    });
  });
});
