import React from "react";
import Button from "../UI-Components/Button/Button";
import Button2 from "../UI-Components/Button2/Button2";
import styles from "./AddedToCartModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import productImage from "../../images/e-Unicycles 2.png";
import { renderCurrencyLocale } from "../../../helpers/renderCurrency";

export const CartModalProduct = ({
  productName,
  brand,
  price,
  quantity,
  productImage,
}) => (
  <div className={styles.cartProduct__wrapper}>
    <div className={styles.image__wrapper}>
      <img src={productImage} alt={productName} />
    </div>
    <div className={styles.productInfo}>
      <div className={styles.top__wrapper}>
        <p>{productName}</p>
        <span>{brand}</span>
        <p>{renderCurrencyLocale(price)}</p>
      </div>
      <p>
        Quantity: <span>{quantity}</span>
      </p>
    </div>
  </div>
);

export default function AddedToCartModal() {
  return (
    <div className={styles.overshadow}>
      <div className={styles.modal__wrapper}>
        <div className={styles.header}>
          <h4>Successfully Added to Cart!</h4>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.products__list}>
            <CartModalProduct
              productName={"Monster Pro Electric Unicycle"}
              brand={"Gotway"}
              price={2310}
              quantity={1}
              productImage={productImage}
            />
          </div>
          <div className={styles.cart__overview}>
            <div className={styles.cart__info__wrapper}>
              <h6>Your Cart</h6>
              <div className={styles.cart__info}>
                <p>3 items</p>
                <div>
                  <p>Sub Total:</p>
                  <p>{renderCurrencyLocale(420)}</p>
                </div>
                <div>
                  <p>Shipping:</p>
                  <p>FREE</p>
                </div>
              </div>
              <div className={styles.total}>
                <p>Total:</p>
                <p>{renderCurrencyLocale(420)}</p>
              </div>
            </div>
            <div className={styles.options}>
              <Button content={"View Cart"} />
              <Button2 content={"Checkout"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
