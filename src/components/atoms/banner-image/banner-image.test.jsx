import { BannerImage } from "atoms";
import React from "react";
import { render } from "@testing-library/react";

describe("BannerImage", () => {
  it("should render text", () => {
    const headerText = "Below is the list of items that you've collected.";
    const { getByText } = render(
      <BannerImage backgroundPosition="center" cn={""} src={""}>
        <h2>{headerText}</h2>
      </BannerImage>
    );
    expect(getByText(headerText)).toBeInTheDocument();
  });
});
