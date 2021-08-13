import React, { useState, useEffect } from "react";
import styles from "./OrderSummary.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faRedo } from "@fortawesome/free-solid-svg-icons";
import { default as MobileSummaryProduct } from "../../Mobile/Checkout/SummaryProduct/SummaryProduct";
import { useSelector } from "react-redux";
import axios from "axios";
import { ReactSVG } from "react-svg";
import { renderCurrencyLocale } from "../../../helpers/renderCurrency";

import DownloadIcon from "../../../svgs/download.svg";
import BackIcon from "../../../svgs/back.svg";

export const SummaryProduct = ({
  productImage,
  productName,
  brand,
  date,
  quantity,
  price,
}) => (
  <div className={styles.product__wrapper}>
    <div className={styles.firstCol__wrapper}>
      <div className={styles.image__wrapper}>
        <img src={productImage} alt={productName} />
      </div>
      <div className={styles.name_brand__wrapper}>
        <h5>{productName}</h5>
        <span>{brand}</span>
      </div>
    </div>
    <span className={styles.date}>{date}</span>
    <span className={styles.quantity}>{quantity}</span>
    <span className={styles.price}>
      {renderCurrencyLocale(price * quantity)}
    </span>
  </div>
);

const getCartTotal = (cartProducts) => {
  let cartTotal = 0;
  for (let i = 0; i < cartProducts.length; i++)
    cartTotal += cartProducts[i].currentPrice * cartProducts[i].quantity;
  return cartTotal;
};

export default function OrderSummary({ products, setStage }) {
  const shippingEmail = useSelector(
    (state) => state.shippingAddress.address.email,
  );

  let [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    let total = getCartTotal(products);
    setCartTotal(total);
  }, [products]);

  console.log(products);

  useEffect(() => {
    setStage(3);
  }, []);

  return (
    <div className={styles.container}>
      <h2>Thank You</h2>
      <div className={styles.header}>
        <p className={styles.orderNumber}>
          Order Number: <span>GLBW4683</span>
        </p>
        <div>
          <span className={styles.orderReceived__confirmation}>
            We have received your order
          </span>
          <span className={styles.email}>
            Please check your email. We have sent a confirmation email to your
            address
            {" " + shippingEmail}
          </span>
        </div>
      </div>
      <div className={styles.orderOverview__container}>
        <div className={styles.tags__container}>
          <span>Product</span>
          <span>Date</span>
          <span>Quantity</span>
          <span>Price</span>
        </div>
        <div className={styles.products__container}>
          {products.map((product, index) =>
            window.screen.width < 575.98 ? (
              <MobileSummaryProduct
                key={index}
                productImage={product.productImage.url}
                productName={product.productName}
                quantity={product.quantity}
                price={product.currentPrice}
                date={"October 16, 2020"}
              />
            ) : (
              <SummaryProduct
                key={index}
                productImage={product.productImage.url}
                productName={product.productName}
                quantity={product.quantity}
                price={product.currentPrice}
                date={"October 16, 2020"}
              />
            ),
          )}
        </div>
        <div className={styles.invoiceOptions__container}>
          <div className={styles.options}>
            <div className={styles.downloadInvoice}>
              <ReactSVG src={DownloadIcon} />
              <span>Download Invoice</span>
            </div>
            <div className={styles.checkOrderDetails}>
              <ReactSVG src={BackIcon} />
              <span>Check Order Details</span>
            </div>
          </div>
          <div className={styles.orderInsights}>
            <div>
              <span>Shipping:</span>
              <span>{renderCurrencyLocale(100)}</span>
            </div>
            <div>
              <span>Subtotal:</span>
              <span>{renderCurrencyLocale(cartTotal)}</span>
            </div>
            <div>
              <span>Total:</span>
              <span>{renderCurrencyLocale(cartTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
