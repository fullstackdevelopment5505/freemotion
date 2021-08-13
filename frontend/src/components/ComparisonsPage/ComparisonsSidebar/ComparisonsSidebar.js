import React from "react";
import styles from "./ComparisonsSidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Switch from "../../UI-Components/Switch/Switch";

export default function ComparisonsSidebar({ setShowModal }) {
  const specs = [
    "Model",
    "Color",
    "Wheel Size",
    "Max Speed",
    "Max Range",
    "Battery",
    "Motor Type",
    "Weight",
    "Max Climb Angle",
    "Max Load",
  ];

  return (
    <div className={styles.sidebar__container}>
      <div className={styles.comparison__options}>
        <div className={styles.addToCompare__wrapper}>
          <div>
            <FontAwesomeIcon icon={faPlus} onClick={() => setShowModal(true)} />
          </div>
          <span>Add To Compare</span>
        </div>
        <div className={styles.onlyShowDifferences__wrapper}>
          <Switch />
          <span>Only show differences</span>
        </div>
      </div>
      <span className={styles.keyFeatures}>Key Features</span>
      <div className={styles.wrapper}>
        <span className={styles.description}>Description</span>
        <div className={styles.specsTags__wrapper}>
          {specs.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
