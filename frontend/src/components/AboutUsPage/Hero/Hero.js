import React from "react";
import styles from "./Hero.module.scss";
import Image from "../../../images/image 2.jpg";

export default function Hero() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h2>Who we are</h2>
          <p>
            FreeMotion is an online shopping venue delivering the latest
            electric mobility products. Since 2014, FreeMotion has been a highly
            trusted vendor of 21st century mobility solutions that do not
            contribute to the pollution of our earth. We supply all types of
            accessories to service all of our transportation solutions.
          </p>
          <p>
            Powered by our dream of being part of the revolution in urban and
            suburban mobility, FreeMotion delivers top branded, smart electric
            mobility devices to enthusiastic & technology-savvy customers
            worldwide. We have a wide range of cutting-edge electric mobility
            solutions ranging from electronic hoverboards, electric unicycles,
            electric scooters, to electric skateboards. All are electric
            powered; very clean, and all bring a sense of fun and adventure to
            your travels or commute. To add to the revolution, FreeMotion is
            determined to keep our prices affordable and within the reach of
            most consumers.
          </p>
        </div>
        <div className={styles.image__wrapper}>
          <img src={Image} alt="About Us Image" />
        </div>
      </div>
    </div>
  );
}
