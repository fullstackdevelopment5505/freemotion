import React from "react";
import styles from "./DeliveryInfo.module.scss";

import LeafIcon from "../../../svgs/leaf.svg";
import MovingTruckIcon from "../../../svgs/moving_truck.svg";
import { ReactSVG } from "react-svg";

export default function DeliveryInfo() {
  return (
    <div className={styles.deliveryInfo__container}>
      <div className={styles.wrapper}>
        <div>
          <p>CANADA</p>
        </div>
        <div>
          <ReactSVG src={MovingTruckIcon} />
        </div>
        <div>
          <p>CANADA DUTY FREE</p>
        </div>
        <div>
          <ReactSVG src={LeafIcon} />
        </div>
        <div>
          <p>FREE SHIPPING FROM LOS ANGELES ACROSS USA & CANADA</p>
        </div>
        <div>
          <ReactSVG src={MovingTruckIcon} />
        </div>
        <div>
          <p>CANADA DUTY FREE</p>
        </div>
        <div>
          <ReactSVG src={LeafIcon} />
        </div>
        <div>
          <p>CANADA DUTY </p>
        </div>
      </div>
      <div className={styles.mobile__wrapper}>
        <div className={styles.truck__wrapper}>
          <div>
            <ReactSVG src={MovingTruckIcon} />
          </div>
          <div>
            <p>FREE SHIPPING FROM LOS ANGELES ACROSS USA & CANADA</p>
          </div>
        </div>
        <div className={styles.dutyFree__wrapper}>
          <div>
            <ReactSVG src={LeafIcon} />
          </div>
          <div>
            <p>CANADA DUTY FREE</p>
          </div>
        </div>
      </div>
    </div>
  );
}
