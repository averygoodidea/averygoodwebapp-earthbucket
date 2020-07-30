import { AVeryGoodAuthenticator } from "assets-js";
import { navigate, useStaticQuery } from "gatsby";
import { AuthorSiteSettingsManager } from "organisms";
import React from "react";
import toastedNotes from "toasted-notes";
import { fireEvent, render, waitFor } from "@testing-library/react";

describe("AuthorSiteSettingsManager", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  it("should exist", () => {
    const { getByTestId } = render(<AuthorSiteSettingsManager />);
    const result = getByTestId("author-site-settings-manager");
    expect(result).toBeInTheDocument();
  });
  it('should have "Deploy Site Changes" button', () => {
    const { getByTestId } = render(<AuthorSiteSettingsManager />);
    const authorSiteSettingsManager = getByTestId(
      "author-site-settings-manager"
    );
    const button = getByTestId("button");
    expect(authorSiteSettingsManager).toContainElement(button);
    expect(button).toHaveTextContent("Deploy Site Changes");
  });
  it('should send "DELETE" request to server to clear cloudfront cache', async () => {
    global.confirm = jest.fn(() => true);
    global.requestAnimationFrame = jest.fn();
    jest.spyOn(toastedNotes, "notify").mockImplementationOnce(() => {});
    const mockedFetch = fetch.mockResponseOnce(() => Promise.resolve({}));
    const { getByTestId } = render(<AuthorSiteSettingsManager />);
    const button = getByTestId("button");
    fireEvent.click(button);
    await waitFor(() => {
      expect(mockedFetch).toHaveBeenCalledTimes(1);
      expect(mockedFetch).toBeCalledWith("/api/1/admin/cloudfront-cache", {
        headers: {
          Authorization: undefined,
          "Content-Type": "application/json",
          "x-api-key": undefined
        },
        method: "DELETE"
      });
    });
  });
  it("should sign author out", async () => {
    const mockedFetch = fetch.mockResponseOnce(() =>
      Promise.resolve({
        status: 401
      })
    );
    jest
      .spyOn(AVeryGoodAuthenticator, "signOut")
      .mockImplementationOnce(() => {});
    const { getByTestId } = render(<AuthorSiteSettingsManager />);
    const button = getByTestId("button");
    fireEvent.click(button);
    await waitFor(() => {
      expect(mockedFetch).toHaveBeenCalledTimes(1);
      expect(AVeryGoodAuthenticator.signOut).toHaveBeenCalledTimes(1);
    });
  });
});
