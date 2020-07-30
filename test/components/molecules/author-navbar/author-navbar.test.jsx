import { AuthorNavbar } from "molecules";
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import data from "./data";

describe("AuthorNavbar", () => {
  it("should have correct amount of nav items", () => {
    const { navbarItems } = data;
    const { getAllByTestId, getByTestId } = render(
      <AuthorNavbar
        currentView={navbarItems[0].targetView}
        items={navbarItems}
      />
    );
    const buttons = getAllByTestId("button");
    expect(buttons).toHaveLength(navbarItems.length);
  });
  it("should tab nav item", () => {
    const { navbarItems } = data;
    const { getAllByTestId, getByTestId } = render(
      <AuthorNavbar
        currentView={navbarItems[0].targetView}
        items={navbarItems}
      />
    );
    expect(document.querySelector(".tabbed")).toHaveTextContent(
      navbarItems[0].title
    );
  });
});
