import React, { useLayoutEffect, useState } from "react";
import styles from "./ThumbnailGallery.module.scss";
import Image from "../../../../images/e-Unicycles 2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import CarouselDots from "../../CarouselDots/CarouselDots";
import Carousel from "react-elastic-carousel";
import ChevronLeft from "../../../../svgs/gallery/chevron_left.svg";
import ChevronRight from "../../../../svgs/gallery/chevron_right.svg";
import { ReactSVG } from "react-svg";

export default function ThumbnailGallery() {
  const [currentItem, setCurrentItem] = useState(0);

  const carouselWrapper = document.getElementsByClassName(
    "rec-slider-container",
  )[0];

  const carouselPrevButton = document.getElementsByClassName(
    "rec-arrow-left",
  )[0];
  const carouselNextButton = document.getElementsByClassName(
    "rec-arrow-right",
  )[0];

  const handlePrev = () => {
    carouselPrevButton.click();
    currentItem > 0 && setCurrentItem((prevState) => prevState - 1);
  };

  const handleNext = () => {
    carouselNextButton.click();
    currentItem < 7 && setCurrentItem((prevState) => prevState + 1);
  };

  carouselPrevButton?.setAttribute("style", "display: none");
  carouselNextButton?.setAttribute("style", "display: none");
  carouselWrapper?.setAttribute("style", "margin: 0");

  useLayoutEffect(() => {
    let elm = document.getElementsByClassName(
      "ThumbnailGallery_dots__wrapper__VnoGy",
    )[0].children[0];

    if (elm) elm.style.justifyContent = "center";
  }, []);

  return (
    <div className={styles.container}>
      <Carousel itemsToShow={1} pagination={false}>
        {[...Array(7)].map((_, index) => (
          <div key={index} className={styles.image__wrapper}>
            <img src={Image} />
          </div>
        ))}
      </Carousel>
      <div className={styles.left__arrow} onClick={() => handlePrev()}>
        <ReactSVG src={ChevronLeft} />
      </div>
      <div className={styles.right__arrow} onClick={() => handleNext()}>
        <ReactSVG src={ChevronRight} />
      </div>
      <div className={styles.dots__wrapper}>
        <CarouselDots
          style={{ justifyContent: "center" }}
          numItems={7}
          currentItem={currentItem}
        />
      </div>
    </div>
  );
}
