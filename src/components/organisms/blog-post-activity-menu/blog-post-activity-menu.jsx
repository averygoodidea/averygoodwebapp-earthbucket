import { Button, ShareButton } from "atoms";
import { navigate } from "gatsby";
import { ShareMenu } from "molecules";
import moment from "moment";
import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./blog-post-activity-menu.module.scss";

class BlogPostActivityMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShareMenuOpen: false
    };
  }
  onShareButtonClick() {
    const { isShareMenuOpen } = this.state;
    this.setState({ isShareMenuOpen: !isShareMenuOpen });
  }
  render() {
    const { author, date, tags } = this.props;
    const { isShareMenuOpen } = this.state;
    return (
      <div
        data-testid="blog-post-activity-menu"
        className={styles.activityMenu}
      >
        <div className={styles.moreInfo}>
          <p>
            <em>
              by{" "}
              <span data-testid="blog-post-activity-menu-author">{author}</span>
              <br />
              published on{" "}
              <span data-testid="blog-post-activity-menu-date">
                {moment(date).format("MMMM Do YYYY, h:mma")}
              </span>{" "}
              in
            </em>
          </p>
          <div className={styles.tags}>
            {tags.map((tag, i) => (
              <Button
                key={i}
                label={tag}
                onClick={e => {
                  e.preventDefault();
                  navigate(`/b/tag/${tag}`);
                }}
                className={styles.iconButton}
                isIconDisabled={true}
              />
            ))}
          </div>
        </div>
        <div className={styles.shareButton}>
          <ShareButton
            onClick={e => {
              e.preventDefault();
              this.onShareButtonClick();
            }}
          />
          {isShareMenuOpen && <ShareMenu url={document.location} tags={tags} />}
        </div>
      </div>
    );
  }
}
BlogPostActivityMenu.propTypes = {
  author: PropTypes.string,
  tags: PropTypes.array,
  date: PropTypes.string
};
BlogPostActivityMenu.defaultProps = {
  author: "",
  tags: [],
  date: ""
};
export default BlogPostActivityMenu;
