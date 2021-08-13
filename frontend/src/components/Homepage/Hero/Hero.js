import React, { useEffect, useState } from "react";
import styles from "./Hero.module.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import HeroShowcase from "../../Mobile/HeroShowcase/HeroShowcase";
import { renderCurrencyLocale } from "../../../helpers/renderCurrency";

var currencyFormatter = require("currency-formatter");

export default function Hero() {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [leftShowcaseProducts, setLeftShowcaseProducts] = useState([]);
  const [rightShowcaseProduct, setRightShowcaseProduct] = useState({});

  const query = `
    query {
      productCollection(where: { showcaseProduct: true }, order:showcasePlaceOrder_ASC) {
        items {
          productName
          showcasePlaceOrder
          oldPrice
          currentPrice
          productImage {
            url
          }
          showcaseImage {
            url
          }
          productName
          sys {
            id
          }
          showcaseDescription 
        }
      }
    }
  `;

  useEffect(() => {
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

      setLeftShowcaseProducts(
        result.data.data.productCollection.items.slice(0, 2),
      );

      setRightShowcaseProduct(
        result.data.data.productCollection.items.slice(2, 3)[0],
      );

      console.log(result.data.data.productCollection.items.slice(2, 3)[0]);
    };

    fetchProducts();
  }, []);

  return window.screen.width < 768 ? (
    <HeroShowcase products={products} />
  ) : (
    <div className={styles.hero__container}>
      <div className={styles.leftCol}>
        {leftShowcaseProducts.map((product) => (
          <div className={styles.hero__small__card}>
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
      </div>
      <div className={styles.rightCol}>
        <div className={styles.hero__big__card}>
          <img
            src={rightShowcaseProduct.showcaseImage?.url}
            alt={rightShowcaseProduct.productName}
          />
          <div className={styles.card__textContent}>
            <h3 className={styles.product__name}>
              {rightShowcaseProduct.productName}
            </h3>
            <h5 className={styles.product__description}>
              {rightShowcaseProduct.showcaseDescription}
            </h5>
            <div className={styles.price__wrapper}>
              <div className={styles.oldPrice__wrapper}>
                <span>
                  {renderCurrencyLocale(rightShowcaseProduct.oldPrice)}
                </span>
                <div className={styles.diagonal__price__line} />
              </div>
              <span>
                {renderCurrencyLocale(rightShowcaseProduct.currentPrice)}
              </span>
              <button
                onClick={() =>
                  history.push(`/products/${rightShowcaseProduct.sys.id}`)
                }>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
