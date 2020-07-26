import { navigate } from "gatsby";
import { Excerpt } from "molecules";
import moment from "moment";
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import data from "./data";

describe("Excerpt", () => {
  it("should display an image", () => {
    const { img } = data;
    const { getByTestId } = render(<Excerpt img={img} />);
    const excerpt = getByTestId("excerpt");
    const excerptImage = getByTestId("excerpt-image");
    expect(excerpt).toBeInTheDocument();
    expect(excerpt).toContainElement(excerptImage);
    expect(excerptImage).toHaveAttribute("style");
    expect(excerptImage.style["background-image"].includes(img.src)).toBe(true);
  });
  it("should contain a linked image", () => {
    navigate.mockImplementationOnce(() => {});
    const { img, url } = data;
    const { getByTestId } = render(<Excerpt img={img} url={url} />);
    const excerptImage = getByTestId("excerpt-image");
    fireEvent.click(excerptImage);
    expect(navigate).toBeCalledWith(url);
  });
  it("should display author", () => {
    const { author, img } = data;
    const { getByTestId, getByText } = render(
      <Excerpt author={author} img={img} />
    );
    const result = getByTestId("excerpt");
    expect(result).toContainElement(getByText(author));
  });
  it("should display formatted date", () => {
    const { date, img } = data;
    const { getByTestId, getByText } = render(
      <Excerpt date={date} img={img} />
    );
    const result = getByTestId("excerpt");
    const formattedDate = moment(date).format("MMMM Do YYYY, h:mma");
    expect(result).toContainElement(getByText(formattedDate));
  });
  it("should display summary", () => {
    const { img, summary } = data;
    const { getByTestId, getByText } = render(
      <Excerpt img={img} summary={summary} />
    );
    const result = getByTestId("excerpt");
    expect(result).toContainElement(getByText(summary));
  });
  it("should display title", () => {
    const { title, img } = data;
    const { getByTestId, getByText } = render(
      <Excerpt img={img} title={title} />
    );
    const result = getByTestId("excerpt");
    expect(result).toContainElement(getByText(title));
  });
  it("should contain a linked title", () => {
    const { img, title, url } = data;
    const { getByTestId } = render(
      <Excerpt img={img} title={title} url={url} />
    );
    const excerpt = getByTestId("excerpt");
    const excerptTitle = getByTestId("excerpt-title");
    expect(excerpt).toContainElement(excerptTitle);
    expect(excerptTitle).toBeInstanceOf(HTMLAnchorElement);
    expect(excerptTitle).toHaveAttribute("href", url);
  });
  it("should contain a descriptive button", () => {
    const { img } = data;
    const { getByTestId } = render(<Excerpt img={img} />);
    const excerpt = getByTestId("excerpt");
    const button = getByTestId("button");
    expect(excerpt).toContainElement(button);
    expect(button).toHaveTextContent("Read Full Article");
  });
  it("should contain a linked button", () => {
    navigate.mockImplementationOnce(() => {});
    const { img, title, url } = data;
    const { getByTestId } = render(<Excerpt img={img} url={url} />);
    const result = getByTestId("button");
    fireEvent.click(result);
    expect(navigate).toBeCalledWith(url);
  });
});
