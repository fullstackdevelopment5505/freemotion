import React from "react";
import styles from "./Order.module.scss";
import EyeIcon from "../../../../svgs/eye.svg";
import DownloadIcon from "../../../../svgs/download.svg";
import { renderCurrencyLocale } from "../../../../helpers/renderCurrency";
import { ReactSVG } from "react-svg";

export default function Order({
  id,
  date,
  status,
  total,
  tracking,
  setShowOrderDetails,
  setOrderId,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.row}>
          <span>#{id}</span>
          <span>{date}</span>
        </div>
        <div className={styles.orderStatus}>
          <span>{status}</span>
        </div>
        <div className={styles.row}>
          <span>{tracking.operator}</span>
          <span>{renderCurrencyLocale(total.value)}</span>
        </div>
        <div className={styles.row}>
          <span>{tracking.id}</span>
          <span>{total.numItems} Items</span>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.view__details}>
          <ReactSVG src={EyeIcon} />
          <span>View Details</span>
        </div>
        <div className={styles.invoice}>
          <ReactSVG src={DownloadIcon} />
          <span>Invoice</span>
        </div>
      </div>
    </div>
  );
}
