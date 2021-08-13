import React, { useState, useEffect } from "react";
import styles from "./Product.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  addItemToWishlist,
  removeWishlistItem,
} from "../../../../actions/wishlistActions";
import {
  addToCart,
  removeFromCart,
} from "../../../../actions/shoppingCartActions";
import { renderCurrencyLocale } from "../../../../helpers/renderCurrency";
import { addToComparison } from "../../../../actions/comparisonActions";
import { useDispatch, useSelector } from "react-redux";
import EmptyHeartIcon from "../../../../svgs/empty_heart.svg";
import FullHeartIcon from "../../../../svgs/full_heart.svg";
import EmptyCartIcon from "../../../../svgs/empty_cart.svg";
import FullCartIcon from "../../../../svgs/full_cart.svg";
import EmptyStarIcon from "../../../../svgs/empty_star.svg";
import StarIcon from "../../../../svgs/full_star.svg";
import ScaleIcon from "../../../../svgs/scale.svg";
import { ReactSVG } from "react-svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { withFirebase } from "../../../Firebase";
import ReviewPopup from "../ReviewPopup/ReviewPopup";

const calculateDiscount = (oldPrice, newPrice) => {
  let discount = (100 * (oldPrice - newPrice)) / oldPrice;
  return Math.round(discount);
};

const isInCart = (products, productId) => {
  let inCart = false;
  for (let i = 0; i < products.length; i++)
    if (products[i].productId == productId) {
      inCart = true;
      break;
    }

  return inCart;
};

function Product({
  firebase,
  id,
  productImage,
  name,
  oldPrice,
  newPrice,
  SKU,
  setShowATCModal,
  setModalProductId,
}) {
  const dispatch = useDispatch();
  const wishlistProductsId = useSelector((state) => state.wishlist.items);
  const shoppingCartProducts = useSelector(
    (state) => state.shoppingCart.products,
  );

  const [wishlistProduct, setWishlistProduct] = useState(false);
  const [cartProduct, setCartProduct] = useState(false);
  const [showReviewDataModal, setShowReviewDataModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [numberReviews, setNumberReviews] = useState(0);
  const [detailedRatingData, setDetailedRatingData] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });

  let discountPercentage = calculateDiscount(oldPrice, newPrice);

  useEffect(() => {
    const getProductRating = async (productId) => {
      const reviews = await firebase.productReviews(productId);
      if (!reviews.empty) {
        let reviewSum = 0;
        let numReviews = 0;
        reviews.forEach((review) => {
          setNumberReviews((prevState) => prevState + 1);
          reviewSum = reviewSum + review.data().rating;
          let reviewVal = review.data().rating;
          numReviews++;
          setDetailedRatingData((prevState) => ({
            ...prevState,
            [reviewVal]: prevState[reviewVal] + 1,
          }));
        });
        setRating((reviewSum / numReviews).toFixed(1));
      }
    };

    getProductRating(id);
    setWishlistProduct(wishlistProductsId.includes(id));
    setCartProduct(isInCart(shoppingCartProducts, id));
  }, []);

  return (
    <div className={styles.product__wrapper}>
      <div className={styles.header}>
        {/* Product Ribbon */}
        <span className={styles.sku}>SKU: {SKU}</span>
      </div>
      <Link to={`/products/${id}`}>
        <div className={styles.image__wrapper}>
          <LazyLoadImage src={productImage} alt={name} />
        </div>
      </Link>
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
              <div
                className={styles.review}
                onMouseEnter={() => setShowReviewDataModal(true)}>
                <span>{rating}/5</span>
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
            </React.Fragment>
          ) : (
            <span>No Reviews</span>
          )}
          {rating !== 0 && showReviewDataModal && (
            <ReviewPopup
              reviewsData={detailedRatingData}
              rating={rating}
              numReviews={numberReviews}
              setShowReviewDataModal={setShowReviewDataModal}
              productId={id}
            />
          )}
        </div>
        <div className={styles.price__wrapper}>
          <div className={styles.newPrice}>
            {renderCurrencyLocale(newPrice)}
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
      <div className={styles.options__wrapper}>
        <div
          className={styles.optionBlock}
          onClick={() => {
            cartProduct === false && setCartProduct((prevState) => !prevState);
            dispatch(addToCart(id, 1));
            cartProduct === false && setShowATCModal(true);
            cartProduct === false && setModalProductId(id);
          }}>
          {cartProduct ? (
            <ReactSVG
              src={FullCartIcon}
              beforeInjection={(svg) => {
                svg.setAttribute("style", `width: 1.1rem`);
                svg.setAttribute("style", `height: 1.1rem`);
                svg.setAttribute("style", `margin-bottom: -6px`);
                svg.children[0].setAttribute("style", `stroke: #ff5722`);
              }}
            />
          ) : (
            <ReactSVG
              src={EmptyCartIcon}
              beforeInjection={(svg) => {
                svg.setAttribute("style", `width: 1.1rem`);
                svg.setAttribute("style", `height: 1.1rem`);
                svg.setAttribute("style", `margin-bottom: -6px`);
              }}
            />
          )}
        </div>
        <div
          className={styles.optionBlock}
          onClick={() => dispatch(addToComparison(id))}>
          <ReactSVG src={ScaleIcon} />
        </div>
        <div className={styles.optionBlock}>
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
                dispatch(removeWishlistItem(id));
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
                dispatch(addItemToWishlist(id));
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

Product = withFirebase(Product);

export default Product;
