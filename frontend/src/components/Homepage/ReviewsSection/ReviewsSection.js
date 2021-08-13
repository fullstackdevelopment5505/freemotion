import React, { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard/ReviewCard";
import ReviewsOverviewCard from "./ReviewsOverviewCard/ReviewsOverviewCard";
import styles from "./ReviewsSection.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { withFirebase } from "../../Firebase";
import axios from "axios";
import Carousel from "react-elastic-carousel";
import CarouselDots from "../../Mobile/CarouselDots/CarouselDots";
require("dotenv").config();

function ReviewsSection({ firebase }) {
  const [currentItem, setCurrentItem] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewsProducts, setReviewsProducts] = useState({});

  const carouselWrapper = document.getElementsByClassName(
    "rec-slider-container",
  )[2];

  const carouselWrapper2 = document.getElementsByClassName(
    "rec-slider-container",
  )[3];

  let buttonIndex = window.screen.width < 768 ? 3 : 1;

  const carouselPrevButton = document.getElementsByClassName("rec-arrow-left")[
    buttonIndex
  ];
  const carouselNextButton = document.getElementsByClassName("rec-arrow-right")[
    buttonIndex
  ];

  const prevReview = () => {
    carouselPrevButton.click();
    currentItem > 0 && setCurrentItem((prevState) => prevState - 1);
  };

  const nextReview = () => {
    carouselNextButton.click();
    currentItem < 7 && setCurrentItem((prevState) => prevState + 1);
  };

  carouselPrevButton?.setAttribute("style", "display: none");
  carouselNextButton?.setAttribute("style", "display: none");
  carouselWrapper?.setAttribute("style", "margin: 0");
  carouselWrapper2?.setAttribute("style", "margin: 0");

  useEffect(() => {
    const fetchProductThumbnail = async (assetId) => {
      const asset = await axios({
        method: "get",
        url: `https://cdn.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/assets/${assetId}`,
        headers: {
          Authorization: `Bearer EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
        },
      });

      return asset.data.fields.file.url;
    };

    const fetchProductsData = async (productsIds) => {
      productsIds.forEach(async (productId) => {
        const result = await axios({
          method: "get",
          url: `https://cdn.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/entries?select=sys.id,sys.createdAt,fields&sys.id=${productId}`,
          headers: {
            Authorization: `Bearer EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
          },
        });

        const productThumbnail = await fetchProductThumbnail(
          result.data.items[0].fields.productImage.sys.id,
        );

        setReviewsProducts((prevState) => ({
          ...prevState,
          [productId]: {
            productName: result.data.items[0].fields.productName,
            productImage: productThumbnail,
          },
        }));
      });
    };

    const fetchProductReviews = async () => {
      const reviews = await firebase.reviews();
      let ids = [];

      if (reviews.empty) console.log("No Reviews!");

      reviews.forEach((review) => {
        setReviews((prevState) => [...prevState, review.data()]);
        ids.push(review.data().productId);
      });

      fetchProductsData(ids);
    };

    fetchProductReviews();
  }, []);

  return (
    !!reviews.length && (
      <div className={styles.reviewSection__wrapper}>
        <div className={styles.reviewSection}>
          <div className={styles.header}>
            <h3>Reviews</h3>
            {window.screen.width < 768 ? null : (
              <div className={styles.controller}>
                <button onClick={() => prevReview()}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button onClick={() => nextReview(reviews)}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            )}
          </div>
          <div className={styles.reviews__container}>
            <ReviewsOverviewCard reviews={reviews} />
            {window.screen.width < 768 ? (
              <React.Fragment>
                <div className={styles.reviewsContent__header}>
                  <CarouselDots numItems={7} currentItem={currentItem} />
                  <div className={styles.controller}>
                    <button onClick={() => prevReview()}>
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button onClick={() => nextReview(reviews)}>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </div>
                </div>
              </React.Fragment>
            ) : null}
            <Carousel
              itemsToShow={window.screen.width < 768 ? 1 : 2}
              enableSwipe={window.screen.width < 768 ? true : false}
              pagination={false}
              style={{ width: window.screen.width < 768 ? "100%" : "66.65%" }}>
              {!!reviewsProducts &&
                reviews.map((review, index) => {
                  const productId = review.productId;
                  let productName = reviewsProducts[productId]?.productName;
                  let productImage = reviewsProducts[productId]?.productImage;
                  return (
                    <ReviewCard
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
            </Carousel>
          </div>
        </div>
      </div>
    )
  );
}

ReviewsSection = withFirebase(ReviewsSection);

export default ReviewsSection;
