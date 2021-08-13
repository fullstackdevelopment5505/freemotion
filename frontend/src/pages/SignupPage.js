import React from "react";
import Layout from "../components/Layout";
import FirebasePoweredSignupForm from "../components/SignupPage/FormWrapper/FormWrapper";
import styles from "../styles/SignupPage.module.scss";
import BannerImage from "../images/image 27.png";
import Button2 from "../components/UI-Components/Button2/Button2";
import { useHistory } from "react-router-dom";

export const LoginBanner = ({ history }) => (
  <div className={styles.banner__wrapper}>
    <img src={BannerImage} alt={"Login"} />
    <div className={styles.banner__textContent}>
      <h4>Already have an account?</h4>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's
      </p>
      <form onSubmit={() => history.push("/login")}>
        <Button2 content="Login" buttonType={"submit"} />
      </form>
    </div>
  </div>
);

export default function SignupPage() {
  const history = useHistory();

  return (
    <Layout>
      <div className={styles.signup__wrapper}>
        <div className={styles.form__wrapper}>
          <h2>Register Now</h2>
          <FirebasePoweredSignupForm />
        </div>
        <LoginBanner history={history} />
      </div>
    </Layout>
  );
}
