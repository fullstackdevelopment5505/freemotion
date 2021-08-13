import React, { useState } from "react";
import styles from "./SupportInfoForm.module.scss";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneAlt,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../UI-Components/Button/Button";
import Button2 from "../../../UI-Components/Button2/Button2";
import { withFirebase } from "../../../Firebase";
import RequestSentIcon from "../../../../svgs/email_sent.svg";
import { ReactSVG } from "react-svg";

const MessageSent = () => (
  <div className={styles.request__sent}>
    <ReactSVG src={RequestSentIcon} />
    <h3>Your message has been successfully sent!</h3>
  </div>
);

function Textarea({ fieldName, placeholder }) {
  const [field, meta, helpers] = useField(fieldName);

  return (
    <textarea
      name={fieldName}
      value={meta.value}
      onChange={field.onChange}
      placeholder={placeholder}></textarea>
  );
}

function SupportInfoForm({ firebase }) {
  let validationSchema = yup.object().shape({
    name: yup.string(),
    email: yup.string().email("Invalid Email Address").required("Required!"),
    subject: yup.string(),
    message: yup.string(),
  });

  const [submittedRequest, setSubmittedRequest] = useState(false);

  return (
    <div className={styles.container}>
      {submittedRequest ? (
        <MessageSent />
      ) : (
        <div className={styles.form__wrapper}>
          <h5>
            Please fill in the form below to get in touch with our support team
          </h5>
          <Formik
            initialValues={{
              name: "",
              email: "",
              subject: "",
              message: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              setSubmittedRequest((x) => !x);
              firebase.submitSupportRequest({
                name: values.name,
                email: values.email,
                subject: values.subject,
                message: values.message,
              });
            }}>
            <Form className={styles.signupForm__wrapper}>
              <label htmlFor="name">Your Name *</label>
              <Field
                type="text"
                name="name"
                placeholder="Enter your name here"
              />
              <ErrorMessage name="name" component="div" />
              <label htmlFor="email">Your Email *</label>
              <Field
                type="email"
                name="email"
                placeholder="Enter your email here"
              />
              <ErrorMessage name="email" component="div" />
              <label htmlFor="subject">Subject</label>
              <Field
                type="text"
                name="subject"
                placeholder="Enter the subject here"
              />
              <ErrorMessage name="subject" component="div" />
              <label htmlFor="message">Your Message</label>
              <Textarea
                fieldName="message"
                placeholder="Enter your message here"
              />
              <ErrorMessage name="message" component="div" />
              <div className={styles.buttons__wrapper}>
                <Button2 content={"Reset Form"} buttonType={"reset"} />
                <Button content={"Submit"} buttonType={"submit"} />
              </div>
            </Form>
          </Formik>
        </div>
      )}

      <div className={styles.contactDetails__wrapper}>
        <h5>Or use our contact details</h5>
        <ul>
          <li>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <div className={styles.location}>
              <span>San Diego, California, USA</span>
              <span>Montreal, QC, Canada</span>
            </div>
          </li>
          <li>
            <FontAwesomeIcon icon={faPhoneAlt} />
            <span>(626) 295-6599</span>
            <span>(514) 922-7332</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faEnvelope} />
            <span>info@freemotion.com </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

SupportInfoForm = withFirebase(SupportInfoForm);

export default SupportInfoForm;
