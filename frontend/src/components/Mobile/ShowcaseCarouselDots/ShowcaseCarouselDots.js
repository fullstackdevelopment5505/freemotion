import React from "react";
import styles from "./ShowcaseCarouselDots.module.scss";
import Dot from "../../../svgs/TransparentDot.svg";
import ActiveDot from "../../../svgs/ActiveWhiteDot.svg";
import { ReactSVG } from "react-svg";

// Integrate A System Similar To Pagination
export default function ShowcaseCarouselDots({ numItems, currentItem }) {
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
