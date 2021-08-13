import React from "react";
import styles from "./Banner.module.scss";

import BannerImage from "../../../images/affiliate_banner.jpg";
import Button from "../../UI-Components/Button/Button";

export default function Banner() {
  return (
    <div className={styles.banner__container}>
      <img src={BannerImage} alt="Freemotion Affiliate Program" />
      <div className={styles.banner__textContent}>
        <div className={styles.wrapper}>
          <h2>Freemotion Affiliate Program</h2>
          <p>Get commissions each time you refer a new customer</p>
          <Button content={"Apply Now"} />
        </div>
      </div>
    </div>
  );
}
