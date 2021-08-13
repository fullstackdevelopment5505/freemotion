import React, { useState } from "react";
import styles from "./PhotosVideosSection.module.scss";
import Carousel from "react-elastic-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import CarouselDots from "../../CarouselDots/CarouselDots";

import Image1 from "../../../../images/gallery/CURRUS_NF_10_1.jpg";
import Image2 from "../../../../images/gallery/CURRUS_NF_10_2.jpg";
import Image3 from "../../../../images/gallery/CURRUS_NF_10_3.jpg";
import Image4 from "../../../../images/gallery/CURRUS_NF_10_4.jpg";
import Image5 from "../../../../images/gallery/CURRUS_NF_10_6.jpg";

let images = [Image1, Image2, Image3, Image4, Image5];

export default function PhotosVideosSection() {
  const [currentItem, setCurrentItem] = useState(0);

  const carouselWrapper = document.getElementsByClassName(
    "rec-slider-container",
  )[1];
  const carouselPrevButton = document.getElementsByClassName(
    "rec-arrow-left",
  )[1];
  const carouselNextButton = document.getElementsByClassName(
    "rec-arrow-right",
  )[1];

  const prevProduct = () => {
    carouselPrevButton.click();
    currentItem > 0 && setCurrentItem((prevState) => prevState - 1);
  };

  const nextProduct = () => {
    carouselNextButton.click();
    currentItem < images.length - 1 &&
      setCurrentItem((prevState) => prevState + 1);
  };

  carouselPrevButton?.setAttribute("style", "display: none");
  carouselNextButton?.setAttribute("style", "display: none");
  carouselWrapper?.setAttribute("style", "margin: 0");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.wrapper}>
          <h3>Photos And Videos</h3>
          <CarouselDots numItems={images.length} currentItem={currentItem} />
        </div>
        <div className={styles.controller}>
          <button onClick={() => prevProduct()}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button onClick={() => nextProduct()}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
      <div className={styles.carousel__wrapper}>
        <Carousel itemsToShow={1} pagination={false}>
          {images.map((_, index) => (
            <div className={styles.image__wrapper}>
              <img src={_} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
