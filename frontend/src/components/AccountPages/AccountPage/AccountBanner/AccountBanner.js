import React, { useState, useEffect } from "react";
import styles from "./AccountBanner.module.scss";
import BannerImage from "../../../../images/account_banner_image.jpg";
import { renderCurrencyLocale } from "../../../../helpers/renderCurrency";

export default function AccountBanner({ firebase }) {
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState(null);

  useEffect(() => {
    const fetchUserDisplayName = async (firebase) => {
      let localUserUid = JSON.parse(localStorage.getItem("authUser")).uid;
      await firebase
        .user(localUserUid)
        .once("value")
        .then((snapshot) => {
          setFirstName(snapshot.val().firstName);
        });
      setLoading(false);
    };

    fetchUserDisplayName(firebase);
  }, []);

  return (
    <div className={styles.container}>
      <img src={BannerImage} alt="Account Info Overview" />
      <div className={styles.content__wrapper}>
        <h3>Hello, {firstName}</h3>
        <div className={styles.footer__wrapper}>
          <div className={styles.top}>
            <div className={styles.top__div}>
              <span>Balance</span>
              <span>As of 2/9/2021</span>
            </div>
            <div className={styles.top__div}>
              <span>Visitors</span>
              <span>As of 2/9/2021</span>
            </div>
          </div>
          <div className={styles.bottom}>
            <span>{renderCurrencyLocale(1000)}</span>
            <span>25</span>
          </div>
        </div>
      </div>
    </div>
  );
}
