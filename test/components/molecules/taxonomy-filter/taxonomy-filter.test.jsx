import { navigate } from "gatsby";
import { TaxonomyFilter } from "molecules";
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import data from "./data";

describe("TaxonomyFilter", () => {
  describe("for album section", () => {
    it("should contain a button link to the album section index", () => {
      const { indexRoute, location } = data.album;
      const { getByTestId } = render(
        <TaxonomyFilter indexRoute={indexRoute} location={location} />
      );
      const taxonomyFilter = getByTestId("taxonomy-filter");
      const button = document.querySelector(
        '[data-testid="taxomony-filter-album-index-button"] button'
      );
      expect(taxonomyFilter).toContainElement(button);
    });
    it('should contain an album section index button that calls the "navigate" function inside of a "requestAnimationFrame" function', () => {
      const spyRequestAnimationFrame = jest.spyOn(
        global,
        "requestAnimationFrame"
      );
      navigate.mockImplementationOnce(() => {});
      const { indexRoute, location } = data.album;
      const { getByTestId } = render(
        <TaxonomyFilter indexRoute={indexRoute} location={location} />
      );
      const button = document.querySelector(
        '[data-testid="taxomony-filter-album-index-button"] button'
      );
      fireEvent.click(button);
      expect(spyRequestAnimationFrame).toBeCalledTimes(1);
      expect(navigate).toBeCalledWith("/", {
        state: { defaultTagFilterScrollLeft: 0 }
      });
      global.requestAnimationFrame.mockRestore();
    });
    it("should render taxonomies for album section", () => {
      navigate.mockImplementationOnce(() => {});
      const { baseRoute, indexRoute, location, taxonomies } = data.album;
      const { getByText } = render(
        <TaxonomyFilter
          baseRoute={baseRoute}
          indexRoute={indexRoute}
          location={location}
          taxonomies={taxonomies}
        />
      );
      taxonomies.forEach(taxonomy => {
        expect(getByText(taxonomy)).toBeInTheDocument();
        expect(
          document.querySelector(`.font-icon-category-${taxonomy}`)
        ).toBeInTheDocument();
      });
    });
  });
  describe("for blog section", () => {
    it("should contain a button link to the blog section index", () => {
      const { location } = data.blog;
      const { getByTestId } = render(<TaxonomyFilter location={location} />);
      const taxonomyFilter = getByTestId("taxonomy-filter");
      const button = document.querySelector(
        '[data-testid="taxomony-filter-blog-index-button"] button'
      );
      expect(taxonomyFilter).toContainElement(button);
    });
    it('should contain a blog section index button that call the "navigate" function inside of a "requestAnimationFrame" function', () => {
      const spyRequestAnimationFrame = jest.spyOn(
        global,
        "requestAnimationFrame"
      );
      navigate.mockImplementationOnce(() => {});
      const { location } = data.blog;
      const { getByTestId } = render(<TaxonomyFilter location={location} />);
      const button = document.querySelector(
        '[data-testid="taxomony-filter-blog-index-button"] button'
      );
      fireEvent.click(button);
      expect(spyRequestAnimationFrame).toBeCalledTimes(1);
      expect(navigate).toBeCalledWith("/blog/", {
        state: { defaultTagFilterScrollLeft: 0 }
      });
      global.requestAnimationFrame.mockRestore();
    });
    it("should render taxonomies for blog section", () => {
      navigate.mockImplementationOnce(() => {});
      const { location, taxonomies } = data.blog;
      const { getByText } = render(
        <TaxonomyFilter location={location} taxonomies={taxonomies} />
      );
      taxonomies.forEach(taxonomy =>
        expect(getByText(taxonomy)).toBeInTheDocument()
      );
    });
  });
});
