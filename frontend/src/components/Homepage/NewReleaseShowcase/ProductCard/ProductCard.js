import React, { useState, useEffect } from "react";
import styles from "./ProductCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmptyHeartIcon from "../../../../svgs/empty_heart.svg";
import EmptyStarIcon from "../../../../svgs/empty_star.svg";
import StarIcon from "../../../../svgs/full_star.svg";
import FullHeartIcon from "../../../../svgs/full_heart.svg";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { withFirebase } from "../../../Firebase";
import { useHistory } from "react-router-dom";
import { ReactSVG } from "react-svg";
import {
  addItemToWishlist,
  removeWishlistItem,
} from "../../../../actions/wishlistActions";
import { useDispatch, useSelector } from "react-redux";
import { renderCurrencyLocale } from "../../../../helpers/renderCurrency";

function ProductCard({ name, oldPrice, newPrice, image, productId, firebase }) {
  const [rating, setRating] = useState(0);
  const [wishlistProduct, setWishlistProduct] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const wishlistProductsId = useSelector((state) => state.wishlist.items);

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

    getProductRating(productId);

    setWishlistProduct(wishlistProductsId.includes(productId));
  }, []);

  return (
    <div className={styles.productCard__wrapper}>
      <div className={styles.image__wrapper}>
        <img
          src={image}
          alt={name}
          onClick={() => history.push(`/products/${productId}`)}
        />
      </div>
      <div className={styles.textContent__wrapper}>
        <div className={styles.product__header}>
          <div className={styles.review__wrapper}>
            {rating && rating > 0 ? (
              <React.Fragment>
                <span>{rating}/5</span>
                <div className={styles.reviewStars}>
                  {[...Array(Math.round(rating))].map((_, index) => (
                    <ReactSVG src={StarIcon} key={index} />
                  ))}
                  {[...Array(5 - Math.round(rating))].map((_, index) => (
                    <ReactSVG src={EmptyStarIcon} key={index} />
                  ))}
                </div>
              </React.Fragment>
            ) : (
              <span>No Reviews</span>
            )}
          </div>
          <h2>{name}</h2>
        </div>
        <div className={styles.footer}>
          <div className={styles.price__wrapper}>
            {oldPrice ? (
              <div className={styles.oldPrice__wrapper}>
                <span>{renderCurrencyLocale(oldPrice)}</span>
                <div className={styles.diagonal__price__line} />
              </div>
            ) : null}
            <span>{renderCurrencyLocale(newPrice)}</span>
          </div>
          <div className={styles.purchase__wrapper}>
            {wishlistProduct ? (
              <ReactSVG
                beforeInjection={(svg) => {
                  svg.setAttribute("style", `width: 1.1rem`);
                  svg.setAttribute("style", `height: 1.1rem`);
                  svg.setAttribute("style", `margin-bottom: -6px`);
                  svg.children[0].setAttribute("style", `stroke: #ff5722`);
                }}
                src={FullHeartIcon}
                onClick={() => {
                  setWishlistProduct(false);
                  dispatch(removeWishlistItem(productId));
                }}
              />
            ) : (
              <ReactSVG
                beforeInjection={(svg) => {
                  svg.setAttribute("style", `width: 1.1rem`);
                  svg.setAttribute("style", `height: 1.1rem`);
                  svg.setAttribute("style", `margin-bottom: -6px`);
                }}
                src={EmptyHeartIcon}
                onClick={() => {
                  setWishlistProduct(true);
                  dispatch(addItemToWishlist(productId));
                }}
              />
            )}
            <div
              className={styles.wrapper}
              onClick={() => history.push(`products/${productId}`)}>
              <span>Buy now</span>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductCard = withFirebase(ProductCard);

export default ProductCard;
