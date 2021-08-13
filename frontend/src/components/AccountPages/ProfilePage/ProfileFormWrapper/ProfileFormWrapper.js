import React, { useState, useEffect } from "react";
import styles from "./ProfileFormWrapper.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from "postcode-validator";
import * as yup from "yup";
import Button from "../../../UI-Components/Button/Button";
import Button2 from "../../../UI-Components/Button2/Button2";

export default function ProfileFormWrapper({ loading, firebase, setLoading }) {
  const [userFirstName, setUserFirstName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  let validationSchema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().email("Invalid Email Address"),
    newPassword: yup
      .string()
      .min(8, "Password should be at least 8 characters long!"),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .min(8, "Password should be at least 8 characters long!"),
  });

  useEffect(() => {
    const fetchUserDisplayName = async (firebase) => {
      const user = JSON.parse(localStorage.getItem("authUser"));
      if (user) {
        let localUserUid = user.uid;
        await firebase
          .user(localUserUid)
          .once("value")
          .then((snapshot) => {
            setUserFirstName(snapshot.val().firstName);
            setUserLastName(snapshot.val().lastName);
            setUserEmail(snapshot.val().email);
          })
          .then(() => setLoading(false));
      }
    };

    fetchUserDisplayName(firebase);
  }, []);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <Formik
      enableReinitialize
      initialValues={{
        firstName: userFirstName,
        lastName: userLastName,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        email: userEmail,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}>
      <Form className={styles.profileForm__wrapper}>
        <div>
          <label htmlFor="firstName">First Name *</label>
          <Field type="text" name="firstName" placeholder="Enter First Name" />
          <ErrorMessage name="firstName" component="div" />
        </div>
        <div>
          <label htmlFor="currentPassword">Current Password</label>
          <Field type="password" name="currentPassword" value="password" />
        </div>
        <div>
          <label htmlFor="lastName">Last Name *</label>
          <Field type="text" name="lastName" placeholder="Enter Last Name" />
          <ErrorMessage name="lastName" component="div" />
        </div>
        <div>
          <label htmlFor="newPassword">New Password *</label>
          <Field
            type="password"
            name="newPassword"
            placeholder="Enter New Password"
          />
          <ErrorMessage name="newPassword" component="div" />
        </div>
        <div>
          <label htmlFor="email">Email Address *</label>
          <Field type="text" name="email" placeholder="Enter Email Address" />
          <ErrorMessage name="email" component="div" />
        </div>
        <div>
          <label htmlFor="confirmNewPassword">Confirm New Password *</label>
          <Field
            type="password"
            name="confirmNewPassword"
            placeholder="Enter New Password"
          />
          <ErrorMessage name="confirmNewPassword" component="div" />
        </div>
        <div className={styles.buttons__wrapper}>
          <Button2 content={"Cancel"} />
          <Button content={"Save Changes"} />
        </div>
      </Form>
    </Formik>
  );
}
