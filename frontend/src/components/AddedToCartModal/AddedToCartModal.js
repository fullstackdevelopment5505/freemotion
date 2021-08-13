import React, { useState, useEffect, useRef } from "react";
import Button from "../UI-Components/Button/Button";
import Button2 from "../UI-Components/Button2/Button2";
import styles from "./AddedToCartModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import productImage from "../../images/e-Unicycles 2.png";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { renderCurrencyLocale } from "../../helpers/renderCurrency";

function useOutsideAlerter(ref, setShowATCModal) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowATCModal(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export const CartModalProduct = ({
  productName,
  brand,
  price,
  quantity,
  productImage,
}) => (
  <div className={styles.cartProduct__wrapper}>
    <div className={styles.image__wrapper}>
      <img src={productImage} alt={productName} />
    </div>
    <div className={styles.productInfo}>
      <div className={styles.top__wrapper}>
        <p>{productName}</p>
        <span>{brand}</span>
        <p>{renderCurrencyLocale(price)}</p>
      </div>
      <p>
        Quantity: <span>{quantity}</span>
      </p>
    </div>
  </div>
);

export default function AddedToCartModal({ modalProductId, setShowATCModal }) {
  const history = useHistory();
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowATCModal);
  const shoppingCartProductsIds = useSelector(
    (state) => state.shoppingCart.products,
  );
  const numShoppingCartProducts = shoppingCartProductsIds.length;

  const [total, setTotal] = useState(0);
  const [productData, setProductData] = useState({});

  const checkout = () => {
    history.push("/checkout/1");
  };

  const viewCart = () => {
    history.push("/cart");
  };

  useEffect(() => {
    let query = `
      query {
        product(id: "${modalProductId}") {
          productName
          brand
          currentPrice
          productImage {
            url
          }
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

      setProductData(result.data.data.product);
      console.log(result.data.data.product);
    };

    fetchProductData();

    let queryHeader = ``;

    if (shoppingCartProductsIds.length > 0) {
      queryHeader = `(where: {sys: {id_in: [`;
      for (let i = 0; i < shoppingCartProductsIds.length; i++) {
        queryHeader += `"${shoppingCartProductsIds[i].productId}"`;
        if (i < shoppingCartProductsIds.length - 1) queryHeader += `, `;
      }
      queryHeader += `]}})`;
    }

    const fetchCartProducts = async () => {
      let query = `
        query {
          productCollection${queryHeader} {
            items {
              currentPrice
            }
          }
        }
      `;

      const result = await axios({
        method: "post",
        url: `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}?access_token=EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
        data: JSON.stringify({ query }),
        headers: {
          Authorization: `Bearer EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
          "Content-Type": "application/json",
        },
      });

      let products = result.data.data.productCollection.items;

      products.forEach((product) =>
        setTotal((prevState) => prevState + product.currentPrice),
      );
    };

    fetchCartProducts();
  }, []);

  return (
    <div className={styles.overshadow}>
      <div ref={wrapperRef} className={styles.modal__wrapper}>
        <div className={styles.header}>
          <h4>Successfully Added to Cart!</h4>
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => setShowATCModal(false)}
          />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.products__list}>
            <CartModalProduct
              productName={productData.productName}
              brand={productData.brand}
              price={productData.currentPrice}
              quantity={1}
              productImage={productData.productImage?.url}
            />
          </div>
          <div className={styles.cart__overview}>
            <div className={styles.cart__info__wrapper}>
              <h6>Your Cart</h6>
              <div className={styles.cart__info}>
                <p>{numShoppingCartProducts} items</p>
                <div>
                  <p>Sub Total:</p>
                  <p>{renderCurrencyLocale(total)}</p>
                </div>
                <div>
                  <p>Shipping:</p>
                  <p>FREE</p>
                </div>
              </div>
              <div className={styles.total}>
                <p>Total:</p>
                <p>{renderCurrencyLocale(total)}</p>
              </div>
            </div>
            <div className={styles.options}>
              <Button content={"View Cart"} handleClick={viewCart} />
              <Button2 content={"Checkout"} handleClick={checkout} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
