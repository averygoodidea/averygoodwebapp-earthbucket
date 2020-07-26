import { BannerImage } from "atoms";
import { navigate } from "gatsby";
import { ContentWindow } from "molecules";
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import data from "./data";

describe("ContentWindow", () => {
  it("should render children", () => {
    const { content } = data;
    const html = (
      <div data-testid="content">
        <p>{content}</p>
      </div>
    );
    const { getByTestId } = render(<ContentWindow>{html}</ContentWindow>);
    const contentWindow = getByTestId("content-window");
    expect(contentWindow).toContainElement(getByTestId("content"));
  });
  it("should render banner image", () => {
    const { headerText, src } = data;
    const bannerImage = (
      <BannerImage src={src}>
        <h2>{headerText}</h2>
      </BannerImage>
    );
    const { getByTestId } = render(<ContentWindow bannerImage={bannerImage} />);
    const contentWindow = getByTestId("content-window");
    expect(contentWindow).toContainElement(getByTestId("banner-image"));
  });
});
