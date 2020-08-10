import { AVeryGoodAuthenticator } from "assets-js";
import { navigate, useStaticQuery } from "gatsby";
import { AuthorLayout } from "organisms";
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import data from "./data";

describe("AuthorLayout", () => {
  beforeAll(() => {
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          title: "A Very Good Web App",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        }
      },
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
    const html = (
      <div>
        <p>Content Area</p>
      </div>
    );
    const { getByTestId } = render(<AuthorLayout>{html}</AuthorLayout>);
    const result = getByTestId("author-layout");
    expect(result).toBeInTheDocument();
  });
  it("should display children", () => {
    const html = (
      <div>
        <p>Content Area</p>
      </div>
    );
    const { getByText } = render(<AuthorLayout>{html}</AuthorLayout>);
    const result = getByText("Content Area");
    expect(result).toBeInTheDocument();
  });
  it("should have footer", () => {
    const html = (
      <div>
        <p>Content Area</p>
      </div>
    );
    const { getByTestId } = render(<AuthorLayout>{html}</AuthorLayout>);
    const result = getByTestId("footer");
    expect(result).toBeInTheDocument();
  });
  describe("Section Title", () => {
    it("should display section title", () => {
      const { sectionTitle } = data;
      const html = (
        <div>
          <p>Content Area</p>
        </div>
      );
      const { getByText } = render(
        <AuthorLayout sectionTitle={sectionTitle}>{html}</AuthorLayout>
      );
      const result = getByText(sectionTitle);
      expect(result).toBeInTheDocument();
    });
  });
  describe("Author Header", () => {
    it("should have author header", () => {
      const html = (
        <div>
          <p>Content Area</p>
        </div>
      );
      const { getByTestId } = render(<AuthorLayout>{html}</AuthorLayout>);
      const authorLayout = getByTestId("author-layout");
      const authorHeader = getByTestId("author-header");
      expect(authorLayout).toContainElement(authorHeader);
    });
  });
  describe("Author Navbar", () => {
    it("should not have author navbar", () => {
      const html = (
        <div>
          <p>Content Area</p>
        </div>
      );
      const { queryByTestId } = render(<AuthorLayout>{html}</AuthorLayout>);
      const result = queryByTestId("author-navbar");
      expect(result).not.toBeInTheDocument();
    });
    it("should have author navbar", () => {
      const { location } = data;
      const html = (
        <div>
          <p>Content Area</p>
        </div>
      );
      const { getByTestId } = render(
        <AuthorLayout isAuthenticated={true} location={location}>
          {html}
        </AuthorLayout>
      );
      const authorLayout = getByTestId("author-layout");
      const authorNavbar = getByTestId("author-navbar");
      expect(authorLayout).toContainElement(authorNavbar);
    });
    it("should navigate to site-settings page", () => {
      navigate.mockImplementationOnce(() => {});
      const { location } = data;
      const html = (
        <div>
          <p>Content Area</p>
        </div>
      );
      const { getByTestId } = render(
        <AuthorLayout isAuthenticated={true} location={location}>
          {html}
        </AuthorLayout>
      );
      const buttons = document.querySelectorAll(
        '[data-testid="author-navbar"] button'
      );
      let navigateToHere;
      buttons.forEach(button => {
        if (!navigateToHere && button.textContent === "Site Settings") {
          navigateToHere = button;
        }
      });
      fireEvent.click(navigateToHere);
      expect(navigate).toBeCalledWith("/author/site-settings/");
      navigate.mockRestore();
    });
  });
});
