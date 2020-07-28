import { AuthorMoreMenu } from "molecules";
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import data from "./data";

describe("AuthorMoreMenu", () => {
  it("should have more button", () => {
    const { getByTestId } = render(<AuthorMoreMenu />);
    const authorMoreMenu = getByTestId("author-more-menu");
    const button = getByTestId("more-button");
    expect(authorMoreMenu).toContainElement(button);
  });
  it("should have the correct amount of list items", () => {
    const { moreMenuItems } = data;
    const { getByTestId } = render(<AuthorMoreMenu items={moreMenuItems} />);
    const button = getByTestId("more-button");
    fireEvent.click(button);
    expect(document.querySelectorAll("li")).toHaveLength(moreMenuItems.length);
  });
});
