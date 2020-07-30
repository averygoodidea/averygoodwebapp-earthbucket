import { ScriptureSection } from "molecules";
import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import data from "./data";

describe("ScriptureSection", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  it("should call fetch on render", async () => {
    const mockedFetch = fetch.mockResponseOnce(() =>
      Promise.resolve(
        JSON.stringify({
          text:
            "James, a servant of God and of the Lord Jesus Christ, to the twelve tribes which are scattered abroad, greeting."
        })
      )
    );
    const { address } = data;
    const { getByTestId } = render(<ScriptureSection address={address} />);
    await waitFor(() => getByTestId("scripture-section"));
    expect(mockedFetch).toBeCalledTimes(1);
  });
  it("should contain linked button", async () => {
    fetch.mockResponseOnce(() =>
      Promise.resolve(
        JSON.stringify({
          text:
            "James, a servant of God and of the Lord Jesus Christ, to the twelve tribes which are scattered abroad, greeting."
        })
      )
    );
    global.open = jest.fn();
    const { address } = data;
    const { getByTestId } = render(<ScriptureSection address={address} />);
    const scriptureSection = await waitFor(() =>
      getByTestId("scripture-section")
    );
    const button = getByTestId("button");
    expect(scriptureSection).toContainElement(button);
    fireEvent.click(button);
    expect(global.open).toBeCalledWith(
      `https://www.biblegateway.com/passage/?search=${address}&version=KJV`,
      "_blank"
    );
  });
});
