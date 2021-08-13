import React, { useState, useEffect } from "react";
import styles from "./Product.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import TimesIcon from "../../../../svgs/times.svg";
import EmptyHeartIcon from "../../../../svgs/empty_heart.svg";
import ShoppingCartIcon from "../../../../svgs/empty_cart.svg";
import { useDispatch } from "react-redux";
import { removeFromComparison } from "../../../../actions/comparisonActions";
import { ReactSVG } from "react-svg";
import styled from "styled-components";
import { withFirebase } from "../../../Firebase";
import EmptyStarIcon from "../../../../svgs/empty_star.svg";
import StarIcon from "../../../../svgs/full_star.svg";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { filterColorOptions } from "../../../../helpers/filterProductColorsOptions";
import { addToCart } from "../../../../actions/shoppingCartActions";
import { addItemToWishlist } from "../../../../actions/wishlistActions";
import { renderCurrencyLocale } from "../../../../helpers/renderCurrency";

const ColorSetCircle = styled.div`
  background: #${(props) => props.color1};
  z-index: 9;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    right: 50%;
    bottom: 0;
    left: 0;
    background-color: #${(props) => props.color2};
  }

  width: 16px;
  height: 16px;
  object-fit: contain;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.35rem;
  border: ${(props) =>
    props.selected ? "1px solid #ff5722" : "1px solid transparent"};

  &:hover {
    cursor: pointer;
  }
`;

const ColorCircle = styled.div`
  width: 15px;
  height: 15px;
  object-fit: contain;
  border-radius: 50%;
  margin-right: 0.35rem;
  background: #${(props) => props.color};
  border: ${(props) => props.color === "ffffff" && "1px solid #dedede"};
  border: ${(props) =>
    props.selected ? "1px solid #ff5722" : "1px solid transparent"};
  border: ${(props) =>
    props.selected
      ? "1px solid #ff5722"
      : props.color === "ffffff"
      ? "1px solid #DEDEDE"
      : "1px solid transparent"};
  &:hover {
    cursor: pointer;
  }
`;

function Product({
  firebase,
  productId,
  sku,
  oldPrice,
  newPrice,
  productName,
  stock,
  productImage,
  colors,
  productDescription,
  specs,
  discountPercentage,
  setProductId,
  setShowDescriptionModal,
}) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");

  let filteredColors = filterColorOptions(colors);

  useEffect(() => {
    const fetchProductReviews = async () => {
      const reviews = await firebase.productReviews(productId);

      if (!reviews.empty) {
        let reviewSum = 0;
        let numReviews = 0;

        reviews.forEach((review) => {
          setReviews((prevState) => [...prevState, review.data()]);
          reviewSum = reviewSum + review.data().rating;
          numReviews++;
        });

        setRating((reviewSum / numReviews).toFixed(1));
      }
    };

    fetchProductReviews();
  }, []);

  return (
    <div className={styles.product__wrapper}>
      <div
        className={styles.removeProduct__button}
        onClick={() => dispatch(removeFromComparison(productId))}>
        <ReactSVG src={TimesIcon} />
      </div>
      <div className={styles.image__wrapper}>
        <img src={productImage} alt={productName} />
      </div>
      <div className={styles.product__showcaseInfo}>
        <div className={styles.top__wrapper}>
          <span>SKU: {sku}</span>
          <h4>{productName}</h4>
        </div>
        <div className={styles.bottom__wrapper}>
          <div className={styles.left__wrapper}>
            <div className={styles.review__container}>
              {rating > 0 ? (
                <React.Fragment>
                  <div className={styles.stars__wrapper}>
                    {[...Array(Math.round(rating))].map((_, index) => (
                      <ReactSVG src={StarIcon} key={index} />
                    ))}
                    {[...Array(5 - Math.round(rating))].map((_, index) => (
                      <ReactSVG src={EmptyStarIcon} key={index} />
                    ))}
                  </div>
                  <span>{rating}/5</span>
                  <FontAwesomeIcon icon={faCaretDown} />
                </React.Fragment>
              ) : (
                <span style={{ marginLeft: 0 }}>No ratings</span>
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
          <div className={styles.right__wrapper}>
            <div className={styles.colors__wrapper}>
              {filteredColors &&
                filteredColors.map((set, index) =>
                  set.color2 ? (
                    <ColorSetCircle
                      color1={set.color2Code}
                      color2={set.color1Code}
                      onClick={() => {
                        setSelectedColor(index);
                        console.log(index);
                      }}
                      selected={selectedColor === index ? true : false}
                      style={
                        !!selectedColor === index
                          ? {
                              border: "1px solid #FF5722",
                            }
                          : {}
                      }
                    />
                  ) : (
                    <ColorCircle
                      color={set.color1Code}
                      onClick={() => {
                        setSelectedColor(index);
                        console.log(index);
                      }}
                      selected={selectedColor === index ? true : false}
                    />
                  ),
                )}
            </div>
            <span>{stock} in stock</span>
          </div>
        </div>
      </div>
      <div className={styles.options__wrapper}>
        <div
          className={styles.option}
          onClick={() => dispatch(addToCart(productId))}>
          <ReactSVG src={ShoppingCartIcon} />
        </div>
        <div
          className={styles.option}
          onClick={() => dispatch(addItemToWishlist(productId))}>
          <ReactSVG src={EmptyHeartIcon} />
        </div>
      </div>
      <div className={styles.description__wrapper}>
        {documentToReactComponents(productDescription.json)}
        <div className={styles.seeDescription}>
          <span
            onClick={() => {
              setProductId(productId);
              setShowDescriptionModal(true);
            }}>
            See All
          </span>
        </div>
      </div>
      <div className={styles.specs__wrapper}>
        {specs?.map((spec, index) => (
          <div key={index} className={styles.spec}>
            <span>{spec.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

Product = withFirebase(Product);

export default Product;
