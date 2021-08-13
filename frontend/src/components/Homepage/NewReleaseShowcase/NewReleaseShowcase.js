import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import styles from "./NewReleaseShowcase.module.scss";
import ProductCard from "./ProductCard/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Carousel from "react-elastic-carousel";
import CarouselDots from "../../Mobile/CarouselDots/CarouselDots";
require("dotenv").config();

export default function NewReleaseShowcase({ loading, setLoading }) {
  const [currentItem, setCurrentItem] = useState(0);
  const [products, setProducts] = useState([]);

  const numCarouselRenderedItems = () => {
    const width = window.screen.width;
    if (width < 768) return 1;
  };

  const carouselWrapper = document.getElementsByClassName(
    "rec-slider-container",
  )[1];

  let buttonIndex = window.screen.width < 768 ? 2 : 0;

  const carouselPrevButton = document.getElementsByClassName("rec-arrow-left")[
    buttonIndex
  ];
  const carouselNextButton = document.getElementsByClassName("rec-arrow-right")[
    buttonIndex
  ];

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
      productCollection(order: sys_firstPublishedAt_DESC) {
        items {
          productName
          productImage {
            url
          }
          sku
          oldPrice
          brand
          currentPrice
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
        url: `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/`,
        data: {
          query,
        },
        headers: {
          Authorization: `Bearer EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
          "Content-Type": "application/json",
        },
      });

      // Show First Three Products ---> Change Later for carousel
      setProducts(result.data.data.productCollection.items);
    };

    fetchProducts();

    setLoading(false);
  }, []);

  return (
    <div className={styles.showcase__wrapper}>
      <div className={styles.showcase}>
        {products.length && (
          <div className={styles.header}>
            {window.screen.width < 768 ? (
              <div className={styles.wrapper}>
                <h3>New Releases</h3>
                <CarouselDots numItems={7} currentItem={currentItem} />{" "}
              </div>
            ) : (
              <h3>New Releases</h3>
            )}
            <div className={styles.controller}>
              <button onClick={() => prevProduct()}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button onClick={() => nextProduct()}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        )}
        <div className={styles.products__container}>
          <Carousel
            itemsToShow={window.screen.width < 768 ? 1 : 3}
            enableSwipe={window.screen.width < 768 ? true : false}
            pagination={false}>
            {!!products &&
              products.map((product, index) => (
                <ProductCard
                  key={index}
                  name={product.productName}
                  review={4}
                  oldPrice={product.oldPrice}
                  newPrice={product.currentPrice}
                  image={product.productImage.url}
                  productId={product.sys.id}
                />
              ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
