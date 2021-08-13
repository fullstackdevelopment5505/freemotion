import React from "react";
import styles from "./OrderBlock.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { renderCurrencyLocale } from "../../../../../helpers/renderCurrency";

export default function OrderBlock({
  id,
  date,
  status,
  total,
  tracking,
  setShowOrderDetails,
  setOrderId,
}) {
  return (
    <div className={styles.orderBlock__wrapper}>
      <span className={styles.orderId}>#{id}</span>
      <span className={styles.orderDate}>{date}</span>
      <div className={styles.orderStatus}>
        <span>{status}</span>
      </div>
      <div className={styles.orderTotal}>
        <span>{renderCurrencyLocale(total.value)}</span>
        <span>{total.numItems} Items</span>
      </div>
      <div className={styles.orderTracking}>
        <span>{tracking.operator}</span>
        <span>{tracking.id}</span>
      </div>
      <div
        className={styles.orderActions}
        onClick={() => {
          setShowOrderDetails(true);
          setOrderId(id);
        }}>
        <FontAwesomeIcon icon={faEye} />
        <span>View Details</span>
      </div>
    </div>
  );
}
