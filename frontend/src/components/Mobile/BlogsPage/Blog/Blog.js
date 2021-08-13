import React from "react";
import styles from "./Blog.module.scss";

export default function Blog({ blog }) {
  return (
    <div className={styles.container}>
      <div className={styles.thumbnail__wrapper}>
        <div className={styles.readingTime__wrapper}>
          <span>8 min read</span>
        </div>
      </div>
      <div className={styles.content__wrapper}>
        <span>Electric Unicycles</span>
        <h6>Top 5 Best Kingsong Electric unicycles You Can’t Afford to Miss</h6>
      </div>
    </div>
  );
}
