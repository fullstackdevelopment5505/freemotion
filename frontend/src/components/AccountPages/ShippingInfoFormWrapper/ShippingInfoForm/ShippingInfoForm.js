import React, { useState, useEffect } from "react";
import styles from "./ShippingInfoForm.module.scss";
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
import { compose } from "redux";

const phoneUtil = require("google-libphonenumber").PhoneNumberUtil.getInstance();

var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

export default function ShippingInfoForm({ firebase, loading, setLoading }) {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [userRegion, setUserRegion] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userStreetAddress, setUserStreetAddress] = useState("");
  const [userAddressLine1, setUserAddressLine1] = useState("");
  const [userAddressLine2, setUserAddressLine2] = useState("");
  const [userZip, setUserZip] = useState("");
  const [userAddressName, setUserAddressName] = useState("");

  let validationSchema = yup.object().shape({
    firstName: yup
      .string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: yup
      .string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    phoneNumber: yup.string(),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Required Field"),
    country: yup.string().required("Please Select A Country From The List"),
    streetAddressLine1: yup.string().required("Please enter your address"),
    streetAddressLine2: yup.string(),
    city: yup.string().required("Please enter your city"),
    state: yup.string().required("Please select your state / region"),
    zip: yup.string().required("Please enter your zip code"),
    addressName: yup.string(),
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
            setUserCity(snapshot.val().address?.city);
            setUserPhoneNumber(snapshot.val()?.phoneNumber);
            setUserCountry(snapshot.val().address?.country);
            setUserRegion(snapshot.val().address?.region);
            setUserAddressLine1(snapshot.val().address?.streetAddressLine2);
            setUserAddressLine2(snapshot.val().address?.streetAddressLine2);
            setUserZip(snapshot.val().address?.zipCode);
            setUserAddressName(snapshot.val().address?.addressName);
          })
          .then(() => setLoading(false));
      }
    };

    // console.log(validateZipCode(userCountry, "efsfdsagsdfh d125ft25da"));

    // console.log(validatePhoneNumber("0756516223", userCountry));

    fetchUserDisplayName(firebase);
  }, []);

  // Validate Form Zip Code
  const validateZipCode = (country, zipCode) => {
    let error;
    const countryCode = countries.getAlpha3Code(country, "en");
    if (postcodeValidatorExistsForCountry(countryCode?.toUpperCase())) {
      if (!postcodeValidator(zipCode, countryCode?.toUpperCase()))
        error = "Please enter a valid zip code";
    } else {
      if (!postcodeValidator(zipCode, "INTL"))
        error = "Please enter a valid zip code";
    }
    return error;
  };

  // Validate Provided Phone Number
  const validatePhoneNumber = (phoneNumber, country) => {
    let countryCode = countries.getAlpha3Code(country, "en"),
      error;
    countryCode = countryCode.substring(0, 2);
    if (
      !phoneUtil.isValidNumberForRegion(
        phoneUtil.parse(phoneNumber, countryCode),
        countryCode,
      )
    )
      error = "Please enter a valid phone number";
    return error;
  };

  return loading ? (
    <p>Loading...</p>
  ) : (
    <Formik
      enableReinitialize
      initialValues={{
        firstName: userFirstName,
        lastName: userLastName,
        country: userCountry,
        streetAddressLine1: userAddressLine1,
        streetAddressLine2: userAddressLine2,
        city: userCity,
        region: userRegion,
        zip: userZip,
        phone: userPhoneNumber,
        email: userEmail,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // Submit the data to the database
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}>
      <Form className={styles.shippingInfo__wrapper}>
        <div>
          <label htmlFor="firstName">First Name *</label>
          <Field type="text" name="firstName" placeholder="Enter First Name" />
          <ErrorMessage name="firstName" component="div" />
        </div>
        <div>
          <label htmlFor="lastName">Last Name *</label>
          <Field type="text" name="lastName" placeholder="Enter Last Name" />
          <ErrorMessage name="lastName" component="div" />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number *</label>
          <Field
            type="text"
            name="phoneNumber"
            placeholder="E.g. (123) 4567-7890"
          />
          <ErrorMessage name="phoneNumber" component="div" />
        </div>
        <div>
          <label htmlFor="email">Email Address *</label>
          <Field type="text" name="email" placeholder="Enter Email Address" />
          <ErrorMessage name="email" component="div" />
        </div>
        <div>
          <label htmlFor="rcrs-country">Country *</label>
          <CountryDropdown
            value={userCountry}
            onChange={(val) => setUserCountry(val)}
          />
        </div>
        <div>
          <label htmlFor="rcrs-region">State / Region *</label>
          <RegionDropdown
            country={userCountry}
            value={userRegion}
            onChange={(val) => setUserRegion(val)}
          />
        </div>
        <div>
          <label htmlFor="streetAddressLine1">Street Address Line 1 *</label>
          <Field
            type="text"
            name="streetAddressLine1"
            placeholder="Enter Street Address Line 1"
          />
          <ErrorMessage name="streetAddressLine1" component="div" />
        </div>
        <div>
          <label htmlFor="streetAddressLine2">Street Address Line 2</label>
          <Field
            type="text"
            name="streetAddressLine2"
            placeholder="Enter Street Address Line 2"
          />
          <ErrorMessage name="streetAddressLine2" component="div" />
        </div>
        <div>
          <label htmlFor="city">Town / City *</label>
          <Field type="text" name="city" placeholder="Enter Town / City" />
          <ErrorMessage name="city" component="div" />
        </div>

        <div>
          <label htmlFor="zip">Postal Code / ZIP *</label>
          <Field type="text" name="zip" placeholder="Enter Postcode / ZIP" />
          <ErrorMessage name="zip" component="div" />
        </div>
        <div className={styles.options__wrapper}>
          <div className={styles.wrapper}>
            <Field type="checkbox" name="sameAdress" />
            <label htmlFor="sameAddress">
              My billing and shipping information are the same.
            </label>
          </div>
          <div className={styles.buttons__wrapper}>
            <Button2 content={"Cancel"} />
            <Button content={"Save Changes"} />
          </div>
        </div>
      </Form>
    </Formik>
  );
}
