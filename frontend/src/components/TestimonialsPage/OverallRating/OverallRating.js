import React from "react";
import styles from "./OverallRating.module.scss";
import BackgroundImage from "../../../images/image 1 (1).jpg";
import EmptyStarIcon from "../../../svgs/empty_star.svg";
import StarIcon from "../../../svgs/full_star.svg";
import { ReactSVG } from "react-svg";

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
    <span>{percentage}%</span>
  </div>
);

export default function OverallRating({ reviews }) {
  let reviewsData = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    overallRating: null,
  };
  let sumReviews = 0;
  for (let i = 0; i < reviews.length; i++) {
    sumReviews += reviews[i].rating;
    reviewsData[reviews[i].rating]++;
  }
  reviewsData.overallRating = (sumReviews / reviews.length).toFixed(1);
  const percentages = [75, 10, 10, 5, 0];
  percentages.forEach((_, index) => {
    percentages[index] = Math.round10(
      ((reviewsData[index + 1] * 100) / reviews.length).toFixed(0),
      -1,
    );
  });

  return (
    <div className={styles.rating__container}>
      <img src={BackgroundImage} alt="User Reviews" />
      <div className={styles.card__wrapper}>
        <h3>{reviews.length} User Reviews</h3>
        <div className={styles.overall__review}>
          <div className={styles.overallRating}>
            <span>{reviewsData.overallRating}</span>
          </div>
          <div className={styles.overallRating__stars}>
            {[...Array(Math.round(reviewsData.overallRating))].map(
              (_, index) => (
                <ReactSVG src={StarIcon} key={index} />
              ),
            )}
            {[...Array(5 - Math.round(reviewsData.overallRating))].map(
              (_, index) => (
                <ReactSVG src={EmptyStarIcon} key={index} />
              ),
            )}
          </div>
        </div>
        <div className={styles.starRatings__wrapper}>
          {percentages.reverse().map((percentage, index) => (
            <Reviewbar index={index} percentage={percentage} />
          ))}
        </div>
      </div>
    </div>
  );
}
