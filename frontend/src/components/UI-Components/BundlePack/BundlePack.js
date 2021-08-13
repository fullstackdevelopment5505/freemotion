import React, { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import Button from "../Button/Button";
import styles from "./BundlePack.module.scss";
import ClipboardIcon from "../../../svgs/copy.svg";
import PlusIcon from "../../../svgs/plus.svg";
import WheelImage from "../../../images/wheel.png";
import UnicycleImage from "../../../images/unicycle.png";
import { renderCurrencyLocale } from "../../../helpers/renderCurrency";
import axios from "axios";

export default function BundlePack({
  mainProductData,
  secondaryProductId,
  setShowChangeProductModal,
  bundleTotal,
  setBundleTotal,
}) {
  console.log(mainProductData);
  console.log(bundleTotal);

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

  return (
    <React.Suspense fallback={<p>Loading Bundle Data...</p>}>
      <div className={styles.container}>
        <h4>Buy Together And Save</h4>
        <div className={styles.bundle__wrapper}>
          <div className={styles.mainContent__wrapper}>
            <div className={styles.mainProduct__wrapper}>
              <div className={styles.image__wrapper}>
                <img
                  src={mainProductData.productImage}
                  alt={mainProductData.productName}
                />
              </div>
              <h4>{mainProductData.productName}</h4>
            </div>
            <div className={styles.plus__wrapper}>
              <ReactSVG src={PlusIcon} />
            </div>
            <div className={styles.secondaryProduct__wrapper}>
              <div className={styles.top}>
                <div className={styles.image__wrapper}>
                  <img
                    src={secondaryProductData?.productImage?.url}
                    alt={secondaryProductData?.productName}
                  />
                </div>
                <div className={styles.content__wrapper}>
                  <h4>{secondaryProductData?.productName}</h4>
                  <div className={styles.price__wrapper}>
                    <div>
                      <span>
                        {renderCurrencyLocale(
                          secondaryProductData?.currentPrice,
                        )}
                      </span>
                    </div>
                    <div>
                      <span>
                        {renderCurrencyLocale(secondaryProductData?.oldPrice)}
                      </span>
                      <div className={styles.horizontal__rule} />
                    </div>
                  </div>
                </div>
              </div>
              <span onClick={() => setShowChangeProductModal(true)}>
                Change Product
              </span>
            </div>
          </div>
          <div className={styles.pack__footer}>
            <div className={styles.sku__data}>
              <div className={styles.wrapper}>
                <div className={styles.sku__wrapper}>
                  <span>SKU:</span>
                  <span>{secondaryProductData?.sku}</span>
                </div>
                <ReactSVG
                  src={ClipboardIcon}
                  onClick={() =>
                    navigator.clipboard.writeText(secondaryProductData.sku)
                  }
                />
              </div>
            </div>
            <div className={styles.footerOptions__wrapper}>
              <div className={styles.price__wrapper}>
                <p>{renderCurrencyLocale(bundleTotal)}</p>
              </div>
              <Button content={"Buy Bundle"} />
            </div>
          </div>
        </div>
      </div>
    </React.Suspense>
  );
}
