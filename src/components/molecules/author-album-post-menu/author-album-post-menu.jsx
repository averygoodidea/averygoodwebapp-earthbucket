import { Button, PlusButton } from "atoms";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styles from "./author-album-post-menu.module.scss";

const sortByDate = (a, b) => {
  let result = 0;
  if (a.createdAt < b.createdAt) {
    result = 1;
  } else if (a.createdAt > b.createdAt) {
    result = -1;
  }
  return result;
};
const sortAlphabetically = (a, b) => {
  let result = 0;
  const aTitle = a.title.toLowerCase();
  const bTitle = b.title.toLowerCase();
  if (aTitle > bTitle) {
    result = 1;
  } else if (aTitle < bTitle) {
    result = -1;
  }
  return result;
};
const AuthorAlbumPostMenu = ({
  albumPosts,
  onPlusButtonClick,
  selectedItem
}) => {
  const [posts, setPosts] = useState(albumPosts);
  const [sortedBy, setSortedBy] = useState("most-recent");
  return (
    <div
      data-testid="author-album-post-menu"
      className={styles.authorAlbumPostsMenu}
    >
      <div className={styles.plusButton}>
        <PlusButton onClick={e => onPlusButtonClick()} />
      </div>
      <div className={styles.sortBy}>
        <Button
          cn={sortedBy === "most-recent" ? styles.tabbed : ""}
          isIconDisabled={true}
          label="Sort by Most Recent"
          onClick={() => {
            //sorted by date, reverse chronological
            setPosts([].concat(posts.sort(sortByDate)));
            setSortedBy("most-recent");
          }}
        />
        <Button
          cn={sortedBy === "alphabetically" ? styles.tabbed : ""}
          isIconDisabled={true}
          label="Sort by Title"
          onClick={() => {
            setPosts([].concat(posts.sort(sortAlphabetically)));
            setSortedBy("alphabetically");
          }}
        />
      </div>
      <ul>
        {posts.map((item, i) => {
          const className = classNames({
            [styles.tabbed]: selectedItem.id === item.id
          });
          return (
            <li key={i} className={className}>
              <div className={styles.ordinal}>{i + 1}</div>
              <Button
                isIconDisabled={true}
                key={i}
                label={item.title}
                onClick={e => item.onClick(item)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
AuthorAlbumPostMenu.propTypes = {
  albumPosts: PropTypes.array,
  onPlusButtonClick: PropTypes.func,
  selectedItem: PropTypes.object
};

AuthorAlbumPostMenu.defaultProps = {
  albumPosts: [],
  onPlusButtonClick: () => {},
  selectedItem: {}
};
export default AuthorAlbumPostMenu;
