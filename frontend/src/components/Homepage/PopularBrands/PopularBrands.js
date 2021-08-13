import React from "react";
import styles from "./PopularBrands.module.scss";
import BannerImage from "../../../images/Rectangle 935.png";
import { ReactSVG } from "react-svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import Brand1 from "../../../svgs/Brand1.svg";
import Brand2 from "../../../svgs/Brand2.svg";
import Brand3 from "../../../svgs/Brand3.svg";
import Brand4 from "../../../svgs/Brand4.svg";
import Brand5 from "../../../svgs/Brand5.svg";
import Brand6 from "../../../svgs/Brand6.svg";

export default function PopularBrands() {
  return (
    <div className={styles.popularBrands__container}>
      <img src={BannerImage} alt="Popular Brands" />
      <div className={styles.content__wrapper}>
        <div className={styles.header}>
          <h3>Popular Brands</h3>
          <div className={styles.controller}>
            <button>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
        <div className={styles.brands__wrapper}>
          <ReactSVG src={Brand1} />
          <ReactSVG src={Brand2} />
          <ReactSVG src={Brand3} />
          <ReactSVG src={Brand4} />
          <ReactSVG src={Brand5} />
          <ReactSVG src={Brand6} />
        </div>
      </div>
    </div>
  );
}
