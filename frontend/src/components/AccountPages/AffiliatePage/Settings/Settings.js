import React, { useState, useEffect } from "react";
import styles from "./Settings.module.scss";

import InfoIcon from "../../../../svgs/info.svg";
import { ReactSVG } from "react-svg";
import Button from "../../../UI-Components/Button/Button";

export default function Settings({ loading, setLoading }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [newCommissionNotif, setNewCommissionNotif] = useState(false);
  const [paidCommissionNotif, setPaidCommissionNotif] = useState(false);

  const validateEmail = (email) => {
    let isValid = true,
      error = null;
    const emailPattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    );

    if (email.length !== 0) {
      if (!emailPattern.test(email)) {
        isValid = false;
        error = "Please enter a valid email address.";
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmail(email);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className={styles.container}>
      <h3>Settings</h3>
      <div className={styles.form__wrapper}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="email">
            <span>Payment Email</span>
            <ReactSVG src={InfoIcon} />
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className={styles.checkbox__wrapper}>
            <input
              name="newCommission"
              type="checkbox"
              onChange={(e) => console.log(e.target.checked)}
            />
            <label htmlFor="newCommission">
              <span>Notify on new commissions</span>
              <ReactSVG src={InfoIcon} />
            </label>
          </div>
          <div className={styles.checkbox__wrapper}>
            <input
              name="paidCommission"
              type="checkbox"
              onChange={(e) => console.log(e.target.checked)}
            />
            <label htmlFor="paidCommission">
              <span>Notify on new commissions</span>
              <ReactSVG src={InfoIcon} />
            </label>
          </div>
          <Button content={"Submit"} />
        </form>
      </div>
    </div>
  );
}
