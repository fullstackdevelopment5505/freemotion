import React from "react";
import styles from "./HeaderController.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

export default function HeaderController({
  header,
  handlePrev,
  handleNext,
  items,
}) {
  return (
    <div className={styles.header}>
      <h3>{header}</h3>
      <div className={styles.controller}>
        <button onClick={() => handlePrev()}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button onClick={() => handleNext(items)}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}
