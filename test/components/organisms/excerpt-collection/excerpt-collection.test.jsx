import { AVeryGoodAuthenticator } from "assets-js";
import { navigate } from "gatsby";
import moment from "moment";
import { ExcerptCollection } from "organisms";
import React from "react";
import toastedNotes from "toasted-notes";
import { fireEvent, render, waitFor } from "@testing-library/react";
import data from "./data";

describe("ExcerptCollection", () => {
  beforeAll(() => {
    global.scrollTo = jest.fn();
  });
  beforeAll(() => {
    global.scrollTo.mockRestore();
  });
  it("should exist", () => {
    const { getByTestId } = render(<ExcerptCollection />);
    const result = getByTestId("excerpt-collection");
    expect(result).toBeInTheDocument();
  });
  describe("Taxonomy Filter", () => {
    it("should have taxonomy filter", () => {
      const { postExcerpts, location, taxonomies, s3 } = data;
      const { getByTestId } = render(
        <ExcerptCollection
          location={location}
          postExcerpts={postExcerpts}
          s3={s3}
          taxonomies={taxonomies}
        />
      );
      const excerptCollection = getByTestId("excerpt-collection");
      const taxonomyFilter = getByTestId("taxonomy-filter");
      expect(excerptCollection).toContainElement(taxonomyFilter);
    });
    it("should have proper taxonomy filter buttons", () => {
      const { postExcerpts, location, taxonomies, s3 } = data;
      render(
        <ExcerptCollection
          location={location}
          postExcerpts={postExcerpts}
          s3={s3}
          taxonomies={taxonomies}
        />
      );
      const buttons = document.querySelectorAll(
        '[data-testid="taxonomy-filter"] button'
      );
      let taxonomyButtons = [];
      buttons.forEach(
        button => button.textContent !== "" && taxonomyButtons.push(button)
      );
      taxonomyButtons.forEach((button, i) =>
        expect(button).toHaveTextContent(taxonomies[i])
      );
    });
  });
  describe("Excerpt", () => {
    it("should have the proper amount of cards", () => {
      const { postExcerpts, location, s3, taxonomies } = data;
      const { getAllByTestId } = render(
        <ExcerptCollection
          location={location}
          postExcerpts={postExcerpts}
          s3={s3}
          taxonomies={taxonomies}
        />
      );
      const excerpts = getAllByTestId("excerpt");
      expect(excerpts).toHaveLength(postExcerpts.length);
      getAllByTestId("excerpt-title").forEach((title, i) => {
        expect(title).toHaveTextContent(postExcerpts[i].node.frontmatter.title);
      });
    });
  });
});
