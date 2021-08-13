import React from "react";
import styles from "./FloatingController.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

export default function FloatingController({
  prevProduct,
  nextProduct,
  products,
}) {
  return (
    <div className={styles.container}>
      <button onClick={() => prevProduct()}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button onClick={() => nextProduct(products)}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
}
