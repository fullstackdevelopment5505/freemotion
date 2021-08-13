import React, { useState, useEffect } from "react";
import styles from "./CartProducts.module.scss";
import Product from "./Product/Product";
import { default as MobileProduct } from "../../Mobile/ShoppingCartProduct/ShoppingCartProduct";
import { renderCurrencyLocale } from "../../../helpers/renderCurrency";

export default function CartProducts({ products, setProducts }) {
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const getCartTotal = (products) => {
      let total = 0;
      Object.keys(products).forEach(
        (product) =>
          (total += products[product].price * products[product].quantity),
      );
      setCartTotal(total);
    };

    getCartTotal(products);
  }, [products]);

  return (
    <div className={styles.products__container}>
      <div className={styles.fields__wrapper}>
        <span>Product</span>
        <span>Quantity</span>
        <span>Total</span>
      </div>
      <div className={styles.products__wrapper}>
        {Object.keys(products).map((product) => {
          console.log(product);
          return window.screen.width < 576 ? (
            <MobileProduct
              key={products[product].productId}
              productName={products[product].productName}
              brand={products[product].brand}
              price={products[product].price}
              defQuantity={products[product].quantity}
              productId={product}
              productImage={products[product].productImage}
              itemsInStock={products[product].itemsInStock}
              setProducts={setProducts}
            />
          ) : (
            <Product
              key={products[product].productId}
              productName={products[product].productName}
              brand={products[product].brand}
              price={products[product].price}
              defQuantity={products[product].quantity}
              productId={product}
              productImage={products[product].productImage}
              itemsInStock={products[product].itemsInStock}
              setProducts={setProducts}
            />
          );
        })}
      </div>
      <div className={styles.subtotal__wrapper}>
        <div className={styles.positioner} />
        <div className={styles.wrapper}>
          <span>Subtotal: </span>
          <span>{renderCurrencyLocale(cartTotal)}</span>
        </div>
      </div>
    </div>
  );
}
