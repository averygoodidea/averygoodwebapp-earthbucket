import { navigate } from "gatsby";
import { Card } from "molecules";
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import data from "./data";

describe("Card", () => {
  it("should be a link", () => {
    const { image } = data;
    const { getByTestId } = render(<Card image={image} />);
    const result = getByTestId("card");
    expect(result).toBeInstanceOf(HTMLAnchorElement);
  });
  it("should link to proper slugId", () => {
    const { image, slugId } = data;
    const { getByTestId } = render(<Card image={image} slugId={slugId} />);
    const result = getByTestId("card");
    expect(result).toHaveAttribute("href", `/a/${slugId}/`);
  });
  it("should display image", () => {
    const { image, title } = data;
    const { getByTestId } = render(<Card image={image} title={title} />);
    expect(document.querySelector("img")).toHaveAttribute(
      "src",
      image.childImageSharp.fluid.src
    );
    expect(document.querySelector("img")).toHaveAttribute("alt", title);
  });
  it("should display categories", () => {
    const { categories, image } = data;
    const { getAllByTestId } = render(
      <Card categories={categories} image={image} />
    );
    const result = getAllByTestId("category");
    expect(result).toHaveLength(categories.length);
  });
  it("should link to category page", () => {
    navigate.mockImplementationOnce(() => {});
    const { categories, image } = data;
    const { getAllByTestId } = render(
      <Card categories={categories} image={image} />
    );
    const link = getAllByTestId("category")[0];
    fireEvent.click(link);
    expect(navigate).toBeCalledWith(`/a/category/${categories[0]}/`);
  });
});
