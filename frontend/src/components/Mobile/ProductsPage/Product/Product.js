import React, { useState, useEffect } from "react";
import styles from "./Product.module.scss";
import {
  addItemToWishlist,
  removeWishlistItem,
} from "../../../../actions/wishlistActions";
import { addToCart } from "../../../../actions/shoppingCartActions";
import {
  addToComparison,
  removeFromComparison,
} from "../../../../actions/comparisonActions";
import { useDispatch, useSelector } from "react-redux";
import EmptyHeartIcon from "../../../../svgs/empty_heart.svg";
import EmptyCartIcon from "../../../../svgs/empty_cart.svg";
import ScaleIcon from "../../../../svgs/scale.svg";
import { ReactSVG } from "react-svg";
import { renderCurrencyLocale } from "../../../../helpers/renderCurrency";

import InCartIcon from "../../../../svgs/mobile_products/in_cart.svg";
import InComparisonIcon from "../../../../svgs/mobile_products/in_comparison.svg";
import FullHeartIcon from "../../../../svgs/full_heart.svg";
import EmptyStarIcon from "../../../../svgs/empty_star.svg";
import StarIcon from "../../../../svgs/full_star.svg";
import { useHistory } from "react-router-dom";
import { withFirebase } from "../../../Firebase";

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
  setShowATCModal,
  setModalProductId,
}) {
  const dispatch = useDispatch();
  const wishlistProductsId = useSelector((state) => state.wishlist.items);
  const shoppingCartProducts = useSelector(
    (state) => state.shoppingCart.products,
  );
  const comparisonProductsIds = useSelector((state) => state.comparison.items);
  const history = useHistory();

  const [wishlistProduct, setWishlistProduct] = useState(false);
  const [comparisonProduct, setComparisonProduct] = useState(false);
  const [cartProduct, setCartProduct] = useState(false);

  const [rating, setRating] = useState(0);
  const [numberReviews, setNumberReviews] = useState(0);
  const [detailedRatingData, setDetailedRatingData] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });

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
    setComparisonProduct(comparisonProductsIds.includes(id));
    setCartProduct(isInCart(shoppingCartProducts, id));
  }, []);

  return (
    <div className={styles.product__wrapper}>
      <div className={styles.top__wrapper}>
        <div className={styles.product__header}>
          <div
            className={styles.image__wrapper}
            onClick={() => history.push(`/products/${id}`)}>
            <img src={productImage} alt={name} />
          </div>
          <div className={styles.header__options__wrapper}>
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
            <div className={styles.optionBlock}>
              {comparisonProduct ? (
                <ReactSVG
                  className={styles.compare__icon}
                  beforeInjection={(svg) => {
                    svg.setAttribute("style", `width: 1rem`);
                    svg.setAttribute("style", `height: 1rem`);
                    svg.setAttribute("style", `margin-bottom: -6px`);
                    svg.children[0].setAttribute("style", `stroke: #ff5722`);
                  }}
                  src={InComparisonIcon}
                  onClick={() => {
                    setComparisonProduct(false);
                    dispatch(removeFromComparison(id));
                  }}
                />
              ) : (
                <ReactSVG
                  className={styles.compare__icon}
                  beforeInjection={(svg) => {
                    svg.setAttribute("style", `width: 0.9rem`);
                    svg.setAttribute("style", `height: 0.9rem`);
                    svg.setAttribute("style", `margin-bottom: -6px`);
                  }}
                  src={ScaleIcon}
                  onClick={() => {
                    setComparisonProduct(true);
                    dispatch(addToComparison(id));
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className={styles.content__container}>
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
                <span className={styles.numReviews}>
                  {numberReviews} Reviews
                </span>
              </React.Fragment>
            ) : (
              <span className={styles.noReviews}>No Reviews</span>
            )}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.price__wrapper}>
          <div className={styles.newPrice}>
            <span>{renderCurrencyLocale(newPrice)}</span>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.oldPrice}>
              <span>{renderCurrencyLocale(oldPrice)}</span>
              <div className={styles.bar} />
            </div>
          </div>
        </div>
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
              src={InCartIcon}
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
      </div>
    </div>
  );
}

Product = withFirebase(Product);

export default Product;
