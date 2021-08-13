import React from "react";
import styles from "./CategoriesShowcase.module.scss";
import UnyciclesImg from "../../../images/e-Unicycles 2.png";
import SkateboardImg from "../../../images/e-Skateboards 1.png";
import ScooterImg1 from "../../../images/e-scooter 1.png";
import ScooterImg2 from "../../../images/scooter2 1.png";
import ExtrasImg from "../../../images/Accessories 1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useHistory } from "react-router-dom";
import { addFilter } from "../../../actions/filtersActions";
import { useDispatch } from "react-redux";

export default function CategoriesShowcase() {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className={styles.showcase__container}>
      <div
        className={styles.main__block}
        onClick={() => {
          dispatch(addFilter("category", "Electric Unicycles"));
          history.push("/products");
        }}>
        <div className={styles.wrapper}>
          <h3>Exclusive Range of Electric Unicycles</h3>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <LazyLoadImage src={UnyciclesImg} alt="Unicycles" />
      </div>
      <div className={styles.right__block}>
        <div
          className={styles.top__block}
          onClick={() => {
            dispatch(addFilter("category", "Electric Scooters"));
            history.push("/products");
          }}>
          <h3>Electric Scooters</h3>
          <LazyLoadImage src={ScooterImg2} alt="Scooters" />
          <LazyLoadImage src={ScooterImg1} alt="Scooters" />
        </div>
        <div className={styles.bottom__row}>
          <div
            className={styles.block}
            onClick={() => {
              dispatch(addFilter("category", "Electric Skateboards"));
              history.push("/products");
            }}>
            <h3>Electric Skateboard</h3>
            <LazyLoadImage src={SkateboardImg} alt="Skateboards" />
          </div>
          <div
            className={styles.block}
            onClick={() => {
              dispatch(addFilter("category", "Extras"));
              history.push("/products");
            }}>
            <h3>Extras</h3>
            <LazyLoadImage src={ExtrasImg} alt="Extras" />
          </div>
        </div>
      </div>
    </div>
  );
}
