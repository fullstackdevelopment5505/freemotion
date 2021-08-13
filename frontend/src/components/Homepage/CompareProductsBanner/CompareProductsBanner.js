import React from "react";
import styles from "./CompareProductsBanner.module.scss";
import BannerImg from "../../../images/image 18.png";
import { useHistory } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function CompareProductsBanner() {
  const history = useHistory();

  return (
    <div className={styles.banner__container}>
      <LazyLoadImage src={BannerImg} alt={"Compare Products"} />
      <div className={styles.textContent__wrapper}>
        <h2>Compare Products</h2>
        <button onClick={() => history.push("/compare")}>Get Started</button>
      </div>
    </div>
  );
}
