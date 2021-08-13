import React, { useState, useEffect } from "react";
import styles from "./GenerateLink.module.scss";
import CopyIcon from "../../../../svgs/copy.svg";
import { ReactSVG } from "react-svg";
import MailIcon from "../../../../svgs/copy_mail.svg";
import FacebookIcon from "../../../../svgs/copy_facebook.svg";
import Button from "../../../UI-Components/Button/Button";

export default function GenerateLink({ loading, setLoading }) {
  const [inputValue, setInputValue] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setInputValue("");
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className={styles.container}>
      <h3>Generate Link</h3>
      <div className={styles.wrappers__container}>
        <div className={styles.affiliateId__wrapper}>
          <h6>Your Affiliate ID</h6>
          <span>11742</span>
        </div>
        <div className={styles.refferalUrl__wrapper}>
          <h6>Your Refferal URL</h6>
          <div className={styles.url__wrapper}>
            <span>https://freemotionshop.com?ref=11742</span>
            <ReactSVG src={CopyIcon} />
          </div>
          <div className={styles.shareOptions__wrapper}>
            <ReactSVG src={MailIcon} />
            <ReactSVG src={FacebookIcon} />
          </div>
        </div>
      </div>
      <div className={styles.mobileAffiliateInfo}>
        <div className={styles.top}>
          <span>Your Affiliate ID</span>
          <span>11742</span>
        </div>
        <div className={styles.middle}>
          <span>Your Referral URL</span>
          <div className={styles.url__placeholder}>
            <span>https://freemotionshop.com?ref=11742</span>
            <ReactSVG src={CopyIcon} />
          </div>
          <div className={styles.icons__wrapper}>
            <ReactSVG src={FacebookIcon} />
            <ReactSVG src={MailIcon} />
          </div>
        </div>
      </div>
      <div className={styles.urlGenerator__wrapper}>
        <p>
          Enter any URL from this site into the form below to generate your
          referral link to that page{" "}
        </p>
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <label htmlFor="pageUrl">Page URL</label>
          <input
            type="pageUrl"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <Button content={"Generate"} />
        </form>
      </div>
    </div>
  );
}
