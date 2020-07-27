import { AVeryGoodNarrowcaster } from "assets-js";
import { Button } from "atoms";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { isEmpty } from "lodash";
import styles from "./share-menu.module.scss";

const ShareMenu = ({ cn, url, tags }) => {
  let hashTags = "";
  if (!isEmpty(tags)) {
    hashTags = tags.map(tag => `#${tag}`).join(" ");
  }
  const menuData = [
    {
      fontIcon: "envelope",
      label: "Email",
      service: "email",
      message: `Hey,\n\ncheck this out: ${url}`
    },
    {
      fontIcon: "textsms",
      label: "SMS",
      service: "sms",
      message: `Hey, check this out ${url}`
    },
    {
      fontIcon: "twitter",
      label: "Twitter",
      service: "twitter",
      message: `Check this out: ${url} ${hashTags}`
    },
    {
      fontIcon: "whatsapp",
      label: "Whatsapp",
      service: "whatsapp",
      message: `Hey check this out: ${url} ${hashTags}`
    },
    {
      fontIcon: "pinterest",
      label: "Pinterest",
      service: "pinterest",
      message: `check out ${process.env.GATSBY_EARTHBUCKET_HOSTNAME} ${hashTags}`
    },
    {
      fontIcon: "facebook",
      label: "Facebook",
      service: "facebook",
      message: `Hey check this out: ${url} ${hashTags}`
    }
  ];
  const buttons = menuData.map(({ fontIcon, label, service, message }, i) => (
    <li data-testid={`share-menu-button-${service}`} key={i}>
      <Button
        fontIcon={fontIcon}
        label={""}
        onClick={e => {
          e.preventDefault();
          AVeryGoodNarrowcaster.share(service, url, message);
        }}
      />
    </li>
  ));

  const className = classNames({
    [styles.shareMenu]: true,
    [cn]: !isEmpty(cn)
  });

  return (
    <div data-testid="share-menu" className={className}>
      <ul>{buttons}</ul>
    </div>
  );
};

ShareMenu.propTypes = {
  tags: PropTypes.array
};

ShareMenu.defaultProps = {
  tags: []
};

export default ShareMenu;
