import { BannerImage } from "atoms";
import React from "react";
import { bannerImageData } from "test-data";
import { render } from "@testing-library/react";

const getBase64 = path => {
  const buff = fs.readFileSync(path);
  return buff.toString("base64");
};

// import fs from 'fs'
// const path = `${__dirname}/../../../../scripts/earthbucket-blog-post-seed.png`
// const src = `data:image/png;base64,${getBase64(path)}`
// fs.writeFile('output.txt', src, err => {
// 	if (err) {
// 		console.error(err)
// 	}
// })

describe("BannerImage", () => {
  it("should render background image", () => {
    const { src } = bannerImageData;
    const { getByTestId } = render(<BannerImage src={src} />);
    const result = getByTestId("banner-image");
    expect(result).toHaveAttribute("style");
    expect(result.style["background-image"].includes(src)).toBe(true);
  });
  it("should render text", () => {
    const { headerText } = bannerImageData;
    const { getByText } = render(
      <BannerImage>
        <h2>{headerText}</h2>
      </BannerImage>
    );
    expect(getByText(headerText)).toBeInTheDocument();
  });
});
