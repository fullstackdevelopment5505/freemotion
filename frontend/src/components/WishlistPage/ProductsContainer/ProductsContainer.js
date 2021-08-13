import React from "react";
import styles from "./ProductsContainer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { ReactSVG } from "react-svg";
import { useDispatch } from "react-redux";
import {
  addItemToWishlist,
  removeWishlistItem,
} from "../../../actions/wishlistActions";
import { addToCart } from "../../../actions/shoppingCartActions";
import { renderCurrencyLocale } from "../../../helpers/renderCurrency";

import TimesIcon from "../../../svgs/times.svg";
import EmptyHeartIcon from "../../../svgs/empty_heart.svg";

export const WishlistProductCard = ({
  productImage,
  productName,
  oldPrice,
  newPrice,
  productId,
}) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.productCard}>
      <div
        className={styles.closeButton__wrapper}
        onClick={() => removeWishlistItem(productId)}>
        <ReactSVG src={TimesIcon} />
      </div>
      <div className={styles.image__wrapper}>
        <img src={productImage} alt="" />
      </div>
      <div className={styles.content__wrapper}>
        <h5>{productName}</h5>
        <div className={styles.price__wrapper}>
          <div className={styles.wrapper}>
            <div className={styles.oldPrice}>
              <span>{renderCurrencyLocale(oldPrice)}</span>
              <div className={styles.bar} />
            </div>
          </div>
          <div className={styles.newPrice}>
            <span>{renderCurrencyLocale(newPrice)}</span>
          </div>
        </div>
        <div className={styles.purchase__wrapper}>
          <ReactSVG
            src={EmptyHeartIcon}
            onClick={() => {
              dispatch(addItemToWishlist(productId));
            }}
          />
          <div
            className={styles.wrapper}
            onClick={() => dispatch(addToCart(productId))}>
            <span>Buy now</span>
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ marginBottom: "1px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProductsContainer({ products }) {
  return (
    <div className={styles.container}>
      <div className={styles.products__container}>
        {products.map((product, index) => (
          <WishlistProductCard
            key={index}
            productImage={product.productImage.url}
            productName={product.productName}
            oldPrice={product.oldPrice}
            newPrice={product.currentPrice}
          />
        ))}
      </div>
    </div>
  );
}
