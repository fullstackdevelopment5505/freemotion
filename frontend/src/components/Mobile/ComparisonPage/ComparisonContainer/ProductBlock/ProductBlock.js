import React, { useState, useEffect } from "react";
import styles from "./ProductBlock.module.scss";
import { ReactSVG } from "react-svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addItemToWishlist } from "../../../../../actions/wishlistActions";
import { addToCart } from "../../../../../actions/shoppingCartActions";
import { removeFromComparison } from "../../../../../actions/comparisonActions";

import StarIcon from "../../../../../svgs/star.svg";
import EmptyStarIcon from "../../../../../svgs/empty_star.svg";
import EmptyHeartIcon from "../../../../../svgs/empty_heart.svg";
import EmptyCartIcon from "../../../../../svgs/empty_cart.svg";
import TimesIcon from "../../../../../svgs/times.svg";

const getWishlistIds = (wishlist) => {
  let wishlistIds = [];
  for (let i = 0; i < wishlist.length; i++) wishlistIds.push(wishlist[i].id);
  return wishlistIds;
};

export default function ProductBlock({
  sku,
  productName,
  productImage,
  availableColors,
  review,
  newPrice,
  oldPrice,
  numStockItems,
  discountPercentage,
  keyFeatures,
  brand,
  id,
}) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    var wishlistX = getWishlistIds(wishlist);
    setWishlistIds(wishlistX);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.mainContent__container}>
        <div
          className={styles.removeProduct__wrapper}
          onClick={() => removeFromComparison(id)}>
          <ReactSVG src={TimesIcon} />
        </div>
        <div className={styles.content__wrapper}>
          <div className={styles.image__wrapper}>
            <img src={productImage} alt={productName} />
          </div>
          <span className={styles.sku}>SKU: {sku}</span>
          <h4 className={styles.productName}>{productName}</h4>
          <div className={styles.review__container}>
            <div className={styles.stars__wrapper}>
              {[...Array(review)].map((_, index) => (
                <ReactSVG src={StarIcon} key={index} />
              ))}
              {[...Array(5 - review)].map((_, index) => (
                <ReactSVG
                  className={styles.emptyStar}
                  src={EmptyStarIcon}
                  key={index}
                />
              ))}
            </div>
            <div className={styles.review}>
              <span>{review}/5</span>
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
          </div>
          <div className={styles.price__wrapper}>
            <div className={styles.newPrice}>
              <span>C$</span>
              <span>{newPrice}</span>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.oldPrice}>
                <span>C$</span>
                <span>{oldPrice}</span>
                <div className={styles.bar} />
              </div>
              <span className={styles.discount}>-{discountPercentage} %</span>
            </div>
          </div>
          <span className={styles.stock}>{numStockItems} in stock</span>
        </div>
        <div className={styles.footerOptions}>
          <div
            className={styles.optionBlock}
            onClick={() =>
              dispatch(
                addToCart({
                  id: id,
                  productImage: productImage,
                  brand: brand,
                  name: productName,
                  review: review,
                  oldPrice: oldPrice,
                  newPrice,
                  discount: `${discountPercentage}%`,
                  sku,
                }),
              )
            }>
            <ReactSVG src={EmptyCartIcon} />
          </div>
          <div className={styles.optionBlock}>
            <ReactSVG
              src={EmptyHeartIcon}
              onClick={() =>
                dispatch(
                  addItemToWishlist({
                    id,
                    productImage,
                    name: productName,
                    brand,
                    review,
                    oldPrice,
                    newPrice,
                    discountPercentage,
                    SKU: sku,
                  }),
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
