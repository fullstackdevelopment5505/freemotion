import React, { useState, useEffect, useLayoutEffect } from "react";
import styles from "./Shipping.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import { useHistory } from "react-router-dom";
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from "postcode-validator";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import Button from "../../UI-Components/Button/Button";
import { compose } from "redux";
import { withFirebase } from "../../Firebase";
import { updateOrderNotes } from "../../../actions/orderNotesActions";
import { updateShippingAddress } from "../../../actions/shippingAddressActions";
import { updateBillingAddress } from "../../../actions/billingAddressActions";
import CustomCheckbox from "../../UI-Components/CustomCheckbox/CustomCheckbox";

function Shipping({
  userFirstName,
  userLastName,
  userEmail,
  userCity,
  userCountry,
  setUserCountry,
  userRegion,
  setUserRegion,
  userPhoneNumber,
  userZip,
  sameBillingAddress,
  setSameBillingAddress,
  userStreetAddressLine1,
  userStreetAddressLine2,
  handleCheckboxChange,
  setStage,
}) {
  const dispatch = useDispatch();

  const history = useHistory();

  let validationSchema = yup.object().shape({
    // *** Shipping Information Validation *** //
    shippingFirstName: yup
      .string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    shippingLastName: yup
      .string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    shippingCity: yup.string().required("Please enter your city"),
    shippingStreetAddressLine1: yup
      .string()
      .required("Please enter your address"),
    shippingStreetAddressLine2: yup.string(),
    shippingCountry: yup
      .string()
      .required("Please Select A Country From The List"),
    shippingRegion: yup.string().required("Please select your state / region"),
    shippingZip: yup.string().required("Please enter your zip code"),
    shippingPhoneNumber: yup.string(),
    shippingEmail: yup
      .string()
      .email("Please enter a valid email address")
      .required("Required Field"),
    orderDetails: yup.string(),

    // *** Billing Information Validation *** //
    billingFirstName: yup
      .string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    billingLastName: yup
      .string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    billingCity: yup.string().required("Please enter your city"),
    billingStreetAddressLine1: yup
      .string()
      .required("Please enter your address"),
    billingStreetAddressLine2: yup.string(),
    billingCountry: yup
      .string()
      .required("Please Select A Country From The List"),
    billingRegion: yup.string().required("Please select your state / region"),
    billingZip: yup.string().required("Please enter your zip code"),
    billingPhoneNumber: yup.string(),
    billingEmail: yup
      .string()
      .email("Please enter a valid email address")
      .required("Required Field"),
  });

  return (
    <div className={styles.container}>
      <h2>Shipping</h2>
      <div className={styles.form__wrapper}>
        <Formik
          enableReinitialize
          initialValues={{
            // *** Initialize Shipping Information Fields Values *** //
            shippingFirstName: userFirstName,
            shippingLastName: userLastName,
            shippingCountry: userCountry,
            shippingStreetAddressLine1: userStreetAddressLine1,
            shippingStreetAddressLine2: userStreetAddressLine2,
            shippingCity: userCity,
            shippingRegion: userRegion,
            shippingZip: userZip,
            shippingPhoneNumber: userPhoneNumber,
            shippingEmail: userEmail,

            // *** Initialize Miscellanous Fields Values *** //
            orderDetails: "",
            sameBillingInfo: true,

            // *** Initialize Billing Information Fields Values *** //
            billingFirstName: userFirstName,
            billingLastName: userLastName,
            billingCountry: userCountry,
            billingStreetAddressLine1: userStreetAddressLine1,
            billingStreetAddressLine2: userStreetAddressLine2,
            billingCity: userCity,
            billingRegion: userRegion,
            billingZip: userZip,
            billingPhoneNumber: userPhoneNumber,
            billingEmail: userEmail,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitted }) => {
            console.log(JSON.stringify(values, null, 2));
            dispatch(
              updateShippingAddress({
                shippingFirstName: values.shippingFirstName,
                shippingLastName: values.shippingLastName,
                shippingCity: values.shippingCity,
                shippingStreetAddressLine1: values.shippingStreetAddressLine1,
                shippingStreetAddressLine2: values.shippingStreetAddressLine2,
                shippingCountry: values.shippingCountry,
                shippingRegion: values.shippingRegion,
                shippingZip: values.shippingZip,
                shippingPhoneNumber: values.shippingPhoneNumber,
                shippingEmail: values.shippingEmail,
              }),
            );
            dispatch(
              updateBillingAddress({
                billingFirstName: values.billingFirstName,
                billingLastName: values.billingLastName,
                billingCity: values.billingCity,
                billingStreetAddressLine1: values.billingStreetAddressLine1,
                billingStreetAddressLine2: values.billingStreetAddressLine2,
                billingCountry: values.billingCountry,
                billingRegion: values.billingRegion,
                billingZip: values.billingZip,
                billingPhoneNumber: values.billingPhoneNumber,
                billingEmail: values.billingEmail,
              }),
            );
            dispatch(updateOrderNotes(""));
            setStage(2);
            history.push("/checkout/2");
          }}>
          <Form className={styles.signupForm__wrapper}>
            <div className={styles.shipping__information__container}>
              <div className={styles.top__row}>
                <div>
                  <label htmlFor="shippingFirstName">First Name *</label>
                  <Field
                    type="text"
                    name="shippingFirstName"
                    placeholder="Enter First Name"
                  />
                  <ErrorMessage name="shippingFirstName" component="div" />
                </div>
                <div>
                  <label htmlFor="shippingLastName">Last Name *</label>
                  <Field
                    type="text"
                    name="shippingLastName"
                    placeholder="Enter Last Name"
                  />
                  <ErrorMessage name="shippingLastName" component="div" />
                </div>
                <div>
                  <label htmlFor="shippingCity">Town / City *</label>
                  <Field
                    type="text"
                    name="shippingCity"
                    placeholder="Enter City"
                  />
                  <ErrorMessage name="shippingCity" component="div" />
                </div>
                <div>
                  <label htmlFor="shippingStreetAddressLine1">
                    Street Address Line 1*
                  </label>
                  <Field
                    type="text"
                    name="shippingStreetAddressLine1"
                    placeholder="Enter Street Address Line 1"
                  />
                  <ErrorMessage
                    name="shippingStreetAddressLine1"
                    component="div"
                  />
                </div>
                <div>
                  <label htmlFor="shippingStreetAddressLine2">
                    Street Address Line 2
                  </label>
                  <Field
                    type="text"
                    name="shippingStreetAddressLine2"
                    placeholder="Enter Street Address Line 2"
                  />
                  <ErrorMessage
                    name="shippingStreetAddressLine2"
                    component="div"
                  />
                </div>
              </div>
              <div className={styles.middle__row}>
                <div>
                  <label htmlFor="shippingCountry">Country *</label>
                  <CountryDropdown
                    name="shippingCountry"
                    value={userCountry}
                    onChange={(val) => setUserCountry(val)}
                  />
                </div>
                <div>
                  <label htmlFor="shippingRegion">State / Region *</label>
                  <RegionDropdown
                    name="shippingRegion"
                    country={userCountry}
                    value={userRegion}
                    onChange={(val) => setUserRegion(val)}
                  />
                </div>
                <div>
                  <label htmlFor="shippingZip">Postal Code / ZIP *</label>
                  <Field
                    type="text"
                    name="shippingZip"
                    placeholder="Enter ZIP Code"
                  />
                  <ErrorMessage name="shippingZip" component="div" />
                </div>
              </div>
              <div className={styles.bottom__row}>
                <div>
                  <label htmlFor="shippingEmail">Email *</label>
                  <Field
                    type="email"
                    name="shippingEmail"
                    placeholder="Enter Email Address"
                  />
                  <ErrorMessage name="shippingEmail" component="div" />
                </div>
                <div>
                  <label htmlFor="shippingPhoneNumber">Phone Number *</label>
                  <Field
                    type="text"
                    name="shippingPhoneNumber"
                    placeholder="E.g. (123) 4567-7890"
                  />
                  <ErrorMessage name="shippingPhoneNumber" component="div" />
                </div>
              </div>
              <div className={styles.orderNotes__container}>
                <label htmlFor="orderDetails">Order Notes (optional)</label>
                <Field
                  type="textarea"
                  name="orderDetails"
                  component="textarea"
                  placeholder="Enter your order notes here..."
                  onChange={(e) => dispatch(updateOrderNotes(e.target.value))}
                />
                <ErrorMessage name="orderDetails" component="div" />
              </div>
              <div className={styles.sameBillingInfo__wrapper}>
                <CustomCheckbox
                  inputName={"sameBillingAddress"}
                  checked={sameBillingAddress}
                  setChecked={setSameBillingAddress}
                />
                <label htmlFor="sameBillingInfo">
                  My billing and shipping information are the same.
                </label>
              </div>
            </div>
            {sameBillingAddress === false && (
              <div className={styles.billing__information__container}>
                <div className={styles.top__row}>
                  <div>
                    <label htmlFor="billingFirstName">First Name *</label>
                    <Field
                      type="text"
                      name="billingFirstName"
                      placeholder="Enter First Name"
                    />
                    <ErrorMessage name="billingFirstName" component="div" />
                  </div>
                  <div>
                    <label htmlFor="billingLastName">Last Name *</label>
                    <Field
                      type="text"
                      name="billingLastName"
                      placeholder="Enter Last Name"
                    />
                    <ErrorMessage name="billingLastName" component="div" />
                  </div>
                  <div>
                    <label htmlFor="billingCity">Town / City *</label>
                    <Field
                      type="text"
                      name="billingCity"
                      placeholder="Enter City"
                    />
                    <ErrorMessage name="billingCity" component="div" />
                  </div>
                  <div>
                    <label htmlFor="billingStreetAddressLine1">
                      Street Address Line 1*
                    </label>
                    <Field
                      type="text"
                      name="billingStreetAddressLine1"
                      placeholder="Enter Street Address Line 1"
                    />
                    <ErrorMessage
                      name="billingStreetAddressLine1"
                      component="div"
                    />
                  </div>
                  <div>
                    <label htmlFor="billingStreetAddressLine2">
                      Street Address Line 2
                    </label>
                    <Field
                      type="text"
                      name="billingStreetAddressLine2"
                      placeholder="Enter Street Address Line 2"
                    />
                    <ErrorMessage
                      name="billingStreetAddressLine2"
                      component="div"
                    />
                  </div>
                </div>
                <div className={styles.middle__row}>
                  <div>
                    <label htmlFor="billingCountry">Country *</label>
                    <CountryDropdown
                      name="billingCountry"
                      value={userCountry}
                      onChange={(val) => setUserCountry(val)}
                    />
                  </div>
                  <div>
                    <label htmlFor="billingRegion">State / Region *</label>
                    <RegionDropdown
                      name="billingRegion"
                      country={userCountry}
                      value={userRegion}
                      onChange={(val) => setUserRegion(val)}
                    />
                  </div>
                  <div>
                    <label htmlFor="billingZip">Postal Code / ZIP *</label>
                    <Field
                      type="text"
                      name="billingZip"
                      placeholder="Enter ZIP Code"
                    />
                    <ErrorMessage name="billingZip" component="div" />
                  </div>
                </div>
                <div className={styles.bottom__row}>
                  <div>
                    <label htmlFor="billingEmail">Email *</label>
                    <Field
                      type="email"
                      name="billingEmail"
                      placeholder="Enter Email Address"
                    />
                    <ErrorMessage name="billingEmail" component="div" />
                  </div>
                  <div>
                    <label htmlFor="billingPhoneNumber">Phone Number *</label>
                    <Field
                      type="text"
                      name="billingPhoneNumber"
                      placeholder="E.g. (123) 4567-7890"
                    />
                    <ErrorMessage name="billingPhoneNumber" component="div" />
                  </div>
                </div>
              </div>
            )}
            <Button
              content={"Continue to payment"}
              buttonType="submit"
              handleClick={() => {
                history.push("/checkout/2");
              }}
            />
          </Form>
        </Formik>
      </div>
    </div>
  );
}

const FirebasePoweredShipping = compose(withFirebase)(Shipping);

export default FirebasePoweredShipping;
