import { AVeryGoodAuthenticator } from "assets-js";
import { navigate } from "gatsby";
import moment from "moment";
import { BlogPostActivityMenu } from "organisms";
import React from "react";
import toastedNotes from "toasted-notes";
import { fireEvent, render, waitFor } from "@testing-library/react";
import data from "./data";

describe("BlogPostActivityMenu", () => {
  it("should exist", () => {
    const { getByTestId } = render(<BlogPostActivityMenu />);
    const result = getByTestId("blog-post-activity-menu");
    expect(result).toBeInTheDocument();
  });
  it("should display author", () => {
    const { author, date, tags } = data;
    const { getByTestId, getByText } = render(
      <BlogPostActivityMenu author={author} date={date} tags={tags} />
    );
    const blogPostActivityMenu = getByTestId("blog-post-activity-menu");
    expect(blogPostActivityMenu).toContainElement(getByText(author));
  });
  it("should display published date", () => {
    const { author, date, tags } = data;
    const { getByTestId, getByText } = render(
      <BlogPostActivityMenu author={author} date={date} tags={tags} />
    );
    const blogPostActivityMenu = getByTestId("blog-post-activity-menu");
    expect(blogPostActivityMenu).toContainElement(
      getByText(`${moment(date).format("MMMM Do YYYY, h:mma")}`)
    );
  });
  describe("Tags", () => {
    it("should display tags as buttons", () => {
      const { author, date, tags } = data;
      const { getAllByTestId } = render(
        <BlogPostActivityMenu author={author} date={date} tags={tags} />
      );
      const buttons = getAllByTestId("button");
      buttons.forEach((button, i) => expect(button).toHaveTextContent(tags[i]));
    });
    it("should navigate to appropriate tag pages", () => {
      navigate.mockImplementation(() => {});
      const { author, date, tags } = data;
      const { getAllByTestId } = render(
        <BlogPostActivityMenu author={author} date={date} tags={tags} />
      );
      const buttons = getAllByTestId("button");
      buttons.forEach((button, i) => {
        fireEvent.click(button);
        expect(navigate).toBeCalledWith(`/b/tag/${tags[i]}`);
      });
      navigate.mockRestore();
    });
    describe("Share Button", () => {
      it('should have "share" button', () => {
        const { author, date, tags } = data;
        const { getByTestId } = render(
          <BlogPostActivityMenu author={author} date={date} tags={tags} />
        );
        const button = getByTestId("share-button");
        fireEvent.click(button);
        const shareMenu = getByTestId("share-menu");
        expect(shareMenu).toBeInTheDocument();
      });
    });
  });
});
