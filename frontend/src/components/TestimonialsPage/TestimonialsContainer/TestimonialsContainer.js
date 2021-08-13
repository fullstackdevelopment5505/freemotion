import React, { useRef, useState } from "react";
import Testimonial from "./Testimonial/Testimonial";
import styles from "./TestimonialsContainer.module.scss";
import ProductImage from "../../../images/veteran-sherman-3200-4-238x238 4 (1).png";
import moment from "moment";
import Button2 from "../../UI-Components/Button2/Button2";

export default function TestimonialsContainer({ reviews, reviewsProducts }) {
  const [showMore, setShowMore] = useState(false);
  const scrollRef = useRef(null);
  const topScrollRef = useRef(null);

  const handleClick = () => {
    showMore === false
      ? setTimeout(
          () =>
            scrollRef.current.scrollIntoView({
              behavior: "smooth",
              block: "end",
            }),
          200,
        )
      : topScrollRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
    setShowMore((prevState) => !prevState);
  };

  return (
    !!reviews.length && (
      <div className={styles.container}>
        <div className={styles.reviews}>
          <div ref={topScrollRef} className={styles.topRef} />
          {showMore
            ? reviews.map((review, index) => {
                const productId = review.productId;
                let productName = reviewsProducts[productId]?.productName;
                let productImage = reviewsProducts[productId]?.productImage;
                return (
                  <Testimonial
                    productName={productName}
                    clientName={review.customerName}
                    review={review.rating}
                    pros={review.pros}
                    date={moment(review.date).format("LL")}
                    cons={review.cons}
                    feedbackContent={review.reviewContent}
                    productImage={productImage}
                    isVerifiedPurchase={review.verifiedOrder}
                  />
                );
              })
            : reviews.slice(0, 3).map((review, index) => {
                const productId = review.productId;
                let productName = reviewsProducts[productId]?.productName;
                let productImage = reviewsProducts[productId]?.productImage;
                return (
                  <Testimonial
                    productName={productName}
                    clientName={review.customerName}
                    review={review.rating}
                    pros={review.pros}
                    date={moment(review.date).format("LL")}
                    cons={review.cons}
                    feedbackContent={review.reviewContent}
                    productImage={productImage}
                    isVerifiedPurchase={review.verifiedOrder}
                  />
                );
              })}
        </div>
        <div ref={scrollRef} className={styles.ref} />
        <Button2
          buttonType={"submit"}
          content={showMore ? "Hide" : "Load More"}
          handleClick={handleClick}
        />
      </div>
    )
  );
}
