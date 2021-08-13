import React from "react";
import styles from "./ReviewPopup.module.scss";
import EmptyStarIcon from "../../../../svgs/empty_star.svg";
import StarIcon from "../../../../svgs/full_star.svg";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactSVG } from "react-svg";
import { useHistory } from "react-router-dom";

function decimalAdjust(type, value, exp) {
  // If the exp is undefined or zero...
  if (typeof exp === "undefined" || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  value = value.toString().split("e");
  value = Math[type](+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp)));
  // Shift back
  value = value.toString().split("e");
  return +(value[0] + "e" + (value[1] ? +value[1] + exp : exp));
}

Math.round10 = function (value, exp) {
  return decimalAdjust("round", value, exp);
};

const Reviewbar = ({ index, percentage }) => (
  <div className={styles.starRating}>
    <span>{5 - index}</span>
    <ReactSVG src={StarIcon} key={index} />
    <div className={styles.reviewBar}>
      <div
        className={styles.progress}
        style={{
          width: `${percentage}%`,
        }}
      />
    </div>
    <span style={{ textAlign: "right" }}>{percentage}%</span>
  </div>
);

export default function ReviewPopup({
  reviewsData,
  rating,
  numReviews,
  setShowReviewDataModal,
  productId,
}) {
  const history = useHistory();

  let percentages = [0, 0, 0, 0, 0];
  console.log(reviewsData[1 + 1]);
  console.log(numReviews);

  percentages.forEach((_, index) => {
    percentages[index] = Math.round10(
      ((reviewsData[index + 1] * 100) / numReviews).toFixed(0),
      -1,
    );
  });

  return (
    <div
      className={styles.container}
      onMouseLeave={() => setShowReviewDataModal(false)}>
      <div className={styles.header}>
        <div className={styles.top}>
          <div className={styles.overallRating__stars}>
            {[...Array(Math.round(rating))].map((_, index) => (
              <ReactSVG src={StarIcon} key={index} />
            ))}
            {[...Array(5 - Math.round(rating))].map((_, index) => (
              <ReactSVG src={EmptyStarIcon} key={index} />
            ))}
          </div>
          <span>{rating} out of 5</span>
        </div>
        <p>{numReviews} global ratings</p>
      </div>
      <div className={styles.starRatings__wrapper}>
        {percentages.reverse().map((percentage, index) => (
          <Reviewbar index={index} percentage={percentage} />
        ))}
      </div>
      <div className={styles.footer}>
        <div
          className={styles.wrapper}
          onClick={() => history.push(`products/${productId}`)}>
          <span>See all customer reviews</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
    </div>
  );
}
