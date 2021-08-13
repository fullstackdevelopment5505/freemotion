import React, { useEffect, useState } from "react";
import styles from "./ShoppingCartProduct.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ReactSVG } from "react-svg";
import BinIcon from "../../../svgs/trash_bin.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementProductQuantity,
  decrementProductQuantity,
  removeFromCart,
} from "../../../actions/shoppingCartActions";

export default function ShoppingCartProduct({
  productName,
  brand,
  price,
  defQuantity,
  productImage,
  productId,
  itemsInStock,
  setProducts,
}) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(null);

  const quantityUp = (quantity, productId) => {
    if (quantity < itemsInStock) {
      setQuantity((prevState) => prevState + 1);
      console.log(productId);
      setProducts((prevState) => ({
        ...prevState,
        [productId]: {
          ...prevState[productId],
          quantity: quantity,
        },
      }));
      console.log(quantity);
      dispatch(incrementProductQuantity(productId));
    }
  };

  const quantityDown = (quantity) => {
    if (quantity > 0) {
      setQuantity((prevState) => prevState - 1);
      setProducts((prevState) => ({
        ...prevState,
        [productId]: {
          ...prevState[productId],
          quantity: quantity,
        },
      }));
      console.log(quantity);
      dispatch(decrementProductQuantity(productId));
    }
  };

  useEffect(() => {
    setQuantity(defQuantity);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.top__row}>
        <div className={styles.image__wrapper}>
          <img src={productImage} alt={productName} />
        </div>
        <div className={styles.info__wrapper}>
          <h3>{productName}</h3>
          <span className={styles.brand}>{brand}</span>
          <div className={styles.delete__wrapper}>
            <ReactSVG
              src={BinIcon}
              onClick={() => dispatch(removeFromCart(productId))}
            />
            <span>Delete</span>
          </div>
        </div>
      </div>
      <div className={styles.bottom__row}>
        <div className={styles.quantity__wrapper}>
          <button onClick={() => quantityDown(quantity, productId)}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <div>
            <span>{quantity ? quantity : defQuantity}</span>
          </div>
          <button onClick={() => quantityUp(quantity, productId)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <span className={styles.price}>C${price}</span>
      </div>
    </div>
  );
}
