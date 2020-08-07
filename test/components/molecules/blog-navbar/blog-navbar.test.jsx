import { navigate } from "gatsby";
import { BlogNavbar } from "molecules";
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import data from "./data";

describe("BlogNavbar", () => {
  it("should have blog index link", () => {
    navigate.mockImplementationOnce(() => {});
    const { getByText } = render(<BlogNavbar />);
    const button = getByText("Blog Index");
    fireEvent.click(button);
    expect(navigate).toBeCalledWith("/blog/");
  });
  it("should display links to next and previous blog post links", () => {
    navigate.mockImplementationOnce(() => {});
    const { next, previous } = data;
    const { getByText } = render(
      <BlogNavbar next={next} previous={previous} />
    );
    const nextButton = getByText(next.title);
    fireEvent.click(nextButton);
    expect(navigate).toBeCalledWith(`/b/${next.slug}/`);
    const previousButton = getByText(previous.title);
    fireEvent.click(previousButton);
    expect(navigate).toBeCalledWith(`/b/${previous.slug}/`);
  });
  it("should not display next blog post link", () => {
    const { next, previous } = data;
    const { getByText } = render(<BlogNavbar previous={previous} />);
    expect(document.querySelector(".next")).not.toBeInTheDocument();
  });
  it("should not display previous blog post link", () => {
    const { next } = data;
    const { getByText } = render(<BlogNavbar next={next} />);
    expect(document.querySelector(".previous")).not.toBeInTheDocument();
  });
});
