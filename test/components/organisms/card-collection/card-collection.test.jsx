import { AVeryGoodAuthenticator } from "assets-js";
import { navigate } from "gatsby";
import moment from "moment";
import { CardCollection } from "organisms";
import React from "react";
import toastedNotes from "toasted-notes";
import { fireEvent, render, waitFor } from "@testing-library/react";
import data from "./data";

describe("CardCollection", () => {
  it("should exist", () => {
    const { getByTestId } = render(<CardCollection />);
    const result = getByTestId("card-collection");
    expect(result).toBeInTheDocument();
  });
  describe("Taxonomy Filter", () => {
    it("should have taxonomy filter", () => {
      const { location, taxonomies } = data;
      const { getByTestId } = render(
        <CardCollection location={location} taxonomies={taxonomies} />
      );
      const cardCollection = getByTestId("card-collection");
      const taxonomyFilter = getByTestId("taxonomy-filter");
      expect(cardCollection).toContainElement(taxonomyFilter);
    });
    it("should have proper taxonomy filter buttons", () => {
      const { location, taxonomies } = data;
      render(<CardCollection location={location} taxonomies={taxonomies} />);
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
  describe("Card", () => {
    it("should have the proper amount of cards", () => {
      const { albumPosts, location, s3, taxonomies } = data;
      const { getAllByTestId } = render(
        <CardCollection
          albumPosts={albumPosts}
          location={location}
          s3={s3}
          taxonomies={taxonomies}
        />
      );
      const cards = getAllByTestId("card");
      expect(cards).toHaveLength(albumPosts.length);
      getAllByTestId("card-title").forEach((title, i) => {
        expect(title).toHaveTextContent(albumPosts[i].node.title);
      });
    });
  });
});
