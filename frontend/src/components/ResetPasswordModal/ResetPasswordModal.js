import React, { useState } from "react";
import Button from "../UI-Components/Button/Button";
import styles from "./ResetPasswordModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import RequestSentIcon from "../../svgs/email_sent.svg";
import { ReactSVG } from "react-svg";

import { withFirebase } from "../Firebase/index";

const ResetPasswordModal = ({ firebase, setShowForgotPasswordModal }) => {
  // Check whether or not the user has submitted the email in order to receive an email link to reset password
  const [submittedRequest, setSubmittedRequest] = useState(false);

  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  return (
    <div className={styles.overshadow}>
      <div className={styles.modal__container}>
        <div className={styles.header}>
          <h4>Reset Password</h4>
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => setShowForgotPasswordModal((x) => !x)}
          />
        </div>
        <div className={styles.modal__body}>
          {submittedRequest ? (
            <div className={styles.request__sent}>
              <ReactSVG src={RequestSentIcon} />
              <h3>
                We have sent you a link to change your password to your email
                address.
              </h3>
            </div>
          ) : (
            <React.Fragment>
              <p>
                Enter your email address below, and if an account exists, we’ll
                send you a link to reset your password.
              </p>
              <form
                onSubmit={(e) => {
                  console.log(email);
                  firebase
                    .doPasswordReset(email)
                    .then(() => setEmail(""))
                    .catch((err) => setError(err.message));
                  setSubmittedRequest((x) => !x);
                  e.preventDefault();
                }}>
                <div className={styles.email__wrapper}>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    autoComplete="false"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error && <p>{error}</p>}
                <Button buttonType={"submit"} content={"Reset Password"} />
              </form>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

const FirebaseResetPasswordModal = withFirebase(ResetPasswordModal);

export default FirebaseResetPasswordModal;
