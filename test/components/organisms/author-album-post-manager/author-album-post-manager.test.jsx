import { AVeryGoodAuthenticator } from "assets-js";
import { navigate } from "gatsby";
import { AuthorAlbumPostManager } from "organisms";
import React from "react";
import toastedNotes from "toasted-notes";
import { fireEvent, render, waitFor } from "@testing-library/react";
import data from "./data";
// import userEvent from '@testing-library/user-event'
// import { act } from 'react-dom/test-utils';

describe("AuthorAlbumPostManager", () => {
  it("should exist", () => {
    const { allAlbumPosts } = data;
    const { getByTestId } = render(
      <AuthorAlbumPostManager allAlbumPosts={allAlbumPosts} mode={"CREATE"} />
    );
    const result = getByTestId("author-album-post-manager");
    expect(result).toBeInTheDocument();
  });
  it("should contain author album post menu", () => {
    const { allAlbumPosts } = data;
    const { getByTestId } = render(
      <AuthorAlbumPostManager allAlbumPosts={allAlbumPosts} mode={"CREATE"} />
    );
    const authorAlbumPostManager = getByTestId("author-album-post-manager");
    const authorAlbumPostMenu = getByTestId("author-album-post-menu");
    expect(authorAlbumPostManager).toContainElement(authorAlbumPostMenu);
  });
  it("should contain a form tag", () => {
    const { allAlbumPosts } = data;
    const { getByTestId } = render(
      <AuthorAlbumPostManager allAlbumPosts={allAlbumPosts} mode={"CREATE"} />
    );
    const authorAlbumPostManager = getByTestId("author-album-post-manager");
    const form = getByTestId("author-album-post-manager-form");
    expect(authorAlbumPostManager).toContainElement(form);
  });
  describe('"CREATE" Mode', () => {
    // beforeEach(() => {
    //   fetch.resetMocks();
    // });
    it("should contain appropriate form controls", () => {
      const { allAlbumPosts } = data;
      const { getByTestId } = render(
        <AuthorAlbumPostManager allAlbumPosts={allAlbumPosts} mode={"CREATE"} />
      );
      const form = getByTestId("author-album-post-manager-form");
      expect(form).toHaveFormValues({
        title: "",
        summary: "",
        scripture: "",
        price: null,
        "more-info-url": ""
      });
      expect(form).toContainElement(getByTestId("select"));
      expect(form).toContainElement(getByTestId("image-uploader"));
      expect(form).toContainElement(getByTestId("submit-button"));
    });
    it("should invoke saveItemData call", () => {
      const mockSaveItemData = jest
        .spyOn(AuthorAlbumPostManager.prototype, "saveItemData")
        .mockImplementationOnce(() => {});
      const { allAlbumPosts, s3 } = data;
      const { getByTestId } = render(
        <AuthorAlbumPostManager allAlbumPosts={allAlbumPosts} mode={"CREATE"} />
      );
      const submitButton = getByTestId("submit-button");
      fireEvent.click(submitButton);
      expect(mockSaveItemData).toHaveBeenCalledTimes(1);
      AuthorAlbumPostManager.prototype.saveItemData.mockRestore();
    });
    /*
    it("should send \"POST\" request to server", async () => {
      global.requestAnimationFrame = jest.fn();
      jest.spyOn(toastedNotes, "notify").mockImplementation(() => {});
      const mockedFetch = fetch.mockResponse(() => Promise.resolve({}));

      const { allAlbumPosts, s3 } = data;
      const { getByTestId } = render(
        <AuthorAlbumPostManager allAlbumPosts={allAlbumPosts} mode={"CREATE"} />
      );

      //add data controls here

      const titleInput = document.querySelector('[data-testid="author-album-post-manager-form"] input[name="title"]')
      fireEvent.change(titleInput, { target: { value: "Chuck Norris" }})

      const summaryInput = document.querySelector('[data-testid="author-album-post-manager-form"] textarea[name="summary"]')
      userEvent.type(summaryInput, "Lorem ipsum dolor sit amet.")

      const scriptureInput = document.querySelector('[data-testid="author-album-post-manager-form"] input[name="scripture"]')
      fireEvent.change(scriptureInput, { target: { value: "James 1:1" }})

      const priceInput = document.querySelector('[data-testid="author-album-post-manager-form"] input[name="price"]')
      fireEvent.change(priceInput, { target: { value: 35.00 }})

      const moreInfoUrlInput = document.querySelector('[data-testid="author-album-post-manager-form"] input[name="more-info-url"]')
      fireEvent.change(moreInfoUrlInput, { target: { value: "https://domain.test/more-info.html" }})

      // fireEvent.drop doesn't seem to properly add an image to the image uploader, so just skip this part of the test.
      
      act(() => {
        const imageUploader = document.querySelector('[data-testid="image-uploader"] input[type="file"]')
        fireEvent.drop(imageUploader, {
          dataTransfer: {
            files: [new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })]
          }
        })
      })

      const submitButton = getByTestId("submit-button");
      fireEvent.click(submitButton);
      await waitFor( () => {
        expect(mockedFetch).toHaveBeenCalledTimes(1);
        expect(mockedFetch).toBeCalledWith("")
        toastedNotes.notify.mockRestore()
      })
    });
    */
  });
  describe('"UPDATE" Mode', () => {
    beforeEach(() => {
      fetch.resetMocks();
    });
    it("should contain appropriate form controls", () => {
      const { allAlbumPosts, s3, selectedItem } = data;
      const { getByTestId } = render(
        <AuthorAlbumPostManager
          allAlbumPosts={allAlbumPosts}
          mode={"UPDATE"}
          s3={s3}
          selectedItem={selectedItem}
        />
      );
      const form = getByTestId("author-album-post-manager-form");
      expect(form).toHaveFormValues({
        title: selectedItem.title,
        summary: selectedItem.summary,
        scripture: selectedItem.scriptureAddress,
        price: selectedItem.price,
        "more-info-url": selectedItem.moreInfoUrl
      });
      expect(form).toContainElement(getByTestId("select"));
      const selectOptions = document.querySelectorAll(
        '[data-testid="select"] input[name="categories"]'
      );
      selectOptions.forEach((option, i) =>
        expect(option).toHaveValue(selectedItem.categories[i])
      );
      expect(form).toContainElement(getByTestId("image-uploader"));
      const imageUploaderImages = document.querySelectorAll(
        '[data-testid="image-uploader"] list img'
      );
      imageUploaderImages.forEach((img, i) =>
        expect(img).toHaveAttribute("src", selectedItem.images[i])
      );
      expect(form).toContainElement(getByTestId("submit-button"));
    });
    it("should invoke saveItemData call", () => {
      const mockSaveItemData = jest
        .spyOn(AuthorAlbumPostManager.prototype, "saveItemData")
        .mockImplementationOnce(() => {});
      const { allAlbumPosts, s3, selectedItem } = data;
      const { getByTestId } = render(
        <AuthorAlbumPostManager
          allAlbumPosts={allAlbumPosts}
          mode={"UPDATE"}
          s3={s3}
          selectedItem={selectedItem}
        />
      );
      const submitButton = getByTestId("submit-button");
      fireEvent.click(submitButton);
      expect(mockSaveItemData).toHaveBeenCalledTimes(1);
      AuthorAlbumPostManager.prototype.saveItemData.mockRestore();
    });
    it('should invoke "PUT" request to server', async () => {
      global.requestAnimationFrame = jest.fn();
      const mockedFetch = fetch.mockResponseOnce(() => Promise.resolve({}));
      const { allAlbumPosts, s3, selectedItem } = data;
      const { getByTestId } = render(
        <AuthorAlbumPostManager
          allAlbumPosts={allAlbumPosts}
          mode={"UPDATE"}
          s3={s3}
          selectedItem={selectedItem}
        />
      );
      const submitButton = getByTestId("submit-button");
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(mockedFetch).toHaveBeenCalledTimes(1);
        expect(mockedFetch).toBeCalledWith(
          `/api/1/admin/album/posts/${selectedItem.alternative_id}`,
          {
            body:
              '{"title":"Canned Salmon","summary":"With%20it%20being%20extremely%20healthy%2C%20relatively%20inexpensive%20and%20easily%20accessible%2C%20canned%20salmon%20is%20the%20best%20deal%20in%20town.","categories":["food"],"price":45,"moreInfoUrl":"https://www.wildplanetfoods.com/product/wild-sockeye-salmon/","scriptureAddress":"James 1:1"}',
            headers: {
              Authorization: undefined,
              "Content-Type": "application/json",
              "x-api-key": undefined
            },
            method: "PUT"
          }
        );
      });
    });
    it("should sign author out", async () => {
      global.requestAnimationFrame = jest.fn();
      const mockedFetch = fetch.mockResponseOnce(() =>
        Promise.resolve({
          status: 401
        })
      );
      jest
        .spyOn(AVeryGoodAuthenticator, "signOut")
        .mockImplementationOnce(() => {});
      const { allAlbumPosts, s3, selectedItem } = data;
      const { getByTestId } = render(
        <AuthorAlbumPostManager
          allAlbumPosts={allAlbumPosts}
          mode={"UPDATE"}
          s3={s3}
          selectedItem={selectedItem}
        />
      );
      const submitButton = getByTestId("submit-button");
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(mockedFetch).toHaveBeenCalledTimes(1);
        expect(AVeryGoodAuthenticator.signOut).toHaveBeenCalledTimes(1);
      });
    });
    describe("Navigate", () => {
      it("should navigate to a new page to CREATE an item", () => {
        navigate.mockImplementationOnce(() => {});
        const { allAlbumPosts, s3, selectedItem } = data;
        const { getByTestId } = render(
          <AuthorAlbumPostManager
            allAlbumPosts={allAlbumPosts}
            mode={"UPDATE"}
            s3={s3}
            selectedItem={selectedItem}
          />
        );
        const button = getByTestId("plus-button");
        fireEvent.click(button);
        expect(navigate).toBeCalledWith("/author/album/");
        navigate.mockRestore();
      });
      it("should navigate to a selected item page", () => {
        navigate.mockImplementationOnce(() => {});
        const { allAlbumPosts, s3, selectedItem } = data;
        const { getByTestId } = render(
          <AuthorAlbumPostManager
            allAlbumPosts={allAlbumPosts}
            mode={"UPDATE"}
            s3={s3}
            selectedItem={selectedItem}
          />
        );
        const buttons = document.querySelectorAll(
          '[data-testid="author-album-post-menu"] ul button'
        );
        let navigateToHere;
        buttons.forEach(button => {
          if (!navigateToHere && button.textContent !== selectedItem.title) {
            navigateToHere = button;
          }
        });
        //const button = buttons.find( button => button.value !== selectedItem.title)
        fireEvent.click(navigateToHere);
        expect(navigate).toBeCalledWith(
          "/author/album/GRSAc6FdROayawMen6h9hg/"
        );
        navigate.mockRestore();
      });
    });
    describe("More Menu", () => {
      beforeEach(() => {
        fetch.resetMocks();
      });
      it("should should exist", () => {
        const { allAlbumPosts, s3, selectedItem } = data;
        const { getByTestId } = render(
          <AuthorAlbumPostManager
            allAlbumPosts={allAlbumPosts}
            mode={"UPDATE"}
            s3={s3}
            selectedItem={selectedItem}
          />
        );
        const authorAlbumPostManager = getByTestId("author-album-post-manager");
        const authorMoreMenu = getByTestId("author-more-menu");
        expect(authorAlbumPostManager).toContainElement(authorMoreMenu);
      });
      it("should delete selected item", () => {
        global.requestAnimationFrame = jest.fn();
        jest.spyOn(toastedNotes, "notify").mockImplementationOnce(() => {});
        const mockedFetch = fetch.mockResponse(() => Promise.resolve({}));
        global.confirm = jest.fn(() => true);
        const { allAlbumPosts, s3, selectedItem } = data;
        const { getByTestId } = render(
          <AuthorAlbumPostManager
            allAlbumPosts={allAlbumPosts}
            mode={"UPDATE"}
            s3={s3}
            selectedItem={selectedItem}
          />
        );
        const moreButton = getByTestId("more-button");
        fireEvent.click(moreButton);
        const menuButtons = document.querySelectorAll(
          '[data-testid="author-more-menu"] ul button'
        );
        let deleteButton;
        menuButtons.forEach(button => {
          if (button.textContent === "Delete Item") {
            deleteButton = button;
          }
        });
        fireEvent.click(deleteButton);
        expect(global.confirm).toHaveBeenCalledTimes(1);
        expect(mockedFetch).toHaveBeenCalledTimes(2);
        expect(mockedFetch).toHaveBeenNthCalledWith(
          1,
          "/api/1/admin/album/s3/images?ids=sample-image-03,sample-image-05",
          {
            headers: {
              Authorization: undefined,
              "Content-Type": "application/json",
              "x-api-key": undefined
            },
            method: "DELETE"
          }
        );
        expect(mockedFetch).toHaveBeenNthCalledWith(
          2,
          "/api/1/admin/album/posts/03e0262f-fcc0-4872-9d12-4c6b87336367",
          {
            headers: {
              Authorization: undefined,
              "Content-Type": "application/json",
              "x-api-key": undefined
            },
            method: "DELETE"
          }
        );
      });
    });
  });
});
