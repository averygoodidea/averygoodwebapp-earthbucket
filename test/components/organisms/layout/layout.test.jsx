import { useStaticQuery } from "gatsby";
import { Layout } from "organisms";
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import data from "./data";

describe("Layout", () => {
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
    const { getByTestId } = render(<Layout>{html}</Layout>);
    const result = getByTestId("layout");
    expect(result).toBeInTheDocument();
  });
  it("should display children", () => {
    const html = (
      <div>
        <p>Content Area</p>
      </div>
    );
    const { getByText } = render(<Layout>{html}</Layout>);
    const result = getByText("Content Area");
    expect(result).toBeInTheDocument();
  });
  it("should have footer", () => {
    const html = (
      <div>
        <p>Content Area</p>
      </div>
    );
    const { getByText } = render(<Layout>{html}</Layout>);
    const result = document.querySelector("footer");
    expect(result).toBeInTheDocument();
  });
  describe("Section Title", () => {
    it("should display section title", () => {
      const { location, sectionTitle } = data;
      const html = (
        <div>
          <p>Content Area</p>
        </div>
      );
      const { getByTestId } = render(
        <Layout location={location} sectionTitle={sectionTitle}>
          {html}
        </Layout>
      );
      const result = getByTestId("header-section-title");
      expect(result).toBeInTheDocument();
      expect(result).toHaveTextContent(sectionTitle);
    });
  });
  describe("Header", () => {
    it("should have header", () => {
      const html = (
        <div>
          <p>Content Area</p>
        </div>
      );
      const { getByTestId } = render(<Layout>{html}</Layout>);
      const layout = getByTestId("layout");
      const header = getByTestId("header");
      expect(layout).toContainElement(header);
    });
  });
  describe("Footer", () => {
    it("should have footer", () => {
      const html = (
        <div>
          <p>Content Area</p>
        </div>
      );
      const { getByTestId } = render(<Layout>{html}</Layout>);
      const layout = getByTestId("layout");
      const footer = getByTestId("footer");
      expect(layout).toContainElement(footer);
    });
  });
  describe("Modal", () => {
    it("should appear in modal", () => {
      const { location, sectionTitle } = data;
      const html = (
        <div>
          <p>Content Area</p>
        </div>
      );
      const { getByTestId, queryByTestId } = render(
        <Layout location={location} isModal={true} sectionTitle={sectionTitle}>
          {html}
        </Layout>
      );
      const layout = getByTestId("layout");
      const header = queryByTestId("header");
      const modal = getByTestId("modal");
      expect(layout).not.toContainElement(header);
      expect(layout).toContainElement(modal);
    });
  });
});
