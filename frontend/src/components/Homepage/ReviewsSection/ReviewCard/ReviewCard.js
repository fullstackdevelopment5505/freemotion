import React from "react";
import styles from "./ReviewCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle as farCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import EmptyStarIcon from "../../../../svgs/empty_star.svg";
import StarIcon from "../../../../svgs/full_star.svg";
import { ReactSVG } from "react-svg";

export default function ReviewCard({
  productName,
  clientName,
  review,
  date,
  pros,
  cons,
  feedbackContent,
  productImage,
  isVerifiedPurchase,
}) {
  return (
    <div className={styles.reviewCard__wrapper}>
      <div className={styles.header}>
        <div className={styles.image__wrapper}>
          <LazyLoadImage src={productImage} alt={productName} />
        </div>
        <h4>{productName}</h4>
      </div>
      <div className={styles.content__wrapper}>
        <div className={styles.nameReview__wrapper}>
          <p>{clientName}</p>
          <div className={styles.review}>
            <div className={styles.stars__wrapper}>
              {[...Array(Math.round(review))].map((_, index) => (
                <ReactSVG src={StarIcon} key={index} />
              ))}
              {[...Array(5 - Math.round(review))].map((_, index) => (
                <ReactSVG src={EmptyStarIcon} key={index} />
              ))}
            </div>
            <div className={styles.date}>
              <FontAwesomeIcon icon={faCircle} />
              <span>{date}</span>
            </div>
          </div>
        </div>
        <div className={styles.prosCons__wrapper}>
          <div className={styles.pros}>
            <span>Pros:</span>
            <span>{pros}</span>
          </div>
          <div className={styles.cons}>
            <span>Cons:</span>
            <span>{cons}</span>
          </div>
        </div>
        <p className={styles.reviewContent}>{feedbackContent}</p>
        <div className={styles.isVerified}>
          {isVerifiedPurchase ? (
            <React.Fragment>
              <FontAwesomeIcon icon={farCheckCircle} />
              <span>Verified Purchase</span>
            </React.Fragment>
          ) : null}
        </div>
      </div>
    </div>
  );
}
