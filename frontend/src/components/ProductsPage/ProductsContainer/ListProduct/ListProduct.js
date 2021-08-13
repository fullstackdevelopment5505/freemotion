import React, { useState, useEffect } from "react";
import styles from "./ListProduct.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import EmptyHeartIcon from "../../../../svgs/empty_heart.svg";
import EmptyCartIcon from "../../../../svgs/empty_cart.svg";
import EmptyStarIcon from "../../../../svgs/empty_star.svg";
import StarIcon from "../../../../svgs/full_star.svg";
import ScaleIcon from "../../../../svgs/scale.svg";
import { ReactSVG } from "react-svg";
import Parameters from "../../Parameters/Parameters";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { addItemToWishlist } from "../../../../actions/wishlistActions";
import { addToCart } from "../../../../actions/shoppingCartActions";
import { addToComparison } from "../../../../actions/comparisonActions";
import { useDispatch } from "react-redux";
import { withFirebase } from "../../../Firebase";
import { useMediaQuery } from "react-responsive";
import { renderCurrencyLocale } from "../../../../helpers/renderCurrency";

const calculateDiscount = (oldPrice, newPrice) => {
  let discount = (100 * (oldPrice - newPrice)) / oldPrice;
  return Math.round(discount);
};

function Product({
  firebase,
  id,
  productImage,
  name,
  oldPrice,
  newPrice,
  expanded,
  setExpanded,
  index,
  setShowATCModal,
  setModalProductId,
}) {
  const expand = () => {
    expanded === index ? setExpanded(null) : setExpanded(index);
  };

  const isMacbook = useMediaQuery({
    query:
      "(min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi)",
  });

  let expandedHeight = "40vh";

  const setExpandedHeight = () => {
    if (isMacbook) expandedHeight = "41.5vh";
  };

  setExpandedHeight();

  const dispatch = useDispatch();

  const parameters = [
    { name: "Model", description: "Gotway RS" },
    { name: "Color", description: "Black" },
    { name: "Wheel Size", description: "19-inch" },
    {
      name: "Max Speed",
      description: "Up to 40 Mph, Up to 64 Kmh",
    },
    {
      name: "Max Range",
      description: "Up to 60 miles, Up to 96 Km",
    },
    { name: "Battery", description: "100V/1800Wh LG M50T 21700" },
    {
      name: "Motor Type",
      description: "2600W Hollow motor high-speed version",
    },
    { name: "Weight", description: "27 Kg, 59.4 Lbs" },
    { name: "Max Climb Angle", description: "25°" },
    { name: "Max Load", description: "147.7 Kg, 325 lbs" },
  ];

  const [rating, setRating] = useState(0);

  let discountPercentage = calculateDiscount(oldPrice, newPrice);

  useEffect(() => {
    const getProductRating = async (productId) => {
      const reviews = await firebase.productReviews(productId);
      if (!reviews.empty) {
        let reviewSum = 0;
        let numReviews = 0;
        reviews.forEach((review) => {
          reviewSum = reviewSum + review.data().rating;
          numReviews++;
        });
        setRating((reviewSum / numReviews).toFixed(1));
      }
    };

    getProductRating(id);
  }, []);

  return (
    <div
      className={styles.product__wrapper}
      style={{
        height: expanded === index && expandedHeight,
      }}>
      <span className={styles.sku}>SKU: 2231</span>
      <div className={styles.image__wrapper}>
        <LazyLoadImage src={productImage} alt={name} />
      </div>
      <div className={styles.content__wrapper}>
        <div className={styles.productDetails__wrapper}>
          <div className={styles.content}>
            <h4>{name}</h4>
            <div className={styles.review__container}>
              {rating && rating > 0 ? (
                <React.Fragment>
                  <div className={styles.stars__wrapper}>
                    {[...Array(Math.round(rating))].map((_, index) => (
                      <ReactSVG src={StarIcon} key={index} />
                    ))}
                    {[...Array(5 - Math.round(rating))].map((_, index) => (
                      <ReactSVG src={EmptyStarIcon} key={index} />
                    ))}
                  </div>
                  <div className={styles.review}>
                    <span>{rating}/5</span>
                    <FontAwesomeIcon icon={faCaretDown} />
                  </div>
                </React.Fragment>
              ) : (
                <span>No Reviews</span>
              )}
            </div>
            <div className={styles.price__wrapper}>
              <div className={styles.newPrice}>
                <span>{renderCurrencyLocale(newPrice)}</span>
              </div>
              <div className={styles.wrapper}>
                <div className={styles.oldPrice}>
                  <span>{renderCurrencyLocale(oldPrice)}</span>
                  <div className={styles.bar} />
                </div>
                <span className={styles.discount}>-{discountPercentage} %</span>
              </div>
            </div>
          </div>
          <div
            className={styles.description__wrapper}
            style={
              expanded === index
                ? {
                    height: "30vh",
                    backgroundImage:
                      "linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 1))",
                  }
                : {
                    WebkitTextFillColor: "transparent",
                  }
            }>
            {parameters.map((parameter, index) => (
              <div key={index} className={styles.parameter__wrapper}>
                <span className={styles.name}>{parameter.name}:</span>
                <span className={styles.description}>
                  {parameter.description}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.bottom__row}>
          <div className={styles.options__wrapper}>
            <div className={styles.wrapper}>
              <div
                className={styles.optionBlock}
                onClick={() => {
                  dispatch(addToCart(id));
                  setShowATCModal(true);
                  setModalProductId(id);
                }}>
                <ReactSVG src={EmptyCartIcon} />
              </div>
              <div
                className={styles.optionBlock}
                onClick={() => dispatch(addToComparison(id))}>
                <ReactSVG src={ScaleIcon} />
              </div>
              <div
                className={styles.optionBlock}
                onClick={() => dispatch(addItemToWishlist(id))}>
                <ReactSVG src={EmptyHeartIcon} />
              </div>
            </div>
          </div>
          <span className={styles.seeAll} onClick={() => expand(index)}>
            {expanded === index ? "Hide" : "See All"}
          </span>
        </div>
      </div>
    </div>
  );
}

Product = withFirebase(Product);

export default Product;
