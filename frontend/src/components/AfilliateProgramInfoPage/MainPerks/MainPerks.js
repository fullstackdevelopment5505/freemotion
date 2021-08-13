import React from "react";
import styles from "./MainPerks.module.scss";

import Step1Icon from "../../../svgs/affiliate_step1.svg";
import Step2Icon from "../../../svgs/affiliate_step2.svg";
import Step3Icon from "../../../svgs/affiliate_step3.svg";
import { ReactSVG } from "react-svg";

export default function MainPerks() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h3>Getting Started Is Easy</h3>
        <div className={styles.steps__wrapper}>
          <div className={styles.step}>
            <span>01</span>
            <div className={styles.icon__wrapper}>
              <div className={styles.circle} />
              <ReactSVG src={Step1Icon} />
            </div>
            <h4>Register</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <div className={styles.step}>
            <span>02</span>
            <div className={styles.icon__wrapper}>
              <div className={styles.circle} />
              <ReactSVG src={Step2Icon} />
            </div>
            <h4>Get links</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <div className={styles.step}>
            <span>03</span>
            <div className={styles.icon__wrapper}>
              <div className={styles.circle} />
              <ReactSVG src={Step3Icon} />
            </div>
            <h4>Get paid</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
