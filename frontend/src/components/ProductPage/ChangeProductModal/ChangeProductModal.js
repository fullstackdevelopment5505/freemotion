import React, { useState, useEffect } from "react";
import styles from "./ChangeProductModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export const ModalProduct = ({
  productName,
  productImage,
  productId,
  setSecondaryProductId,
  oldPrice,
  newPrice,
}) => (
  <div
    className={styles.product__wrapper}
    onClick={() => setSecondaryProductId(productId)}>
    <div className={styles.product__header}>
      <div>
        <img src={productImage} alt="e-unicycle" />
        <h4>{productName}</h4>
      </div>
      <div className={styles.content__wrapper}>
        <div className={styles.price__wrapper}>
          <div className={styles.x__wrapper}>
            <div className={styles.oldPrice}>
              <span>C$ {oldPrice}</span>
              <div className={styles.bar} />
            </div>
          </div>
          <div className={styles.newPrice}>
            <span>C$ {newPrice}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function ChangeProductModal({
  setShowChangeProductModal,
  setSecondaryProductId,
}) {
  const [products, setProducts] = useState([]);
  const [productsCategory, setProductsCategory] = useState(0);
  const productsCategories = [
    "All categories",
    "Electric Unicycles",
    "Electric Scooters",
    "Electric Skateboards",
    "Extras",
  ];

  const getCategoryByIndex = (categoryIndex) => {
    switch (categoryIndex) {
      case 0:
        return "";
      case 1:
        return "Electric Unicycles";
      case 2:
        return "Electric Scooters";
      case 3:
        return "Electric Skateboards";
      case 4:
        return "Extras";
    }
  };

  useEffect(() => {
    let category = getCategoryByIndex(productsCategory);

    const queryHeader =
      productsCategory > 0
        ? `productCollection (where: {category: "${category}"})`
        : `productCollection`;

    const query = `
      query {
         ${queryHeader} {
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

    // fetch products depending on selected category
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

      console.log(result.data.data.productCollection.items);

      setProducts(result.data.data.productCollection.items);
    };

    fetchProducts();

    // console.log(query);
  }, [productsCategory]);

  return (
    <div className={styles.overshadow}>
      <div className={styles.modal__wrapper}>
        <div className={styles.header}>
          <h4>Change Product</h4>
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => setShowChangeProductModal(false)}
          />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.productCategories__nav}>
            <ul>
              {productsCategories.map((category, index) => (
                <li
                  style={
                    index === productsCategory
                      ? {
                          borderBottom: "1px solid #ff5722",
                          color: "#ff5722",
                        }
                      : {}
                  }
                  onClick={() => setProductsCategory(index)}>
                  <span>{category}</span>
                </li>
              ))}
            </ul>
          </div>
          <React.Suspense fallback={<p>Loading...</p>}>
            <div className={styles.products__container}>
              {products.length ? (
                products.map((product) => (
                  <ModalProduct
                    productName={product.productName}
                    oldPrice={product.oldPrice}
                    newPrice={product.currentPrice}
                    productId={product.sys.id}
                    productImage={product.productImage.url}
                    setSecondaryProductId={setSecondaryProductId}
                    key={product.sys.id}
                  />
                ))
              ) : (
                <p>There aren't any products available...</p>
              )}
            </div>
          </React.Suspense>
        </div>
      </div>
    </div>
  );
}
