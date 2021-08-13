import React from "react";
import { ReactSVG } from "react-svg";
import styles from "./QualityAssuranceBanner.module.scss";

import AuthorizedIcon from "../../../svgs/authorized_svg.svg";
import LowestCostIcon from "../../../svgs/lowestcost_svg.svg";
import OneYearIcon from "../../../svgs/1year_svg.svg";
import MoneyBackIcon from "../../../svgs/moneyback_svg.svg";

export default function QualityAssuranceBanner() {
  return (
    <div className={styles.banner__wrapper}>
      <div className={styles.col}>
        <ReactSVG src={AuthorizedIcon} />
        <div className={styles.wrapper}>
          <h4>AUTHORIZED</h4>
          <p>Distributor / Dealer</p>
        </div>
      </div>
      <div className={styles.col}>
        <ReactSVG src={LowestCostIcon} />
        <div className={styles.wrapper}>
          <h4>LOWEST COST</h4>
          <p>Lowest price guarantee</p>
        </div>
      </div>
      <div className={styles.col}>
        <ReactSVG src={OneYearIcon} />
        <div className={styles.wrapper}>
          <h4>1 YEAR</h4>
          <p>1 year complete warranty</p>
        </div>
      </div>
      <div className={styles.col}>
        <ReactSVG src={MoneyBackIcon} />
        <div className={styles.wrapper}>
          <h4>MONEY BACK</h4>
          <p>Easy free returns</p>
        </div>
      </div>
    </div>
  );
}
