import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./RecommendedProducts.module.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReactSVG } from "react-svg";
import {
  addItemToWishlist,
  removeWishlistItem,
} from "../../../../actions/wishlistActions";
import Carousel from "react-elastic-carousel";
import { addToCart } from "../../../../actions/shoppingCartActions";
import CarouselDots from "../../../Mobile/CarouselDots/CarouselDots";
import { renderCurrencyLocale } from "../../../../helpers/renderCurrency";

// Icons

import EmptyHeartIcon from "../../../../svgs/empty_heart.svg";
import FullHeartIcon from "../../../../svgs/full_heart.svg";

require("dotenv").config();

export const RelatedProductCard = ({
  productImage,
  productName,
  productId,
  oldPrice,
  newPrice,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const wishlistProductsId = useSelector((state) => state.wishlist.items);

  const [wishlistProduct, setWishlistProduct] = useState(false);

  useEffect(() => {
    setWishlistProduct(wishlistProductsId.includes(productId));
  }, []);

  return (
    <div className={styles.productCard}>
      <div className={styles.image__wrapper} onClick={() => {}}>
        <img
          src={productImage}
          alt={productName}
          onClick={() => history.push(`/products/${productId}`)}
        />
      </div>
      <div className={styles.content__wrapper}>
        <h5>{productName}</h5>
        <div className={styles.price__wrapper}>
          <div className={styles.wrapper}>
            <div className={styles.oldPrice}>
              <span>{renderCurrencyLocale(oldPrice)}</span>
              <div className={styles.bar} />
            </div>
          </div>
          <div className={styles.newPrice}>
            <span>{renderCurrencyLocale(newPrice)}</span>
          </div>
        </div>
        <div className={styles.purchase__wrapper}>
          {wishlistProduct ? (
            <ReactSVG
              beforeInjection={(svg) => {
                svg.setAttribute("style", `width: 1.1rem`);
                svg.setAttribute("style", `height: 1.1rem`);
                svg.setAttribute("style", `margin-bottom: -6px`);
                svg.children[0].setAttribute("style", `stroke: #ff5722`);
              }}
              src={FullHeartIcon}
              onClick={() => {
                setWishlistProduct(false);
                dispatch(removeWishlistItem(productId));
              }}
            />
          ) : (
            <ReactSVG
              beforeInjection={(svg) => {
                svg.setAttribute("style", `width: 1.1rem`);
                svg.setAttribute("style", `height: 1.1rem`);
                svg.setAttribute("style", `margin-bottom: -6px`);
              }}
              src={EmptyHeartIcon}
              onClick={() => {
                setWishlistProduct(true);
                dispatch(addItemToWishlist(productId));
              }}
            />
          )}
          <div
            className={styles.wrapper}
            onClick={() => dispatch(addToCart(productId, 1))}>
            <span>Buy now</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function RelatedProducts() {
  const [products, setProducts] = useState([]);
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
  };

  const nextProduct = () => {
    carouselNextButton.click();
  };

  carouselPrevButton?.setAttribute("style", "display: none");
  carouselNextButton?.setAttribute("style", "display: none");
  carouselWrapper?.setAttribute("style", "margin: 0");

  useEffect(() => {
    const query = `
      query {
        productCollection {
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
    <div className={styles.relatedProducts__wrapper}>
      {products.length && (
        <div className={styles.header}>
          {window.screen.width < 768 ? (
            <div className={styles.wrapper}>
              <h3>Recommended Products</h3>
              <CarouselDots numItems={7} currentItem={currentItem} />{" "}
            </div>
          ) : (
            <h3>Recommended Products</h3>
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
      <div className={styles.relatedProducts__container}>
        <Carousel
          itemsToShow={window.screen.width < 768 ? 1 : 4}
          enableSwipe={window.screen.width < 768 ? true : false}
          pagination={false}>
          {products.length > 0 &&
            products.map((product) => (
              <RelatedProductCard
                key={product.sys.id}
                productId={product.sys.id}
                productImage={product.productImage.url}
                productName={product.productName}
                oldPrice={product.oldPrice}
                newPrice={product.currentPrice}
              />
            ))}
        </Carousel>
      </div>
    </div>
  );
}
