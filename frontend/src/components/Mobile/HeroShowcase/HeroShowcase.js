import React, { useState } from "react";
import styles from "./HeroShowcase.module.scss";
import { useHistory } from "react-router-dom";
import Carousel from "react-elastic-carousel";
import ShowcaseCarouselDots from "../ShowcaseCarouselDots/ShowcaseCarouselDots";
import { ReactSVG } from "react-svg";
import { renderCurrencyLocale } from "../../../helpers/renderCurrency";

import LeftChevron from "../../../svgs/left_white_chevron.svg";
import RightChevron from "../../../svgs/right_white_chevron.svg";

export default function HeroShowcase({ products }) {
  const history = useHistory();
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

  const prevProduct = () => {
    carouselPrevButton.click();
    currentItem > 0 && setCurrentItem((prevState) => prevState - 1);
  };

  const nextProduct = () => {
    carouselNextButton.click();
    currentItem < 7 && setCurrentItem((prevState) => prevState + 1);
  };

  carouselPrevButton?.setAttribute("style", "display: none");
  carouselNextButton?.setAttribute("style", "display: none");
  carouselWrapper?.setAttribute("style", "margin: 0");

  return (
    <div className={styles.container}>
      <div className={styles.leftArrow} onClick={() => prevProduct()}>
        <ReactSVG src={LeftChevron} />
      </div>
      <div className={styles.rightArrow} onClick={() => nextProduct()}>
        <ReactSVG src={RightChevron} />
      </div>
      <ShowcaseCarouselDots numItems={3} currentItem={currentItem} />
      <Carousel itemsToShow={1} pagination={false}>
        {products.map((product) => (
          <div className={styles.showcaseProduct}>
            <img src={product.showcaseImage?.url} alt={product.productName} />
            <div className={styles.card__textContent}>
              <h3 className={styles.product__name}>{product.productName}</h3>
              <h5 className={styles.product__description}>
                {product.showcaseDescription}
              </h5>
              <div className={styles.price__wrapper}>
                <div className={styles.oldPrice__wrapper}>
                  <span>{renderCurrencyLocale(product.oldPrice)}</span>
                  <div className={styles.diagonal__price__line} />
                </div>
                <span>{renderCurrencyLocale(product.currentPrice)}</span>
                <button
                  onClick={() => history.push(`/products/${product.sys.id}`)}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
