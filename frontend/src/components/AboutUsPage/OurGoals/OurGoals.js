import React from "react";
import styles from "./OurGoals.module.scss";
import BannerImage from "../../../images/image 1.jpg";

export default function OurGoals() {
  return (
    <div className={styles.container}>
      <img src={BannerImage} alt="Our Goals" />
      <div className={styles.content__container}>
        <div className={styles.wrapper}>
          <h3>Our Goals</h3>
          <p>
            FreeMotion aims at becoming a leading e-commerce portal for 21st
            century mobility. We are well on our way towards this goal and we
            intend to remain here at the top. FreeMotion wants to become the
            first choice of its customers for all electric mobility products and
            accessories. FreeMotion is your destination to assure a smooth
            purchase, fast delivery, and real support of high-quality mobility
            products at reasonable prices. Let us not forget, all our products
            are certified by and abide by the North America Safety Standards.
            FreeMotion should be first in mindshare when anyone is thinking
            about high quality electric personal transportation with long term
            durability and excellent end-to-end customer service and support.
          </p>
          <p>
            Start exploring the unseen, visit more of your world, find your
            FREEDOM, and make your journey count with FreeMotion’s latest
            Eco-friendly mobility solutions and world class service and support.
          </p>
        </div>
      </div>
    </div>
  );
}
