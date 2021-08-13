import React from "react";
import styles from "./CommissionCard.module.scss";

export default function CommissionCard({
  date,
  status,
  link,
  origin,
  origin_base,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div>
          <span>Date</span>
          <span>{date}</span>
        </div>
        <div>
          <span>Status</span>
          <span
            className={styles.status}
            style={
              status === "Not Converted"
                ? {
                    backgroundColor: "#F2F2F2",
                    border: "1px solid #898989",
                    boxSizing: "border-box",
                    borderRadius: "4px",
                    color: "#898989",
                  }
                : {
                    background: "#F0FFDE",
                    border: "1px solid #8BC34A",
                    boxSizing: "border-box",
                    borderRadius: "4px",
                    color: "#8BC34A",
                  }
            }>
            {status}
          </span>
        </div>
      </div>
      <div className={styles.row}>
        <span>Link</span>
        <span>{link}</span>
      </div>
      <div className={styles.row}>
        <div>
          <span>Origin</span>
          <span>{origin ? origin : "N/A"}</span>
        </div>
        <div>
          <span>Origin Base</span>
          <span>{origin_base ? origin_base : "N/A"}</span>
        </div>
      </div>
    </div>
  );
}
