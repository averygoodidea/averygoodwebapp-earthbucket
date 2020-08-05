import { navigate } from "gatsby";
import { MainNav } from "molecules";
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import data from "./data";

describe("MainNav", () => {
  it('should contain "Features" nav item', () => {
    navigate.mockImplementationOnce(() => {});
    const { getByTestId, getByText } = render(<MainNav />);
    const mainNav = getByTestId("main-nav");
    const link = getByText("Features");
    expect(mainNav).toContainElement(link);
    fireEvent.click(link);
    expect(navigate).toBeCalledWith("/");
  });
  it('should contain "Blog" nav item', () => {
    navigate.mockImplementationOnce(() => {});
    const { getByTestId, getByText } = render(<MainNav />);
    const mainNav = getByTestId("main-nav");
    const link = getByText("Blog");
    expect(mainNav).toContainElement(link);
    fireEvent.click(link);
    expect(navigate).toBeCalledWith("/blog/");
  });
  it("should tab appropriate nav item", () => {
    const { currentView } = data;
    render(<MainNav currentView={currentView} />);
    const link = document.querySelector(".tabbed");
    expect(link).toHaveTextContent("Features");
  });
});
