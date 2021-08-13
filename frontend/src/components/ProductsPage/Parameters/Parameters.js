import React from "react";
import styles from "./Parameters.module.scss";

export default function Parameters({ parameters }) {
  return (
    <div className={styles.parameters__wrapper}>
      {parameters.map((parameter, index) => (
        <div key={index} className={styles.parameter__wrapper}>
          <div className={styles.name}>{parameter.name}</div>
          <div className={styles.description}>{parameter.description}</div>
        </div>
      ))}
    </div>
  );
}
