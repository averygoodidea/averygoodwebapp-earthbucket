import { AVeryGoodAuthenticator } from "assets-js";
import { SubmitButton, Textfield } from "atoms";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { isEmpty } from "lodash";
import styles from "./email-form.module.scss";

class EmailForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      emailInputPlaceholder: "email@domain.com",
      helpMessage: "",
      isEmailInputDisabled: false,
      isSubmitButtonDisabled: true,
      LOADING_STATE: "unloaded"
    };
  }
  onChange(email) {
    const { utils } = AVeryGoodAuthenticator;
    if (utils.isValidEmailFormat(email)) {
      this.setState({
        email,
        isSubmitButtonDisabled: false,
        helpMessage: ""
      });
    } else {
      const { emailInputPlaceholder } = this.state;
      this.setState({
        isSubmitButtonDisabled: true,
        helpMessage: `<p>Please type a valid email address ( <strong>${emailInputPlaceholder}</strong> )</p>`
      });
    }
  }
  render() {
    const {
      emailInputPlaceholder,
      helpMessage,
      isEmailInputDisabled,
      isSubmitButtonDisabled
    } = this.state;
    const { isModal } = this.props;
    const className = classNames({
      [styles.emailForm]: true,
      [styles.brighten]:
        !isModal &&
        typeof window !== `undefined` &&
        window.location.pathname.includes("/album/")
    });
    return (
      <div className={className}>
        <div className={styles.message}>
          <p>
            Join{" "}
            <strong>
              <em>A Very Good Newsletter</em>
            </strong>
            , my email list where I let you know when different articles drop.
            <br />
            <span className={styles.signature}>
              <i className="font-icon-avery-signature" />
            </span>
          </p>
        </div>
        <form
          data-testid="email-form"
          _lpchecked="1"
          action={`https://tinyletter.com/${process.env.GATSBY_TINYLETTER_USERNAME}`}
          className={styles.form}
          method="post"
          target="popupwindow"
        >
          <Textfield
            label="submit email for newsletter"
            name="email"
            type="text"
            placeholder={emailInputPlaceholder}
            onChange={e => {
              this.onChange(e.target.value);
            }}
            isDisabled={isEmailInputDisabled}
            showLabel={false}
          />
          <input id="email" type="hidden" value="1" name="embed" />
          <SubmitButton
            value="Submit"
            theme="default"
            isDisabled={isSubmitButtonDisabled}
          />
          <div className={styles.buttonBackground} />
          {!isEmpty(helpMessage) && (
            <div
              className={styles.helpMessage}
              dangerouslySetInnerHTML={{
                __html: helpMessage
              }}
            />
          )}
        </form>
      </div>
    );
  }
}
EmailForm.propTypes = {
  isModal: PropTypes.bool
};
EmailForm.defaultProps = {
  isModal: false
};
export default EmailForm;
