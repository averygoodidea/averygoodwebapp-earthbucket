import { CommentSection } from "atoms";
import React from "react";
import { render } from "@testing-library/react";

describe("CommentSection", () => {
  it("should exist", () => {
    const { getByTestId } = render(<CommentSection />);
    const result = getByTestId("comment-section");
    expect(result).toBeInTheDocument();
  });
  it("should brighten if not in modal", () => {
    const { getByTestId } = render(<CommentSection isModal={false} />);
    const result = getByTestId("comment-section");
    expect(result).toHaveClass(`brighten`);
  });
});
