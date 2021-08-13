import React, { useState } from "react";
import styles from "./ThumbnailGallery.module.scss";
import Image from "../../../images/e-Unicycles 2.png";
import ChevronUp from "../../../svgs/chevron_up.svg";
import ChevronDown from "../../../svgs/chevron_down.svg";
import { ReactSVG } from "react-svg";

export default function ThumbnailGallery() {
  const [active, setActive] = useState(0);

  const handlePrev = () => {
    if (active >= 1) setActive((active) => active - 1);
    else setActive(6);
  };

  const handleNext = () => {
    if (active <= 5) setActive((active) => active + 1);
    else setActive(0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.carousel__container}>
        <div className={styles.top__arrow} onClick={() => handlePrev()}>
          <ReactSVG src={ChevronUp} />
        </div>
        <div className={styles.carousel}>
          {[...Array(7)].map((_, index) => (
            <div
              style={{ borderBottomColor: active === index && "#212121" }}
              key={index}
              className={styles.image__wrapper}
              onClick={() => setActive(index)}>
              <img src={Image} />
            </div>
          ))}
        </div>
        <div className={styles.bottom__arrow} onClick={() => handleNext()}>
          <ReactSVG src={ChevronDown} />
        </div>
      </div>
      <div className={styles.thumbnail__wrapper}>
        <img src={Image} />
      </div>
    </div>
  );
}
