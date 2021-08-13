import React, { useState, useEffect } from "react";
import PaymentCard from "../../../Mobile/Affiliate/Payments/PaymentCard/PaymentCard";
import ViewByMenu from "../../../Mobile/Affiliate/Payments/ViewByMenu/ViewByMenu";
import FilterMenu from "../FilterMenu/FilterMenu";
import styles from "./Payments.module.scss";
import { renderCurrencyLocale } from "../../../../helpers/renderCurrency";

const PaymentEntryRow = ({ id, status, amount, createdAt, completedAt }) => (
  <div className={styles.paymentEntry__wrapper}>
    <span>{id}</span>
    <div className={styles.status}>
      <span
        style={
          status === "Not Converted"
            ? {
                backgroundColor: "#F2F2F2",
                border: "1px solid #898989",
                boxSizing: "border-box",
                borderRadius: "6px",
                color: "#898989",
              }
            : {
                background: "#F0FFDE",
                border: "1px solid #8BC34A",
                boxSizing: "border-box",
                borderRadius: "6px",
                color: "#8BC34A",
              }
        }>
        {status}
      </span>
    </div>
    <span>{renderCurrencyLocale(amount)}</span>
    <span>{createdAt}</span>
    <span>{completedAt}</span>
  </div>
);

export default function Payments({ loading, setLoading }) {
  const timePeriods = [
    "09 Sep 2020 - 12 Sep 2020",
    "02 Sep 2020 - 05 Sep 2020",
  ];

  const [selectedPeriod, setSelectedPeriod] = useState(
    "09 Sep 2020 - 12 Sep 2020",
  );

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className={styles.container}>
      <h3>Payments</h3>
      {window.screen.width >= 768 ? <FilterMenu showProducts={true} /> : null}
      {window.screen.width < 768 && (
        <ViewByMenu
          timePeriods={timePeriods}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />
      )}
      <div className={styles.table__wrapper}>
        {window.screen.width >= 768 ? (
          <div className={styles.tags}>
            <span>ID</span>
            <span>Status</span>
            <span>Amount</span>
            <span>Created At</span>
            <span>Completed At</span>
          </div>
        ) : null}
        <div className={styles.clicksEntries__container}>
          {[...Array(2)].map((entry, index) =>
            window.screen.width < 768 ? (
              <PaymentCard
                key={index}
                date={"February 11, 2021"}
                status={"Converted"}
                link={"http://freemotionshop.com/?ref=11742"}
                origin={"N/A"}
                origin_base={"N/A"}
              />
            ) : (
              <PaymentEntryRow
                key={index}
                id={11}
                status={"Converted"}
                amount={3455}
                createdAt={"February 11, 2021"}
                completedAt={"February 11, 2021"}
              />
            ),
          )}
          {[...Array(2)].map((entry, index) =>
            window.screen.width < 768 ? (
              <PaymentCard
                key={index}
                date={"February 11, 2021"}
                status={"Not Converted"}
                link={"http://freemotionshop.com/?ref=11742"}
                origin={"N/A"}
                origin_base={"N/A"}
              />
            ) : (
              <PaymentEntryRow
                key={index}
                id={11}
                status={"Not Converted"}
                amount={3455}
                createdAt={"February 11, 2021"}
                completedAt={"February 11, 2021"}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
