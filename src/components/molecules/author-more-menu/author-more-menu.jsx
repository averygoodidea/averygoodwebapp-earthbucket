import { Button, MoreButton } from "atoms";
import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./author-more-menu.module.scss";

class AuthorMoreMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  onClick() {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }
  render() {
    const { isOpen } = this.state;
    const { items } = this.props;
    return (
      <div data-testid="author-more-menu" className={styles.authorMoreMenu}>
        <div className={styles.moreButton}>
          <MoreButton
            onClick={e => {
              e.preventDefault();
              this.onClick();
            }}
          />
        </div>
        {isOpen && (
          <ul>
            {items.map((item, i) => (
              <li key={i}>
                <Button
                  key={i}
                  label={item.title}
                  fontIcon={item.fontIcon}
                  onClick={e => {
                    e.preventDefault();
                    item.onClick();
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
AuthorMoreMenu.propTypes = {
  items: PropTypes.array
};

AuthorMoreMenu.defaultProps = {
  items: []
};
export default AuthorMoreMenu;
