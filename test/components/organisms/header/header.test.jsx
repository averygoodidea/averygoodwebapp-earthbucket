import { LocalStorageList } from "assets-js";
import { navigate, useStaticQuery } from "gatsby";
import { Header } from "organisms";
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import data from "./data";

describe("Header", () => {
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
      <Header siteDescription={siteDescription} siteTitle={siteTitle} />
    );
    const header = getByTestId("header");
    expect(header).toBeInTheDocument();
  });
  it("should display site title", () => {
    const { siteDescription, siteTitle } = data;
    const { getByText } = render(
      <Header siteDescription={siteDescription} siteTitle={siteTitle} />
    );
    const result = getByText(siteTitle);
    expect(result).toBeInTheDocument();
  });
  it("should display site description", () => {
    const { siteDescription, siteTitle } = data;
    const { getByText } = render(
      <Header siteDescription={siteDescription} siteTitle={siteTitle} />
    );
    const result = getByText(siteDescription);
    expect(result).toBeInTheDocument();
  });
  it("should display section title", () => {
    const { siteDescription, sectionTitle } = data;
    const { getByTestId } = render(
      <Header sectionTitle={sectionTitle} siteDescription={siteDescription} />
    );
    const result = getByTestId("header-section-title");
    expect(result).toBeInTheDocument();
    expect(result).toHaveTextContent(sectionTitle);
  });
  describe('"Your List" Button', () => {
    it("should not display button", () => {
      const { siteDescription, sectionTitle } = data;
      const { queryByTestId } = render(
        <Header sectionTitle={sectionTitle} siteDescription={siteDescription} />
      );
      expect(queryByTestId("your-list-button")).not.toBeInTheDocument();
    });
    it("should display button", () => {
      const { location, siteDescription, sectionTitle } = data;
      const { getByTestId, queryByTestId } = render(
        <Header
          location={location}
          sectionTitle={sectionTitle}
          siteDescription={siteDescription}
        />
      );
      const yourListButton = document.querySelector(
        '[data-testid="header-your-list-button"]'
      );
      expect(yourListButton).toBeInTheDocument();
      expect(queryByTestId("header-section-title")).not.toBeInTheDocument();
    });
    it("should not display list length", () => {
      const { location, siteDescription, sectionTitle } = data;
      const { queryByTestId } = render(
        <Header
          location={location}
          sectionTitle={sectionTitle}
          siteDescription={siteDescription}
        />
      );
      const yourListLength = queryByTestId("header-your-list-length");
      expect(yourListLength).not.toBeInTheDocument();
    });
    it("should display list length", () => {
      jest
        .spyOn(LocalStorageList, "getPostIds")
        .mockImplementationOnce(() => ["abc123"]);
      navigate.mockImplementationOnce(() => {});
      const { location, siteDescription, sectionTitle } = data;
      const { getByTestId } = render(
        <Header
          location={location}
          sectionTitle={sectionTitle}
          siteDescription={siteDescription}
        />
      );
      const yourListLength = getByTestId("header-your-list-length");
      expect(yourListLength).toBeInTheDocument();
      LocalStorageList.getPostIds.mockRestore();
    });
    it('should navigate to "features/list" page', () => {
      navigate.mockImplementationOnce(() => {});
      const { location, siteDescription, sectionTitle } = data;
      const { getByTestId } = render(
        <Header
          location={location}
          sectionTitle={sectionTitle}
          siteDescription={siteDescription}
        />
      );
      const yourListButton = document.querySelector(
        '[data-testid="header-your-list-button"] button'
      );
      fireEvent.click(yourListButton);
      expect(navigate).toBeCalledWith("/features/list/");
    });
  });
});
