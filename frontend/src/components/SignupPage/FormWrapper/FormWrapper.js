import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { useHistory, withRouter } from "react-router-dom";
import { FirebaseContext } from "../../Firebase/index";

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
import styles from "./FormWrapper.module.scss";
import Button from "../../UI-Components/Button/Button";
import axios from "axios";

const FormWrapper = () => {
  const [affiliateCode, setAffiliateCode] = useState(null);

  const [stateCountry, setCountry] = useState("");
  const [stateRegion, setRegion] = useState("");

  const [signupError, setSignupError] = useState(null);

  const history = useHistory();

  let validationSchema = yup.object().shape({
    firstName: yup.string().required("Required!"),
    lastName: yup.string().required("Required!"),
    email: yup.string().email("Invalid Email Address").required("Required!"),
    country: yup.string().required("Required"),
    streetAddressLine1: yup.string().required("Required"),
    streetAddressLine2: yup.string(),
    city: yup.string().required("Required"),
    state: yup.string().required("Required"),
    zip: yup.string().required("Required"),
    password: yup
      .string()
      .min(8, "Password should be at least 8 characters long!")
      .required("Required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .min(8, "Password should be at least 8 characters long!")
      .required("Required"),
  });

  useEffect(() => {
    const fetchAffiliateData = async () => {
      const url = window.location.href;
      if (url.includes("?ref=")) {
        const code = url.split("?ref=")[1];

        const result = await axios.post("/affiliate/check_affiliate_code", {
          code,
        });

        if (result) setAffiliateCode(code);
      }
    };

    fetchAffiliateData();
  }, []);

  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <Formik
          enableReinitialize
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            streetAddressLine1: "",
            streetAddressLine2: "",
            country: stateCountry,
            region: stateRegion,
            city: "",
            zip: "",
            password: "",
            confirmPassword: "",
          }}
          /* validationSchema={validationSchema} */
          onSubmit={(values) => {
            axios
              .post("/affiliate/generate_affiliate_code")
              .then((res) => {
                const resAffiliateCode = res.data.affiliateCode;
                firebase
                  .doCreateUserWithEmailAndPassword(
                    values.email,
                    values.password,
                  )
                  .then((authUser) => {
                    return (
                      firebase
                        .user(authUser.user.uid)
                        .set({
                          firstName: values.firstName,
                          lastName: values.lastName,
                          email: values.email,
                          isAdmin: "false",
                          affiliateCode: resAffiliateCode,
                          commissionPercentage: 4,
                          address: {
                            streetAddressLine1: values.streetAddressLine1,
                            streetAddressLine2: values.streetAddressLine2,
                            country: values.country,
                            city: values.city,
                            region: values.region,
                            zipCode: values.zip,
                          },
                        })
                        .then(async () => {
                          if (affiliateCode) {
                            try {
                              await axios.post("/affiliate/mark_affiliation", {
                                affiliateUserUid: authUser.user.uid,
                                affiliateCode: affiliateCode,
                              });
                              await axios.post(
                                "/affiliate/validate_affiliate_code",
                                {
                                  code: affiliateCode,
                                },
                              );
                              history.push("/");
                            } catch (err) {
                              console.error({ err });
                            }
                          } else history.push("/");
                        })
                        // Error when the affiliate processes coudln't be fulfilled
                        .catch((err) => console.error({ err }))
                    );
                  })
                  // Error when a user couldn't be created in Firebase
                  .catch((err) => console.error({ err }));
              })
              // Error when a affiliate code couldn't be generated
              .catch((err) => console.error({ err }));
          }}>
          <Form className={styles.signupForm__wrapper}>
            <label htmlFor="firstName">First Name *</label>
            <Field type="text" name="firstName" />
            <ErrorMessage name="firstName" component="div" />
            <label htmlFor="lastName">Last Name *</label>
            <Field type="text" name="lastName" />
            <ErrorMessage name="lastName" component="div" />
            <label htmlFor="email">Email *</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <label htmlFor="rcrs-country">Country *</label>
            <CountryDropdown
              id="rcrs-country"
              value={stateCountry}
              onChange={(val) => setCountry(val)}
            />
            <label htmlFor="streetAddressLine1">Street Address Line 1 *</label>
            <Field type="text" name="streetAddressLine1" />
            <ErrorMessage name="streetAddressLine1" component="div" />
            <label htmlFor="streetAddressLine2">Street Address Line 2</label>
            <Field type="text" name="streetAddressLine2" />
            <ErrorMessage name="streetAddressLine2" component="div" />
            <label htmlFor="city">Town / City *</label>
            <Field type="text" name="city" />
            <ErrorMessage name="city" component="div" />
            <label htmlFor="rcrs-region">State / Region *</label>
            <RegionDropdown
              id="rcrs-region"
              country={stateCountry}
              value={stateRegion}
              onChange={(val) => setRegion(val)}
            />
            <label htmlFor="zip">Postal Code / ZIP *</label>
            <Field type="text" name="zip" />
            <ErrorMessage name="zip" component="div" />
            <label htmlFor="password">Password *</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <Field type="password" name="confirmPassword" />
            <ErrorMessage name="confirmPassword" component="div" />
            <Button content="Create an account" buttonType={"submit"} />
            {signupError && <p>{signupError.message}</p>}
          </Form>
        </Formik>
      )}
    </FirebaseContext.Consumer>
  );
};

const FirebasePoweredSignupForm = withRouter(FormWrapper);

export default FirebasePoweredSignupForm;
