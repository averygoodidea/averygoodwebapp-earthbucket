import { SEO } from "atoms";
import { useStaticQuery } from "gatsby";
import React from "react";
import { render } from "@testing-library/react";

describe("SEO", () => {
  it("should create a title", () => {
    useStaticQuery.mockImplementationOnce(() => ({
      defaultOpenGraphImg: {
        fluid: {
          src: "/test-image-src.jpg"
        }
      },
      site: {
        siteMetadata: {
          title: "A Very Good Web App"
        }
      }
    }));
    render(<SEO title={"Home"} />);
    expect(useStaticQuery).toHaveBeenCalledTimes(1);
  });
});
