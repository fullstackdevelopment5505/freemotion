import React, { useState, useEffect } from "react";
import styles from "./FormContainer.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import * as yup from "yup";
import Button from "../../UI-Components/Button/Button";
import Button2 from "../../UI-Components/Button2/Button2";
import { withFirebase } from "../../Firebase";
import { v4 as uuid } from "uuid";

function FormContainer({ firebase, loading, setLoading }) {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [userRegion, setUserRegion] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
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
    region: yup.string().required("Please select your state / region"),
    zip: yup.string().required("Please enter your zip code"),
    productModel: yup.string(),
    pricePaid: yup.number(),
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

  const submitWarrantyForm = () => {
    // Create a new firebase document using the uuid id
    // And use the date submitted in the form in order to
    // create a new database warranty registration form
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
        phoneNumber: userPhoneNumber,
        email: userEmail,
        productModel: "",
        pricePaid: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // Submit the data to the database
        firebase.submitWarrantyRequest({
          clientFirstName: values.firstName,
          clientLastName: values.lastName,
          clientAdress:
            values.streetAddressLine1 + " " + values.streetAddressLine2,
          clientCity: values.city,
          clientRegion: values.region,
          clientCountry: values.country,
          clientEmail: values.email,
          clientPhoneNumber: values.phoneNumber
            ? values.phoneNumber
            : "No Phone Provided",
          clientZipCode: values.zip,
          productModel: values.productModel
            ? values.productModel
            : "No Product Model Provided",
          productPricePaid: values.pricePaid
            ? values.pricePaid
            : "No Price Paid Provided",
        });
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
          <label htmlFor="country">Country *</label>
          <CountryDropdown
            name="country"
            value={userCountry}
            onChange={(val) => setUserCountry(val)}
          />
        </div>
        <div>
          <label htmlFor="region">State / Region *</label>
          <RegionDropdown
            name="region"
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
        <div>
          <label htmlFor="productModel">Purchased Product Model *</label>
          <Field
            type="text"
            name="productModel"
            placeholder="Enter Product Model"
          />
          <ErrorMessage name="productModel" component="div" />
        </div>
        <div>
          <label htmlFor="pricePaid">Price Paid *</label>
          <Field type="text" name="pricePaid" placeholder="Enter Price Paid" />
          <ErrorMessage name="pricePaid" component="div" />
        </div>
        <div className={styles.options__wrapper}>
          <div className={styles.wrapper}>
            <input type="checkbox" />
            <label>My billing and shipping information are the same.</label>
          </div>
          <div className={styles.buttons__wrapper}>
            <Button2 buttonType={"reset"} content={"Reset Form"} />
            <Button buttonType={"submit"} content={"Submit"} />
          </div>
        </div>
      </Form>
    </Formik>
  );
}

FormContainer = withFirebase(FormContainer);

export default FormContainer;
