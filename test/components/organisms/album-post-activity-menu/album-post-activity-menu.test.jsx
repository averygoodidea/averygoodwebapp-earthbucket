import { AlbumPostActivityMenu } from "organisms";
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import data from "./data";

describe("AlbumPostActivityMenu", () => {
  describe("Like Button", () => {
    it("should exist", () => {
      const { albumPost } = data
      const { getByTestId } = render(
        <AlbumPostActivityMenu item={albumPost} />
      );
      const authorAlbumPostMenu = getByTestId("album-post-activity-menu");
      const button = getByTestId("like-button");
      expect(authorAlbumPostMenu).toContainElement(button);
    });
    it("should fire \"like\" event", () => {
      const { albumPost } = data
      const mockAddToList = jest.spyOn(AlbumPostActivityMenu.prototype, 'addToList').mockImplementationOnce(() => {})
      const onAlbumPostEvent = jest.fn()
      const { getByTestId } = render(
        <AlbumPostActivityMenu item={albumPost} onAlbumPostEvent={onAlbumPostEvent} />
      );
      const button = getByTestId("like-button");
      fireEvent.click(button);
      expect(mockAddToList).toHaveBeenCalledTimes(1)
      // expect(onAlbumPostEvent).toHaveBeenCalledWith({
      //   type: "LIKED",
      //   createdAt: expect.anything()
      // })
    });
  })
});
