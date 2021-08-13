import React, { useState, useEffect } from "react";
import Button from "../../UI-Components/Button/Button";
import Button2 from "../../UI-Components/Button2/Button2";
import styles from "./AddToComparisonModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import productImage from "../../../images/e-Unicycles 2.png";
import { ReactSVG } from "react-svg";
import ScaleIcon from "../../../svgs/scale.svg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToComparison } from "../../../actions/comparisonActions";
import { renderCurrencyLocale } from "../../../helpers/renderCurrency";

export const ModalProduct = ({
  productName,
  productImage,
  productId,
  oldPrice,
  newPrice,
  setSelectedProductsToBeAdded,
}) => {
  return (
    <div className={styles.product__wrapper}>
      <div className={styles.product__header}>
        <div>
          <img src={productImage} alt="e-unicycle" />
          <h4>{productName}</h4>
        </div>
        <div className={styles.content__wrapper}>
          <div className={styles.price__wrapper}>
            <div className={styles.x__wrapper}>
              <div className={styles.oldPrice}>
                <span>{renderCurrencyLocale(oldPrice)}</span>
                <div className={styles.bar} />
              </div>
            </div>
            <div className={styles.newPrice}>
              <span>{renderCurrencyLocale(newPrice)}</span>
            </div>
          </div>
          <ReactSVG
            src={ScaleIcon}
            onClick={() =>
              setSelectedProductsToBeAdded((prevState) => [
                ...prevState,
                productId,
              ])
            }
          />
        </div>
      </div>
    </div>
  );
};

export default function AddToComparisonModal({ setShowModal }) {
  const dispatch = useDispatch();

  const productsCategories = [
    "All Products",
    "Electric Unicycles",
    "Electric Scooters",
    "Electric Skateboards",
  ];
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [selectedProductsToBeAdded, setSelectedProductsToBeAdded] = useState(
    [],
  );

  const addSelectedProductsToComparison = () => {
    selectedProductsToBeAdded.forEach((productId) => {
      dispatch(addToComparison(productId));
    });
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const queryHeader =
      selectedCategory == "All Products"
        ? ``
        : `(where: {category: "${selectedCategory}"})`;

    const query = `
      query {
        productCollection${queryHeader} {
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
            maxLoad
            maxRange
            motorType
            maxSpeed
            maxClimbAngle
            wheelSize
            description {
              json
            }
            colorOptions
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

      console.log(result.data.data.productCollection.items);
    };

    console.log(query);

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className={styles.overshadow}>
      <div className={styles.modal__wrapper}>
        <div className={styles.header}>
          <h4>Add To Comparison</h4>
          <FontAwesomeIcon icon={faTimes} onClick={() => setShowModal(false)} />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.productCategories__nav}>
            <ul>
              {productsCategories.map((category, index) => (
                <li
                  style={
                    category === selectedCategory
                      ? {
                          borderBottom: "1px solid #ff5722",
                          color: "#ff5722",
                        }
                      : {}
                  }
                  onClick={() => setSelectedCategory(category)}>
                  <span>{category}</span>
                </li>
              ))}
            </ul>
          </div>
          <React.Suspense fallback={<p>Loading Products...</p>}>
            <div className={styles.products__container}>
              {products.map((product, index) => (
                <ModalProduct
                  key={index}
                  productName={product.productName}
                  productId={product.sys?.id}
                  productImage={product.productImage.url}
                  oldPrice={product.oldPrice}
                  setSelectedProductsToBeAdded={setSelectedProductsToBeAdded}
                  newPrice={product.currentPrice}
                />
              ))}
            </div>
          </React.Suspense>
        </div>
        <div className={styles.footer}>
          <div className={styles.buttons__wrapper}>
            <Button2 content={"Cancel"} />
            <Button
              buttonType={"submit"}
              content={"Add To Compare"}
              handleClick={addSelectedProductsToComparison}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
