import React, { useState } from "react";
import styles from "./ReviewSection.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle as farCheckCircle } from "@fortawesome/free-regular-svg-icons";
import EmptyStarIcon from "../../../svgs/empty_star.svg";
import StarIcon from "../../../svgs/full_star.svg";
import Button2 from "../../UI-Components/Button2/Button2";
import moment from "moment";
import { ReactSVG } from "react-svg";

export const ReviewCard = ({
  clientName,
  review,
  date,
  pros,
  cons,
  feedbackContent,
  isVerifiedPurchase,
}) => (
  <div className={styles.reviewCard__wrapper}>
    <div className={styles.nameReview__wrapper}>
      <div className={styles.header}>
        <span>{clientName}</span>
        <span>{date}</span>
      </div>
      <div className={styles.review}>
        <div className={styles.stars__wrapper}>
          {[...Array(review)].map((_, index) => (
            <ReactSVG src={StarIcon} key={index} />
          ))}
          {[...Array(5 - review)].map((_, index) => (
            <ReactSVG src={EmptyStarIcon} key={index} />
          ))}
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
);

export const Reviewbar = ({ index, percentage }) => (
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

export const OverviewCard = ({ reviews }) => {
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

  return !!(reviews && reviews.length) ? (
    <div className={styles.card__wrapper}>
      <div className={styles.wrapper}>
        <div className={styles.overall__review}>
          <h3>{reviews.length} User Reviews</h3>
          <div className={styles.overallRating}>
            <span>{reviewsData.overallRating}</span>
          </div>
          {!!(reviews && reviews.length) ? (
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
          ) : (
            ""
          )}
        </div>
        <div className={styles.starRatings__wrapper}>
          {percentages.reverse().map((percentage, index) => (
            <Reviewbar index={index} percentage={percentage} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default function ReviewSection({ setShowReviewModal, reviews }) {
  const [showMore, setShowMore] = useState(false);
  console.log(reviews);
  return (
    <div className={styles.reviewSection}>
      <OverviewCard reviews={reviews} />
      {reviews.length ? (
        <div className={styles.reviews__container}>
          {showMore
            ? reviews.map((review, index) => (
                <ReviewCard
                  key={index}
                  clientName={review.customerName}
                  review={review.rating}
                  pros={review.pros}
                  date={moment(review.date).format("LL")}
                  cons={review.cons}
                  feedbackContent={review.reviewContent}
                  isVerifiedPurchase={review.verifiedOrder}
                />
              ))
            : reviews
                .slice(0, 3)
                .map((review, index) => (
                  <ReviewCard
                    key={index}
                    clientName={review.customerName}
                    review={review.rating}
                    pros={review.pros}
                    date={moment(review.date).format("LL")}
                    cons={review.cons}
                    feedbackContent={review.reviewContent}
                    isVerifiedPurchase={true}
                  />
                ))}
        </div>
      ) : (
        <h2>No Reviews Available For This Product</h2>
      )}
      <div className={styles.writeReview}>
        <Button2
          content={"Write a review"}
          handleClick={setShowReviewModal}
          parameter={true}
        />
        <span onClick={() => setShowMore((prevState) => !prevState)}>
          {showMore ? "Hide" : "Load more"}
        </span>
      </div>
    </div>
  );
}
