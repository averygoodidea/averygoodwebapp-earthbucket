import { AVeryGoodNarrowcaster } from "assets-js";
import { ShareMenu } from "molecules";
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import data from "./data";

describe("ShareMenu", () => {
  it("should contain Email button", () => {
    jest.spyOn(AVeryGoodNarrowcaster, "share").mockImplementationOnce(() => {});
    const { url } = data;
    const { getByTestId } = render(<ShareMenu url={url} />);
    const shareMenu = getByTestId("share-menu");
    const button = document.querySelector(
      '[data-testid="share-menu-button-email"] button'
    );
    expect(shareMenu).toContainElement(button);
    fireEvent.click(button);
    expect(AVeryGoodNarrowcaster.share).toBeCalledWith(
      "email",
      url,
      `Hey,\n\ncheck this out: ${url}`
    );
    AVeryGoodNarrowcaster.share.mockRestore();
  });
  it("should share to SMS service", () => {
    jest.spyOn(AVeryGoodNarrowcaster, "share").mockImplementationOnce(() => {});
    const { url } = data;
    const { getByTestId } = render(<ShareMenu url={url} />);
    const shareMenu = getByTestId("share-menu");
    const button = document.querySelector(
      '[data-testid="share-menu-button-sms"] button'
    );
    expect(shareMenu).toContainElement(button);
    fireEvent.click(button);
    expect(AVeryGoodNarrowcaster.share).toBeCalledWith(
      "sms",
      url,
      `Hey, check this out ${url}`
    );
    AVeryGoodNarrowcaster.share.mockRestore();
  });
  it("should share to Twitter service", () => {
    jest.spyOn(AVeryGoodNarrowcaster, "share").mockImplementationOnce(() => {});
    const { url } = data;
    const { getByTestId } = render(<ShareMenu url={url} />);
    const shareMenu = getByTestId("share-menu");
    const button = document.querySelector(
      '[data-testid="share-menu-button-twitter"] button'
    );
    expect(shareMenu).toContainElement(button);
    fireEvent.click(button);
    expect(AVeryGoodNarrowcaster.share).toBeCalledWith(
      "twitter",
      url,
      `Check this out: ${url} `
    );
    AVeryGoodNarrowcaster.share.mockRestore();
  });
  it("should render hashtags", async () => {
    jest.spyOn(AVeryGoodNarrowcaster, "share").mockImplementationOnce(() => {});
    const { tags, url } = data;
    const { getByTestId } = render(<ShareMenu url={url} tags={tags} />);
    const button = document.querySelector(
      '[data-testid="share-menu-button-twitter"] button'
    );
    fireEvent.click(button);
    const hashTags = tags.map(tag => `#${tag}`).join(" ");
    expect(AVeryGoodNarrowcaster.share).toBeCalledWith(
      "twitter",
      url,
      `Check this out: ${url} ${hashTags}`
    );
    AVeryGoodNarrowcaster.share.mockRestore();
  });
  it("should share to Whatsapp service", () => {
    jest.spyOn(AVeryGoodNarrowcaster, "share").mockImplementationOnce(() => {});
    const { url } = data;
    const { getByTestId } = render(<ShareMenu url={url} />);
    const shareMenu = getByTestId("share-menu");
    const button = document.querySelector(
      '[data-testid="share-menu-button-whatsapp"] button'
    );
    expect(shareMenu).toContainElement(button);
    fireEvent.click(button);
    expect(AVeryGoodNarrowcaster.share).toBeCalledWith(
      "whatsapp",
      url,
      `Hey check this out: ${url} `
    );
    AVeryGoodNarrowcaster.share.mockRestore();
  });
  it("should share to Pinterest service", () => {
    jest.spyOn(AVeryGoodNarrowcaster, "share").mockImplementationOnce(() => {});
    const { url } = data;
    const { getByTestId } = render(<ShareMenu url={url} />);
    const shareMenu = getByTestId("share-menu");
    const button = document.querySelector(
      '[data-testid="share-menu-button-pinterest"] button'
    );
    expect(shareMenu).toContainElement(button);
    fireEvent.click(button);
    expect(AVeryGoodNarrowcaster.share).toBeCalledWith(
      "pinterest",
      url,
      `check out ${process.env.GATSBY_EARTHBUCKET_HOSTNAME} `
    );
    AVeryGoodNarrowcaster.share.mockRestore();
  });
  it("should share to Facebook service", () => {
    jest.spyOn(AVeryGoodNarrowcaster, "share").mockImplementationOnce(() => {});
    const { url } = data;
    const { getByTestId } = render(<ShareMenu url={url} />);
    const shareMenu = getByTestId("share-menu");
    const button = document.querySelector(
      '[data-testid="share-menu-button-facebook"] button'
    );
    expect(shareMenu).toContainElement(button);
    fireEvent.click(button);
    expect(AVeryGoodNarrowcaster.share).toBeCalledWith(
      "facebook",
      url,
      `Hey check this out: ${url} `
    );
    AVeryGoodNarrowcaster.share.mockRestore();
  });
});
