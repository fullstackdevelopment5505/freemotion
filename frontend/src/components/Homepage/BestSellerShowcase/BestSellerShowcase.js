import React, { useEffect, useState } from "react";
import styles from "./BestSellerShowcase.module.scss";
import ProductBlock from "./ProductBlock/ProductBlock";
import ShowcasedBestSeller from "./ShowcasedBestSeller/ShowcasedBestSeller";
import BestSellerImage from "../../../images/image 20.png";
import ScooterImage from "../../../images/scooter 4.png";
import HoverboardImage from "../../../images/Hoverboards 4.png";
import FloatingController from "./FloatingController/FloatingController";
import axios from "axios";
import Carousel from "react-elastic-carousel";
import CarouselDots from "../../Mobile/CarouselDots/CarouselDots";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
require("dotenv").config();

// Create a scroll controller component as well

export default function BestSellerShowcase() {
  const [products, setProducts] = useState([]);
  const [currentItem, setCurrentItem] = useState(0);

  let numItemsToShow;

  if (window.screen.width < 768) numItemsToShow = 1;
  if (window.screen.width >= 768 && window.screen.width < 992)
    numItemsToShow = 1;
  if (window.screen.width >= 992) numItemsToShow = 2;

  const carouselWrapper = document.getElementsByClassName(
    "rec-slider-container",
  )[0];

  const carouselPrevButton =
    window.screen.width < 768
      ? document.getElementsByClassName("rec-arrow-left")[1]
      : document.getElementsByClassName("rec-arrow-up")[0];
  const carouselNextButton =
    window.screen.width < 768
      ? document.getElementsByClassName("rec-arrow-right")[1]
      : document.getElementsByClassName("rec-arrow-down")[0];

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

  useEffect(() => {
    const query = `
      query {
        productCollection(order: numberSoldProducts_DESC) {
          items {
            productName
            productImage {
              url
            }
            sku
            oldPrice
            brand
            currentPrice
            maxSpeed
            battery
            motorType
            sys {
              id
            }
          }
        }
      }
    `;

    const fetchProducts = async () => {
      const result = await axios({
        method: "post",
        url: `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}?access_token=EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
        data: JSON.stringify({ query }),
        headers: {
          Authorization: `Bearer EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
          "Content-Type": "application/json",
        },
      });

      setProducts(result.data.data.productCollection.items);
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.showcase__container}>
      <div className={styles.main__block}>
        {!!products[0] && (
          <ShowcasedBestSeller
            image={BestSellerImage}
            name={products[0].productName}
            description={"Foldable electric scooter 250W motor waterproof"}
            rating={4}
            oldPrice={products[0].oldPrice}
            newPrice={products[0].currentPrice}
            speedInfo={products[0].maxSpeed}
            batteryInfo={products[0].battery}
            motorInfo={products[0].motorType}
            productId={products[0].sys.id}
          />
        )}
      </div>
      {window.screen.width < 768 ? (
        <div className={styles.mobileHeader}>
          <CarouselDots currentItem={currentItem} numItems={7} />
          <div className={styles.controller}>
            <button onClick={() => prevProduct()}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button onClick={() => nextProduct()}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      ) : null}
      <div className={styles.right__showcase}>
        <Carousel
          itemsToShow={numItemsToShow}
          enableSwipe={window.screen.width < 768 ? true : false}
          pagination={false}
          verticalMode={window.screen.width < 768 ? false : true}>
          {!!products &&
            products
              .slice(1)
              .map((product) => (
                <ProductBlock
                  name={product.productName}
                  key={product.sys.id}
                  oldPrice={product.oldPrice}
                  newPrice={product.currentPrice}
                  image={product.productImage.url}
                  productId={product.sys.id}
                />
              ))}
        </Carousel>
      </div>
      {window.screen.width < 768 ? null : (
        <FloatingController
          products={products}
          prevProduct={prevProduct}
          nextProduct={nextProduct}
        />
      )}
    </div>
  );
}
