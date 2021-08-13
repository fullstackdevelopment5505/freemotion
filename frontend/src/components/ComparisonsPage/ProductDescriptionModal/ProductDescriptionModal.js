import React, { useState, useEffect } from "react";
import styles from "./ProductDescriptionModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import axios from "axios";

export default function ProductDescriptionModal({
  setShowDescriptionModal,
  productId,
}) {
  const [product, setProduct] = useState({});

  const query = `
    query {
      product(id: "${productId}") {
        productName
        sku
        oldPrice
        currentPrice
        colorOptions
        description {
          json
        }
        productImage {
          url
        }
        maxRange
        motorType
        maxSpeed
        maxLoad
        maxClimbAngle
        wheelSize
        sys {
          id
        }
        itemsInStock
      }
    }
  `;

  useEffect(() => {
    const fetchProduct = async () => {
      const result = await axios({
        method: "post",
        url: `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}?access_token=EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
        data: JSON.stringify({ query }),
        headers: {
          Authorization: `Bearer EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
          "Content-Type": "application/json",
        },
      });
      setProduct(result.data.data.product);
    };

    fetchProduct();

    console.log(product);
  }, [productId]);

  return (
    <React.Suspense fallback={<p>Loading Product Data...</p>}>
      <div className={styles.overshadow}>
        <div className={styles.modal__wrapper}>
          <div className={styles.header}>
            <h4>Description</h4>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => setShowDescriptionModal(false)}
            />
          </div>
          <div className={styles.wrapper}>
            <h2>{product.productName}</h2>
            {documentToReactComponents(product.description?.json)}
          </div>
        </div>
      </div>
    </React.Suspense>
  );
}
