import { LocalStorageList } from "assets-js";
import { AlbumPostActivityMenu } from "organisms";
import React from "react";
import toastedNotes from "toasted-notes";
import { fireEvent, render } from "@testing-library/react";
import data from "./data";

describe("AlbumPostActivityMenu", () => {
  describe("Like Button", () => {
    it("should exist", () => {
      const { albumPost } = data;
      const { getByTestId } = render(
        <AlbumPostActivityMenu item={albumPost} />
      );
      const authorAlbumPostMenu = getByTestId("album-post-activity-menu");
      const button = getByTestId("like-button");
      expect(authorAlbumPostMenu).toContainElement(button);
    });
    it('should fire "like" event', () => {
      jest.spyOn(toastedNotes, "notify").mockImplementationOnce(() => {});
      const { albumPost } = data;
      const onAlbumPostEvent = jest.fn();
      const { getByTestId } = render(
        <AlbumPostActivityMenu
          item={albumPost}
          onAlbumPostEvent={onAlbumPostEvent}
        />
      );
      const button = getByTestId("like-button");
      fireEvent.click(button);
      expect(onAlbumPostEvent).toHaveBeenCalledWith({
        type: "LIKED",
        createdAt: expect.anything()
      });
    });
  });
  describe("Dislike Button", () => {
    it("should exist", () => {
      const { albumPost } = data;
      const { getByTestId } = render(
        <AlbumPostActivityMenu item={albumPost} />
      );
      const authorAlbumPostMenu = getByTestId("album-post-activity-menu");
      const button = getByTestId("dislike-button");
      expect(authorAlbumPostMenu).toContainElement(button);
    });
    it('should fire "dislike" event', () => {
      jest.spyOn(toastedNotes, "notify").mockImplementationOnce(() => {});
      const { albumPost } = data;
      const onAlbumPostEvent = jest.fn();
      const { getByTestId } = render(
        <AlbumPostActivityMenu
          item={albumPost}
          onAlbumPostEvent={onAlbumPostEvent}
        />
      );
      const button = getByTestId("dislike-button");
      fireEvent.click(button);
      expect(onAlbumPostEvent).toHaveBeenCalledWith({
        type: "DISLIKED",
        createdAt: expect.anything()
      });
    });
  });
  describe("Share Button", () => {
    it("should invoke Share Menu", () => {
      const { albumPost } = data;
      const { getByTestId } = render(
        <AlbumPostActivityMenu item={albumPost} />
      );
      const button = getByTestId("share-button");
      fireEvent.click(button);
      const shareMenu = getByTestId("share-menu");
      expect(shareMenu).toBeInTheDocument();
    });
  });
  describe("More Info Button", () => {
    it("should invoke more info url", () => {
      const { albumPost } = data;
      global.open = jest.fn();
      const { getByTestId } = render(
        <AlbumPostActivityMenu
          item={albumPost}
          moreInfoUrl={albumPost.moreInfoUrl}
        />
      );
      const button = getByTestId("button");
      fireEvent.click(button);
      expect(global.open).toBeCalledWith(albumPost.moreInfoUrl, "_blank");
    });
  });
  describe("addToList", () => {
    it("should add item id to LocalStorageList", () => {
      global.requestAnimationFrame = jest.fn();
      jest
        .spyOn(LocalStorageList, "addPostId")
        .mockImplementationOnce(() => {});
      jest.spyOn(toastedNotes, "notify").mockImplementationOnce(() => {});
      jest.spyOn(LocalStorageList, "init").mockImplementationOnce(() => {});
      const { albumPost } = data;
      const { getByTestId } = render(
        <AlbumPostActivityMenu item={albumPost} />
      );
      const button = getByTestId("like-button");
      fireEvent.click(button);
      expect(LocalStorageList.addPostId).toBeCalledWith(
        albumPost.alternative_id
      );
      expect(localStorage.getItem).toBeCalledWith("postIds");
      expect(localStorage.setItem).toBeCalledWith(
        "postIds",
        "32babe16-4379-42b0-b1c8-5986f3762fa5"
      );
    });
  });
  describe("removeFromList", () => {
    it("should remove item id from LocalStorageList", () => {
      global.requestAnimationFrame = jest.fn();
      jest
        .spyOn(LocalStorageList, "removePostId")
        .mockImplementationOnce(() => {});
      jest.spyOn(toastedNotes, "notify").mockImplementationOnce(() => {});
      jest.spyOn(LocalStorageList, "init").mockImplementationOnce(() => {});
      const { albumPost } = data;
      const { getByTestId } = render(
        <AlbumPostActivityMenu item={albumPost} />
      );
      const likeButton = getByTestId("like-button");
      fireEvent.click(likeButton);
      const dislikeButton = getByTestId("dislike-button");
      fireEvent.click(dislikeButton);
      expect(LocalStorageList.removePostId).toBeCalledWith(
        albumPost.alternative_id
      );
      expect(localStorage.getItem).toBeCalledWith("postIds");
      expect(localStorage.setItem).toBeCalledWith(
        "postIds",
        "32babe16-4379-42b0-b1c8-5986f3762fa5"
      );
    });
  });
});
