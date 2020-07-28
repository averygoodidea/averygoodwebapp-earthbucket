import { AuthorAlbumPostMenu } from "molecules";
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import data from "./data";

describe("AuthorAlbumPostMenu", () => {
  it("should have plus button", () => {
    const onPlusButtonClick = jest.fn();
    const { getByTestId } = render(
      <AuthorAlbumPostMenu onPlusButtonClick={onPlusButtonClick} />
    );
    const authorAlbumPostMenu = getByTestId("author-album-post-menu");
    const button = getByTestId("plus-button");
    expect(authorAlbumPostMenu).toContainElement(button);
    fireEvent.click(button);
    expect(onPlusButtonClick).toHaveBeenCalledTimes(1);
  });
  it("should have a button to sort by most recent", () => {
    const { albumPosts } = data;
    const { getByText, getByTestId } = render(
      <AuthorAlbumPostMenu albumPosts={albumPosts} />
    );
    const authorAlbumPostMenu = getByTestId("author-album-post-menu");
    const button = getByText("Sort by Most Recent");
    expect(button).toBeInTheDocument();
    expect(authorAlbumPostMenu).toContainElement(button);
    fireEvent.click(button);
    expect(document.querySelectorAll("li button")[0]).toHaveTextContent(
      albumPosts[0].title
    );
  });
  it("should have a button to sort by title", () => {
    const { albumPosts } = data;
    const { getAllByTest, getByText, getByTestId } = render(
      <AuthorAlbumPostMenu albumPosts={albumPosts} />
    );
    const authorAlbumPostMenu = getByTestId("author-album-post-menu");
    const button = getByText("Sort by Title");
    expect(button).toBeInTheDocument();
    expect(authorAlbumPostMenu).toContainElement(button);
    fireEvent.click(button);
    expect(document.querySelectorAll("li button")[0]).toHaveTextContent(
      albumPosts[0].title
    );
  });
  it("should tab selected item", () => {
    const { albumPosts, selectedItem } = data;
    const { getAllByTest, getByText, getByTestId } = render(
      <AuthorAlbumPostMenu
        albumPosts={albumPosts}
        selectedItem={selectedItem}
      />
    );
    const authorAlbumPostMenu = getByTestId("author-album-post-menu");
    const button = document.querySelector("li.tabbed button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(selectedItem.title);
  });
});
