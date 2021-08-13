import React from "react";
import styles from "./SummaryProduct.module.scss";

export default function SummaryProduct({
  productImage,
  productName,
  brand,
  date,
  quantity,
  price,
}) {
  return (
    <div className={styles.product__wrapper}>
      <div className={styles.top__wrapper}>
        <div className={styles.image__wrapper}>
          <img src={productImage} alt={productName} />
        </div>
        <div className={styles.name_brand__wrapper}>
          <div className={styles.wrapper}>
            <h5>{productName}</h5>
            <span className={styles.brand}>{brand}</span>
          </div>
          <div className={styles.date__wrapper}>
            <span>Date:</span>
            <span className={styles.date}>{date}</span>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.quantity__wrapper}>
          <span>Quantity:</span>
          <span className={styles.quantity}>{quantity}</span>
        </div>
        <span className={styles.price}>C${price}</span>
      </div>
    </div>
  );
}
