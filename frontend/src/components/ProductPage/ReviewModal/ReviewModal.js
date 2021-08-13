import React, { useState, useEffect, useLayoutEffect } from "react";
import styles from "./ReviewModal.module.scss";
import { withFirebase } from "../../Firebase";
import { ReactSVG } from "react-svg";
import moment from "moment";

// Icons
import EmptyStar from "../../../svgs/empty_review_star.svg";
import FilledStar from "../../../svgs/filled_review_star.svg";
import TimesIcon from "../../../svgs/times.svg";

import Button2 from "../../UI-Components/Button2/Button2";
import Button from "../../UI-Components/Button/Button";

const formatDate = () => {
  let dateInfo = {
    date: "",
    time: "",
  };
  let timezoneOffset = new Date().getTimezoneOffset();
  let date = new Date().toLocaleString();
  let [hour, minutes, seconds] = date.split(",")[1].slice(1, 9).split(":");
  hour = parseInt(hour);
  minutes = parseInt(minutes);
  seconds = parseInt(seconds);
  let x = date.split(",")[1].slice(9);

  // console.log(moment(date.split(",")[0]).format("MMMM d, YYYY"));
  let [day, month, year] = date.split(",")[0].split("/");
  dateInfo.date = `${year}/${month}/${day}`;

  if (x.includes("PM") && parseInt(hour) < 12) hour += 12;

  if (timezoneOffset < 0)
    if (timezoneOffset % 60 == 0) hour = hour + timezoneOffset / 60;
    else {
      let numHours = Math.floor(timezoneOffset / 60);
      hour += numHours;
      let hourRemainder = timezoneOffset % 60;
      minutes += hourRemainder;
    }
  else if (timezoneOffset % 60 == 0) hour = hour - timezoneOffset / 60;
  else {
    let numHours = Math.floor(timezoneOffset / 60);
    hour -= numHours;
    let hourRemainder = timezoneOffset % 60;
    minutes -= hourRemainder;
  }

  if (hour < 10) hour = "0" + hour;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  // UTC +0 Converted Time
  dateInfo.time = `${hour}:${minutes}:${seconds}`;

  return dateInfo;
};

const FormWrapper = ({
  rating,
  pros,
  cons,
  reviewContent,
  setPros,
  setCons,
  setRating,
  setReviewContent,
  setShowReviewModal,
  addReview,
  loading,
  setLoading,
}) => {
  useLayoutEffect(() => {
    setLoading((prevState) => !prevState);
  }, []);

  formatDate();
  const createHoverEffect = (iterator) => {
    /* if (!loading)
      setTimeout(() => {
        const elements = document.getElementsByClassName(
          "ReviewModal_stars__3wqC9",
        )[0].children;

        for (let i = 0; i < elements.length; i++)
          if (
            i < iterator &&
            !!elements &&
            !elements[i].children[0].children[0].classList.contains(
              "filled_star",
            )
          )
            if (elements[i].children[0].children[0].children[0])
              elements[i].children[0].children[0].children[0].style.fill =
                "rgba(252, 196, 85, 0.65)";
      }); */
  };

  const endHoverEffect = (iterator) => {
    /* if (!loading)
      setTimeout(() => {
        const elements = document.getElementsByClassName(
          "ReviewModal_stars__3wqC9",
        )[0].children;

        for (let i = 0; i < elements.length; i++)
          if (
            i < iterator &&
            !!elements &&
            !elements[i].children[0].children[0].classList.contains(
              "filled_star",
            )
          )
            if (elements[i].children[0].children[0].children[0])
              elements[i].children[0].children[0].children[0].style.fill =
                "rgb(231, 234, 237)";
      }); */
  };

  return (
    !!loading === false && (
      <div className={styles.form__wrapper}>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.top__wrapper}>
            <div className={styles.stars__wrapper}>
              <span className={styles.label}>Your Overall Rating</span>
              <div
                className={styles.stars}
                onMouseOver={() => createHoverEffect(rating)}
                onMouseLeave={() => endHoverEffect(rating)}>
                {[...Array(rating)].map((_, index) => (
                  <ReactSVG
                    beforeInjection={(svg) => svg.classList.add("filled_star")}
                    src={FilledStar}
                    key={index}
                    onClick={() => setRating(index)}
                  />
                ))}
                {[...Array(5 - rating)].map((_, index) => (
                  <ReactSVG
                    src={EmptyStar}
                    key={index}
                    onClick={() => setRating(rating + index + 1)}
                    onMouseOver={() => createHoverEffect(rating + index + 1)}
                    onMouseLeave={() => endHoverEffect(rating + index + 1)}
                  />
                ))}
              </div>
            </div>
            <div className={styles.block}>
              <span className={styles.label}>Pros</span>
              <input
                type="text"
                name="pros_input"
                placeholder="Enter Product Pros"
                onChange={(e) => setPros(e.target.value)}
              />
            </div>
            <div className={styles.block}>
              <span className={styles.label}>Pros</span>
              <input
                type="text"
                name="cons_input"
                placeholder="Enter Product Cons"
                onChange={(e) => setCons(e.target.value)}
              />
            </div>
            <div className={styles.block}>
              <span className={styles.label}>Your Review*</span>
              <textarea
                placeholder="Description..."
                onChange={(e) => setReviewContent(e.target.value)}></textarea>
            </div>
          </div>
          <div className={styles.buttons__wrapper}>
            <Button2
              content={"Cancel"}
              handleClick={setShowReviewModal}
              parameter={false}
            />
            <Button content={"Submit Review"} handleClick={addReview} />
          </div>
        </form>
      </div>
    )
  );
};

function ReviewModal({
  firebase,
  setShowReviewModal,
  productId,
  productCategory,
}) {
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");
  const [reviewContent, setReviewContent] = useState("");

  const addReview = async () => {
    // Retrieve Logged User's Id to tack the review creator
    const user = await JSON.parse(localStorage.getItem("authUser"));
    const userId = user.uid;
    let ref = firebase.user(userId);

    const verifiedOrder = await firebase.isVerifiedOrder(
      "JwRgm2jPo7huDBWoDEBjkpwLqA52",
      "SEGWAY ES2 SCOOTER + Extended battery (Used certified) 5",
    );

    let timeInfo = formatDate();

    ref.on("value", (snap) => {
      let usersName = `${snap.val().firstName} ${snap.val().lastName}`;
      firebase.submitReview({
        name: usersName,
        rating,
        pros,
        cons,
        reviewContent,
        productId: productId,
        productCategory: productCategory,
        date: timeInfo.date,
        time: timeInfo.time,
        verifiedOrder: verifiedOrder,
      });
    });
  };

  return (
    <div className={styles.overshadow}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h5>Write A Review</h5>
          <ReactSVG src={TimesIcon} onClick={() => setShowReviewModal(false)} />
        </div>
        <FormWrapper
          rating={rating}
          pros={pros}
          cons={cons}
          reviewContent={reviewContent}
          setRating={setRating}
          setPros={setPros}
          setCons={setCons}
          setReviewContent={setReviewContent}
          setShowReviewModal={setShowReviewModal}
          addReview={addReview}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
}

ReviewModal = withFirebase(ReviewModal);

export default ReviewModal;
