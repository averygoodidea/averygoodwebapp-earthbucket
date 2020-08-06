import { LocalStorageList } from "assets-js";
import { Button, DislikeButton, LikeButton, ShareButton, Toast } from "atoms";
import { ShareMenu } from "molecules";
import moment from "moment";
import PropTypes from "prop-types";
import React, { Component } from "react";
import toastedNotes from "toasted-notes";
import { isEmpty } from "lodash";
import styles from "./album-post-activity-menu.module.scss";

const TOAST_DURATION = 1000; // 1 second
class AlbumPostActivityMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasBeenCollected: false,
      isShareMenuOpen: false
    };
  }
  componentDidMount() {
    const { alternative_id } = this.props.item;
    const postIds = LocalStorageList.getPostIds();
    if (!isEmpty(postIds)) {
      this.setState({ hasBeenCollected: postIds.includes(alternative_id) });
    } else {
      LocalStorageList.init();
    }
  }
  addToList() {
    const {
      item: { alternative_id, title },
      onAlbumPostEvent
    } = this.props;
    const postIds = LocalStorageList.getPostIds().filter(
      postId => !isEmpty(postId)
    );
    if (!postIds.includes(alternative_id)) {
      LocalStorageList.addPostId(alternative_id);
      this.setState({ hasBeenCollected: true }, () => {
        toastedNotes.notify(
          <Toast
            htmlMessage={`<p><strong>Added</strong> <em>${title}</em> to Your Favorites List</p>`}
            fontIcon="like"
            to={"/features/list/"}
          />,
          { duration: TOAST_DURATION }
        );
        onAlbumPostEvent({
          type: "LIKED",
          createdAt: moment().unix()
        });
      });
    }
  }
  removeFromList() {
    const {
      item: { alternative_id, title },
      onAlbumPostEvent
    } = this.props;
    const postIds = LocalStorageList.getPostIds().filter(
      postId => !isEmpty(postId)
    );
    if (postIds.includes(alternative_id)) {
      LocalStorageList.removePostId(alternative_id);
      this.setState({ hasBeenCollected: false }, () => {
        toastedNotes.notify(
          <Toast
            htmlMessage={`<p><strong>Removed</strong> <em>${title}</em> from Your Favorites List</p>`}
            fontIcon="dislike"
            to={"/features/list/"}
          />,
          { duration: TOAST_DURATION }
        );
        onAlbumPostEvent({
          type: "DISLIKED",
          createdAt: moment().unix()
        });
      });
    }
  }
  openMoreInfoUrl() {
    const { moreInfoUrl } = this.props;
    window.open(moreInfoUrl, "_blank");
  }
  onShareButtonClick() {
    const { isShareMenuOpen } = this.state;
    requestAnimationFrame(() => {
      this.setState({ isShareMenuOpen: !isShareMenuOpen });
    });
  }
  render() {
    const { hasBeenCollected, isShareMenuOpen } = this.state;
    return (
      <div
        data-testid="album-post-activity-menu"
        className={styles.activityMenu}
      >
        <div className={styles.plusButton}>
          {!hasBeenCollected && (
            <LikeButton
              onClick={e => {
                e.preventDefault();
                this.addToList();
              }}
            />
          )}
          {hasBeenCollected && (
            <DislikeButton
              onClick={e => {
                e.preventDefault();
                this.removeFromList();
              }}
            />
          )}
        </div>
        <div className={styles.shareButton}>
          <ShareButton
            onClick={e => {
              e.preventDefault();
              this.onShareButtonClick();
            }}
          />
          {isShareMenuOpen && (
            <ShareMenu url={document.location} cn={styles.shareMenu} />
          )}
        </div>
        <div className={styles.moreInfo}>
          <Button
            label="More Info"
            fontIcon="price-tag"
            theme="alt"
            onClick={e => {
              this.openMoreInfoUrl();
            }}
            onKeyPress={e => {
              if (e.keyCode === 13) {
                this.openMoreInfoUrl();
              }
            }}
          />
        </div>
      </div>
    );
  }
}
AlbumPostActivityMenu.propTypes = {
  item: PropTypes.object,
  moreInfoUrl: PropTypes.string,
  onAlbumPostEvent: PropTypes.func
};
AlbumPostActivityMenu.defaultProps = {
  onAlbumPostEvent: () => {}
};
export default AlbumPostActivityMenu;
