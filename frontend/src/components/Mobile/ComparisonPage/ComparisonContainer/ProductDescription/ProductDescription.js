import React from "react";
import styles from "./ProductDescription.module.scss";

export default function ProductDescription({ productDescription, specs }) {
  return (
    <div className={styles.container}>
      <div className={styles.description__wrapper}>
        <span>Description</span>
        <p>{productDescription}</p>
      </div>
      <div className={styles.specs__wrapper}>
        {specs[0][1].map((spec, index) => (
          <React.Fragment key={index}>
            <span className={styles.specName}>{spec.name}</span>
            <div className={styles.spec}>
              <span>{spec.property ?? "-"}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
