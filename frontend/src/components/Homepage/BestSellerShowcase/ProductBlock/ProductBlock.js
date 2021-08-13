import React, { useState, useEffect } from "react";
import styles from "./ProductBlock.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import EmptyHeartIcon from "../../../../svgs/empty_heart.svg";
import EmptyStarIcon from "../../../../svgs/empty_star.svg";
import StarIcon from "../../../../svgs/full_star.svg";
import FullHeartIcon from "../../../../svgs/full_heart.svg";
import { ReactSVG } from "react-svg";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToWishlist,
  removeWishlistItem,
} from "../../../../actions/wishlistActions";
import { withFirebase } from "../../../Firebase";
import { renderCurrencyLocale } from "../../../../helpers/renderCurrency";

function ProductBlock({
  firebase,
  name,
  image,
  productId,
  oldPrice,
  newPrice,
}) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);

  const wishlistProductsId = useSelector((state) => state.wishlist.items);
  const [wishlistProduct, setWishlistProduct] = useState(false);

  useEffect(() => {
    setWishlistProduct(wishlistProductsId.includes(productId));
  }, []);

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
      <div className={styles.bestSeller__ribbon}>
        <p>BEST SELLER</p>
      </div>
      <div className={styles.content__wrapper}>
        <div className={styles.image__wrapper}>
          <LazyLoadImage src={image} alt={name} />
        </div>
        <div className={styles.productInfo__wrapper}>
          <div className={styles.header__wrapper}>
            <h2>{name}</h2>
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
          </div>
          <div className={styles.footer}>
            <div className={styles.price__wrapper}>
              <div className={styles.oldPrice__wrapper}>
                <span>{renderCurrencyLocale(oldPrice)}</span>
                <div className={styles.diagonal__price__line} />
              </div>
              <span>{renderCurrencyLocale(newPrice)}</span>
            </div>
            <div className={styles.purchase__wrapper}>
              {wishlistProduct ? (
                <ReactSVG
                  beforeInjection={(svg) => {
                    svg.setAttribute("style", `width: 1.25rem`);
                    svg.setAttribute("style", `height: 1.25rem`);
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
                    svg.setAttribute("style", `width: 1.25rem`);
                    svg.setAttribute("style", `height: 1.25rem`);
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
    </div>
  );
}

ProductBlock = withFirebase(ProductBlock);

export default ProductBlock;
