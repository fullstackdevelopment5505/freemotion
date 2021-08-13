import React, { useState, useEffect } from "react";
import styles from "./BundlePack.module.scss";
import { ReactSVG } from "react-svg";
import ClipboardIcon from "../../../svgs/copy.svg";
import PlusIcon from "../../../svgs/plus.svg";
import axios from "axios";
import Button from "../../UI-Components/Button/Button";
import { renderCurrencyLocale } from "../../../helpers/renderCurrency";

export default function BundlePack({
  mainProductData,
  secondaryProductId,
  setShowChangeProductModal,
  bundleTotal,
  setBundleTotal,
}) {
  const [secondaryProductData, setSecondaryProductData] = useState({});

  const query = `
    query {
      product(id: "${secondaryProductId}") {
        productName
        oldPrice
        currentPrice
        productImage {
          url
        }
        sku
      }
    }
  `;

  const fetchProductData = async () => {
    const result = await axios({
      method: "post",
      url: `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}?access_token=EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
      data: JSON.stringify({ query }),
      headers: {
        Authorization: `Bearer EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
        "Content-Type": "application/json",
      },
    });

    setSecondaryProductData(result.data.data.product);
    console.log(result.data.data.product);
    setBundleTotal(
      (prevState) => prevState + result.data.data.product.currentPrice,
    );
  };

  useEffect(() => {
    fetchProductData();
  }, [secondaryProductId]);

  const buyBundle = () => {};

  return (
    <React.Suspense fallback={<p>Loading Bundle Data...</p>}>
      <div className={styles.container}>
        <div className={styles.products__wrapper}>
          <div className={styles.plus__wrapper}>
            <ReactSVG src={PlusIcon} />
          </div>
          <div className={styles.mainProduct__wrapper}>
            <div className={styles.image__wrapper}>
              <img
                src={mainProductData.productImage}
                alt={mainProductData.productName}
              />
            </div>
            <div className={styles.info}>
              <h3>{mainProductData.productName}</h3>
              <div className={styles.price__wrapper}>
                <span>
                  {renderCurrencyLocale(mainProductData.currentPrice)}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.secondaryProduct__wrapper}>
            <div className={styles.content__wrapper}>
              <div className={styles.image__wrapper}>
                <img
                  src={secondaryProductData?.productImage?.url}
                  alt={secondaryProductData?.productName}
                />
              </div>
              <div className={styles.info}>
                <h3>{secondaryProductData?.productName}</h3>
                <div className={styles.price__wrapper}>
                  <div className={styles.newPrice}>
                    <span>{renderCurrencyLocale(1000)}</span>
                  </div>
                  <div className={styles.oldPrice}>
                    <span>
                      {renderCurrencyLocale(secondaryProductData?.oldPrice)}
                    </span>
                    <div className={styles.horizontal__rule} />
                  </div>
                </div>
              </div>
            </div>
            <span
              className={styles.changeProduct}
              onClick={() => setShowChangeProductModal(true)}>
              Change Product
            </span>
          </div>
        </div>
        <div className={styles.bundle__info__wrapper}>
          <div className={styles.price__wrapper}>
            <span>{renderCurrencyLocale(bundleTotal)}</span>
          </div>
          <Button content={"Buy Bundle"} />
          <div className={styles.bundle__data}>
            <div className={styles.sku}>
              <span>SKU: </span>
              <span>2231</span>
            </div>
            <ReactSVG
              src={ClipboardIcon}
              onClick={() =>
                navigator.clipboard.writeText(secondaryProductData.sku)
              }
            />
          </div>
        </div>
      </div>
    </React.Suspense>
  );
}
