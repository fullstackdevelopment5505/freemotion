import React from "react";
import styles from "./CarouselDots.module.scss";
import Dot from "../../../svgs/dot.svg";
import ActiveDot from "../../../svgs/ActiveDot.svg";
import { ReactSVG } from "react-svg";

// Integrate A System Similar To Pagination
export default function CarouselDots({ numItems, currentItem }) {
  return (
    <div className={styles.container}>
      {[...Array(numItems)].map((_, index) =>
        index === currentItem ? (
          <ReactSVG key={index} src={ActiveDot} />
        ) : (
          <ReactSVG key={index} src={Dot} />
        ),
      )}
    </div>
  );
}
