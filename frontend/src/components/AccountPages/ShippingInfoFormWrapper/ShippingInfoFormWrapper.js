import React, { useState } from "react";
import { FirebaseContext } from "../../Firebase";
import ShippingInfoForm from "./ShippingInfoForm/ShippingInfoForm";
import styles from "./ShippingInfoFormWrapper.module.scss";

export default function ShippingInfoFormWrapper() {
  const [loading, setLoading] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h5>Shipping Information</h5>
        <p>Please fill in the fields below</p>
      </div>
      <FirebaseContext.Consumer>
        {(firebase) => (
          <ShippingInfoForm
            firebase={firebase}
            loading={loading}
            setLoading={setLoading}
          />
        )}
      </FirebaseContext.Consumer>
    </div>
  );
}
