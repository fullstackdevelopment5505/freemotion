import React from "react";
import styles from "./NewsletterBanner.module.scss";
import BannerImage from "../../../../images/newsletter2.png";
import Button2 from "../../../UI-Components/Button2/Button2";

export default function NewsletterBanner() {
  return (
    <div className={styles.container}>
      <img src={BannerImage} alt="Subscribe For News" />
      <div className={styles.newsletter__wrapper}>
        <h3>Subscribe for news</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been
        </p>
        <input type="email" name="email" placeholder="Enter your email" />
        <Button2 content="Subscribe" />
      </div>
    </div>
  );
}
