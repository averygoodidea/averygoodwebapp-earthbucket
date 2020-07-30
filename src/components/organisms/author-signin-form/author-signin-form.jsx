import { AVeryGoodAuthenticator } from "assets-js";
import { SubmitButton, Textfield, Toast } from "atoms";
import React, { Component } from "react";
import toastedNotes from "toasted-notes";
import { isEmpty } from "lodash";
import styles from "./author-signin-form.module.scss";

const TOAST_DURATION = 30000; // 30 seconds
class AuthorSignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailInputPlaceholder: "email@domain.com",
      helpMessage: "",
      isEmailInputDisabled: false,
      isSubmitButtonDisabled: true,
      LOADING_STATE: "unloaded"
    };
  }
  onSignIn(e) {
    this.setState(
      {
        LOADING_STATE: "loading",
        isEmailInputDisabled: true,
        isSubmitButtonDisabled: true
      },
      () => {
        let closeNotification;
        toastedNotes.notify(
          ({ onClose }) => {
            closeNotification = onClose;
            return <Toast message="Signing in..." loadingState="loading" />;
          },
          {
            duration: null
          }
        );
        const { sendMagicLink } = AVeryGoodAuthenticator;
        const { email } = this.state;
        sendMagicLink(email)
          .then(data => {
            this.setState({ LOADING_STATE: "loaded" }, () => {
              closeNotification && closeNotification();
              // if resource not found
              // display error
              // reset the email input, signin button
              // else
              // display message user on next steps
              if (data === "resource not found") {
                toastedNotes.notify(
                  <Toast
                    htmlMessage={`<em>${email}</em> is not an Author email.`}
                  />
                );
                const delayFormResetToPreventTooManySubmissions = setTimeout(
                  () => {
                    this.setState({
                      LOADING_STATE: "unloaded",
                      isEmailInputDisabled: false
                    });
                    clearTimeout(delayFormResetToPreventTooManySubmissions);
                  },
                  2000
                );
              } else {
                const message =
                  "<p>Check your email for your magic signin link. <strong>It could a take a few minutes to arrive</strong>. Be sure to check your spam folders!</p>";
                toastedNotes.notify(
                  <Toast htmlMessage={message} fullWidth={true} />,
                  { duration: TOAST_DURATION }
                );
                const delayFormResetToPreventTooManySubmissions = setTimeout(
                  () => {
                    this.setState({ LOADING_STATE: "unloaded" });
                    clearTimeout(delayFormResetToPreventTooManySubmissions);
                  },
                  TOAST_DURATION
                );
              }
            });
          })
          .catch(error => {
            console.error(error);
            this.setState({ LOADING_STATE: "loaded" }, () => {
              closeNotification();
              const message = error.toString();
              toastedNotes.notify(<Toast message={message} />, {
                duration: 3000
              });
              const delayFormResetToPreventTooManySubmissions = setTimeout(
                () => {
                  this.setState({
                    LOADING_STATE: "unloaded",
                    isEmailInputDisabled: false
                  });
                  clearTimeout(delayFormResetToPreventTooManySubmissions);
                },
                3000
              );
            });
          });
      }
    );
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
    return (
      <div data-testid="author-signin-form" className={styles.window}>
        <div className={styles.img} />
        <div className={styles.info}>
          <div className={styles.content}>
            <h2>You know who you are</h2>
            <p>
              ...ye are a chosen generation, a royal priesthood, an holy nation,
              a peculiar people; that ye should shew forth the praises of him
              who hath called you out of darkness into his marvellous light...
            </p>
            <form className={styles.form}>
              <Textfield
                label="Sign in to the Author Area"
                name="email"
                type="email"
                placeholder={emailInputPlaceholder}
                onChange={e => {
                  this.onChange(e.target.value);
                }}
                isDisabled={isEmailInputDisabled}
              />
              <SubmitButton
                value="Sign In"
                onClick={e => {
                  e.preventDefault();
                  this.onSignIn();
                }}
                onKeyPress={e => {
                  e.preventDefault();
                  if (e.key === "Enter") {
                    this.onSignIn();
                  }
                }}
                isDisabled={isSubmitButtonDisabled}
              />
              {!isEmpty(helpMessage) && (
                <div
                  data-testid="author-signin-form-help-message"
                  className={styles.helpMessage}
                  dangerouslySetInnerHTML={{
                    __html: helpMessage
                  }}
                />
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default AuthorSignInForm;
