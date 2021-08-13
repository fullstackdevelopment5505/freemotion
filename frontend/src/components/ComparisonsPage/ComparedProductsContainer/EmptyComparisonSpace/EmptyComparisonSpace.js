import React from "react";
import { ReactSVG } from "react-svg";
import styles from "./EmptyComparisonSpace.module.scss";
import ScaleIcon from "../../../../svgs/scale.svg";

export default function EmptyComparisonSpace({ setShowModal }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div
          className={styles.addProduct__button}
          onClick={() => setShowModal(true)}>
          <ReactSVG src={ScaleIcon} />
          <span>Select Product For Comparison</span>
        </div>
      </div>
      <div className={styles.emptySpecs__wrapper}>
        {[...Array(11)].map((_, index) => (
          <div key={index} className={styles.spec}></div>
        ))}
      </div>
    </div>
  );
}
