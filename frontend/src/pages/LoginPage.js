import React, { useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/LoginPage.module.scss";
import FormWrapper from "../components/LoginPage/FormWrapper/FormWrapper";
import BannerImage from "../images/image 27 v2.png";
import Button2 from "../components/UI-Components/Button2/Button2";
import { default as ResetPasswordModal } from "../components/ResetPasswordModal/ResetPasswordModal";
import { useHistory } from "react-router-dom";

const SignupBanner = ({ history }) => (
  <div className={styles.banner__wrapper}>
    <img src={BannerImage} alt={"Login"} />
    <div className={styles.banner__textContent}>
      <h4>Register Now</h4>
      <p>
        Create an account to benefit from our exclusive services and keep up to
        date with our latest publications.
      </p>
      <form onSubmit={() => history.push("/signup")}>
        <Button2 content={"Sign Up"} buttonType={"submit"} />
      </form>
    </div>
  </div>
);

export default function LoginPage() {
  const history = useHistory();
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  return (
    <Layout>
      <div className={styles.login__wrapper}>
        <div className={styles.form__wrapper}>
          <h2>Log In</h2>
          <FormWrapper
            setShowForgotPasswordModal={setShowForgotPasswordModal}
          />
        </div>
        <SignupBanner history={history} />
      </div>
      {showForgotPasswordModal && (
        <ResetPasswordModal
          setShowForgotPasswordModal={setShowForgotPasswordModal}
        />
      )}
    </Layout>
  );
}
