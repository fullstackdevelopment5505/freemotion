import React from "react";
import styles from "./ProductCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faStar } from "@fortawesome/free-solid-svg-icons";
import {
  faStar as farStar,
  faHeart as farHeart,
} from "@fortawesome/free-regular-svg-icons";

export default function ProductCard({
  name,
  review,
  oldPrice,
  newPrice,
  image,
}) {
  return (
    <div className={styles.productCard__wrapper}>
      <div className={styles.image__wrapper}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.textContent__wrapper}>
        <div className={styles.header}>
          <div className={styles.review__wrapper}>
            <span>5/{review}</span>
            <div className={styles.reviewStars}>
              {[...Array(review)].map((_, index) => (
                <FontAwesomeIcon key={index} icon={faStar} />
              ))}
              {[...Array(5 - review)].map((_, index) => (
                <FontAwesomeIcon key={index} icon={farStar} />
              ))}
            </div>
          </div>
          <h2>{name}</h2>
        </div>
        <div className={styles.footer}>
          <div className={styles.price__wrapper}>
            {oldPrice ? (
              <div className={styles.oldPrice__wrapper}>
                <span>${oldPrice}.00</span>
                <div className={styles.diagonal__price__line} />
              </div>
            ) : null}
            <span>${newPrice}.00</span>
          </div>
          <div className={styles.purchase__wrapper}>
            <FontAwesomeIcon icon={farHeart} />
            <div className={styles.wrapper}>
              <span>Buy now</span>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
