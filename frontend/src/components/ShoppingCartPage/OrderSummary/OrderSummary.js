import React, { useState, useEffect } from "react";
import Button from "../../UI-Components/Button/Button";
import styles from "./OrderSummary.module.scss";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { renderCurrencyLocale } from "../../../helpers/renderCurrency";

import PaypalLogo from "../../../svgs/paypal_logo.svg";

export default function OrderSummary({ products }) {
  const [cartTotal, setCartTotal] = useState(0);
  const [numProducts, setNumProducts] = useState(0);

  const history = useHistory();

  const handleClick = () => history.push("/checkout/1");

  const getNumProducts = (products) => {
    let numProducts = 0;
    Object.keys(products).forEach(
      (product) => (numProducts += products[product].quantity),
    );
    setNumProducts(numProducts);
  };

  const getCartTotal = (products) => {
    let total = 0;
    Object.keys(products).forEach(
      (product) =>
        (total += products[product].price * products[product].quantity),
    );
    setCartTotal(total);
  };

  useEffect(() => {
    getNumProducts(products);
    getCartTotal(products);
  }, [products]);

  return (
    <div className={styles.orderSummary__wrapper}>
      <div className={styles.header}>
        <h4>Order Summary</h4>
      </div>
      <div className={styles.orderOverview__wrapper}>
        <div>
          <span>{numProducts} Items</span>
          <span>{renderCurrencyLocale(cartTotal)}</span>
        </div>
        <div>
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className={styles.total}>
          <span>Total</span>
          <span>{renderCurrencyLocale(cartTotal)}</span>
        </div>
      </div>
      <div className={styles.checkOut__options}>
        <Button content={"Checkout"} handleClick={(e) => handleClick(e)} />
        <div className={styles.separator}>OR</div>
        <button>
          <ReactSVG src={PaypalLogo} />
        </button>
      </div>
    </div>
  );
}
