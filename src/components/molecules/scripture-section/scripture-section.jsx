import { Button } from "atoms";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./scripture-section.module.scss";

class ScriptureSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scripture: ""
    };
  }

  async componentDidMount() {
    const { address } = this.props;
    const result = await fetch(
      `https://bible-api.com/${encodeURIComponent(address)}?translation=kjv`,
      {
        method: "GET"
      }
    )
      .then(response => response.json())
      .catch(error => {
        console.error(error);
      });
    const scripture = `<p>${result.text.split("\n").join("<br/>")}</p>`;
    this.setState({ scripture });
  }

  render() {
    const { scripture } = this.state;
    const { address, isModal } = this.props;
    const className = classNames({
      [styles.scriptureSection]: true,
      [styles.brighten]:
        !isModal &&
        typeof window !== `undefined` &&
        window.location.pathname.includes("/album/")
    });
    return (
      <div data-testid="scripture-section" className={className}>
        <div className="row">
          <div className="col-sm-3">
            <Button
              fontIcon="scroll"
              label={address}
              onClick={e => {
                const url = `https://www.biblegateway.com/passage/?search=${address}&version=KJV`;
                window.open(url, "_blank");
              }}
              theme="alt"
            />
          </div>
          <div className="col-sm-9">
            <div dangerouslySetInnerHTML={{ __html: scripture }} />
          </div>
        </div>
      </div>
    );
  }
}
ScriptureSection.propTypes = {
  address: PropTypes.string
};
ScriptureSection.defaultProps = {
  address: ""
};
export default ScriptureSection;
