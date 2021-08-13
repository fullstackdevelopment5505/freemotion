import React, { useState, useEffect } from "react";
import ClickCard from "../../../Mobile/Affiliate/Clicks/ClickCard/ClickCard";
import ViewByMenu from "../../../Mobile/Affiliate/Clicks/ViewByMenu/ViewByMenu";
import FilterMenu from "../FilterMenu/FilterMenu";
import styles from "./Clicks.module.scss";

const ClickEntryRow = ({ date, status, link, origin, origin_base }) => (
  <div className={styles.clickEntry__wrapper}>
    <span>{date}</span>
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
    <span className={styles.link}>{link}</span>
    <span>{origin}</span>
    <span>{origin_base}</span>
  </div>
);

export default function Clicks({ setLoading }) {
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
      <h3>Clicks</h3>
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
            <span>Date</span>
            <span>Status</span>
            <span className={styles.linkTag}>Link</span>
            <span>Origin</span>
            <span>Origin Base</span>
          </div>
        ) : null}
        <div className={styles.clicksEntries__container}>
          {[...Array(2)].map((entry, index) =>
            window.screen.width < 768 ? (
              <ClickCard
                key={index}
                date={"February 11, 2021"}
                status={"Converted"}
                link={"http://freemotionshop.com/?ref=11742"}
                origin={"N/A"}
                origin_base={"N/A"}
              />
            ) : (
              <ClickEntryRow
                key={index}
                date={"February 11, 2021"}
                status={"Converted"}
                link={"http://freemotionshop.com/?ref=11742"}
                origin={"N/A"}
                origin_base={"N/A"}
              />
            ),
          )}
          {[...Array(2)].map((entry, index) =>
            window.screen.width < 768 ? (
              <ClickCard
                key={index}
                date={"February 11, 2021"}
                status={"Not Converted"}
                link={"http://freemotionshop.com/?ref=11742"}
                origin={"N/A"}
                origin_base={"N/A"}
              />
            ) : (
              <ClickEntryRow
                key={index}
                date={"February 11, 2021"}
                status={"Not Converted"}
                link={"http://freemotionshop.com/?ref=11742"}
                origin={"N/A"}
                origin_base={"N/A"}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
