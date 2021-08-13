import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./FormWrapper.module.scss";
import * as yup from "yup";
import Button from "../../UI-Components/Button/Button";

import { useHistory, withRouter } from "react-router-dom";
import { FirebaseContext, withFirebase } from "../../Firebase/index";
import { compose } from "recompose";

import FacebookLogo from "../../../svgs/facebook1.svg";
import GoogleLogo from "../../../svgs/google.svg";

import { ReactSVG } from "react-svg";

const SignInGoogleBase = ({ firebase }) => {
  const history = useHistory();
  const [error, setError] = useState(null);

  const onSubmit = (e) => {
    firebase
      .doSignInWithGoogle()
      .then((socialAuthUser) => {
        return firebase.user(socialAuthUser.user.uid).set({
          email: socialAuthUser.user.email,
          firstName: socialAuthUser.user.firstName,
          lastName: socialAuthUser.user.lastName,
        });
      })
      .then(() => {
        setError(null);
        history.push("/");
      })
      .catch((err) => setError(err.message));

    e.preventDefault();
  };

  return (
    <form className={styles.google__form} onSubmit={(e) => onSubmit(e)}>
      <button type="submit">
        <ReactSVG src={GoogleLogo} />
        <span>Sign In With Google</span>
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

const SignInFacebookBase = ({ firebase }) => {
  const history = useHistory();
  const [error, setError] = useState(null);

  const onSubmit = (e) => {
    firebase
      .doSignInWithFacebook()
      .then((socialAuthUser) => {
        return firebase.user(socialAuthUser.user.uid).set({
          email: socialAuthUser.additionalUserInfo.profile.email,
          firstName: socialAuthUser.additionalUserInfo.profile.firstName,
          lastName: socialAuthUser.additionalUserInfo.profile.lastName,
        });
      })
      .then(() => {
        setError(null);
        history.push("/");
      })
      .catch((err) => setError(err.message));

    e.preventDefault();
  };

  return (
    <form className={styles.facebook__form} onSubmit={(e) => onSubmit(e)}>
      <button type="submit">
        <ReactSVG src={FacebookLogo} />
        <span>Sign In With Facebook</span>
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

const SignInGoogle = compose(withRouter, withFirebase)(SignInGoogleBase);

const SignInFacebook = compose(withRouter, withFirebase)(SignInFacebookBase);

const FormWrapper = ({ setShowForgotPasswordModal }) => {
  const history = useHistory();
  const [loginError, setLoginError] = useState(null);

  let validationSchema = yup.object().shape({
    email: yup.string().email("Invalid Email Address").required("Required!"),
    password: yup
      .string()
      .min(8, "Password should be at least 8 characters long!"),
  });

  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            firebase
              .doSignInWithEmailAndPassword(values.email, values.password)
              .then(() => history.push("/"))
              .catch((err) => setLoginError({ err }));
          }}>
          <React.Fragment>
            <Form className={styles.loginForm__wrapper}>
              <label htmlFor="email">Email Address</label>
              <Field type="text" name="email" />
              <ErrorMessage name="email" component="div" />
              <div className={styles.passwordLabel__wrapper}>
                <label htmlFor="password">Password</label>
                <span
                  onClick={() =>
                    setShowForgotPasswordModal((prevState) => !prevState)
                  }>
                  Forgot your password?
                </span>
              </div>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
              <div className={styles.rememberMe__wrapper}>
                <Field type="checkbox" name="remember" />
                <label htmlFor="remember">Remember Me</label>
              </div>
              <Button content={"Log In"} buttonType={"submit"} />
              {loginError && <p>{loginError.message}</p>}
            </Form>
            <SignInGoogle />
            <SignInFacebook />
          </React.Fragment>
        </Formik>
      )}
    </FirebaseContext.Consumer>
  );
};

const FirebasePoweredLoginForm = withRouter(FormWrapper);

export default FirebasePoweredLoginForm;
