import { ImageUploader } from "molecules";
import React from "react";
import { render } from "@testing-library/react";
import data from "./data";

describe("ImageUploader", () => {
  it("should exist", () => {
    const { getByTestId } = render(<ImageUploader />);
    const result = getByTestId("image-uploader");
    expect(result).toBeInTheDocument();
  });
  it("should display sortable list", () => {
    const { defaultValue } = data;
    const { getByTestId } = render(
      <ImageUploader defaultValue={defaultValue} />
    );
    const result = getByTestId("sortable-list");
    expect(result).toBeInTheDocument();
  });
});
