import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import CartProducts from "../components/ShoppingCartPage/CartProducts/CartProducts";
import OrderSummary from "../components/ShoppingCartPage/OrderSummary/OrderSummary";
import RelatedProducts from "../components/ShoppingCartPage/SuggestedProductsSection/RelatedProducts";
import styles from "../styles/ShoppingCartPage.module.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { ReactSVG } from "react-svg";

// Payment Methods Logos
import KlarnaLogo from "../svgs/logos_2/ic_klarna.svg";
import PaypalLogoX from "../svgs/logos_2/ic_paypal.svg";
import PaybrightLogo from "../svgs/logos_2/ic_pb.svg";
import MastercardLogo from "../svgs/logos_2/ic_master.svg";
import AELogo from "../svgs/logos_2/ic_ae.svg";
import VisaLogo from "../svgs/logos_2/ic_visa.svg";

const filterProducts = (products) => {
  let filteredProducts = {};
  for (let i = 0; i < products.length; i++) {
    const productId = products[i].sys.id;
    filteredProducts[productId] = {
      brand: products[i].brand,
      price: products[i].currentPrice,
      itemsInStock: products[i].itemsInStock,
      productImage: products[i].productImage.url,
      productName: products[i].productName,
      quantity: products[i].quantity,
      sku: products[i].sku,
    };
  }

  return filteredProducts;
};

export default function ShoppingCartPage() {
  // Shopping Cart Fetching State
  const shippingCartProductsIds = useSelector(
    (state) => state.shoppingCart.products,
  );
  const [products, setProducts] = useState([]);

  // Fetch Shopping Cart Products
  useEffect(() => {
    let queryHeader = ``;

    console.log(shippingCartProductsIds);
    if (shippingCartProductsIds.length > 0) {
      queryHeader = `(where: {sys: {id_in: [`;
      for (let i = 0; i < shippingCartProductsIds.length; i++) {
        queryHeader += `"${shippingCartProductsIds[i].productId}"`;
        if (i < shippingCartProductsIds.length - 1) queryHeader += `, `;
      }
      queryHeader += `]}})`;
    }

    const query = `
      query {
        productCollection${queryHeader} {
          items {
            productName
            sku
            oldPrice
            currentPrice
            brand
            productImage {
              url
            }
            sys {
              id
            }
            itemsInStock
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

      let xProducts = result.data.data.productCollection.items;

      if (xProducts.length)
        for (let i = 0; i < xProducts.length; i++) {
          for (let j = 0; j < shippingCartProductsIds.length; j++)
            if (xProducts[i].sys.id == shippingCartProductsIds[j].productId) {
              xProducts[i].quantity = shippingCartProductsIds[j].quantity;
              setProducts((prevState) => ({
                ...prevState,
                [xProducts[i].sys.id]: xProducts[i],
              }));
            }

          setProducts(filterProducts(xProducts));
        }
    };

    if (shippingCartProductsIds.length > 0) fetchProducts();
  }, []);

  return (
    <Layout>
      <div className={styles.cart__container}>
        <div className={styles.header}></div>
        <div className={styles.wrapper}>
          <div className={styles.cart__mainInterface__wrapper}>
            <CartProducts products={products} setProducts={setProducts} />
            {window.screen.width < 992 ? (
              <div className={styles.orderSummary__wrapper}>
                <OrderSummary products={products} />
                <div className={styles.acceptedPaymentMethods__container}>
                  <p>Accepted Payment Methods</p>
                  <div className={styles.methods__container}>
                    <ReactSVG src={KlarnaLogo} alt="Klarna" />
                    <ReactSVG src={PaybrightLogo} alt="Paybright" />
                    <ReactSVG src={VisaLogo} alt="Visa" />
                    <ReactSVG src={AELogo} alt="American Express" />
                    <ReactSVG src={MastercardLogo} alt="Mastercard" />
                    <ReactSVG src={PaypalLogoX} alt="PayPal" />
                  </div>
                </div>
              </div>
            ) : null}
            <RelatedProducts />
          </div>
          {window.screen.width >= 992 ? (
            <div className={styles.orderSummary__wrapper}>
              <OrderSummary products={products} />
              <div className={styles.acceptedPaymentMethods__container}>
                <p>Accepted Payment Methods</p>
                <div className={styles.methods__container}>
                  <ReactSVG src={KlarnaLogo} alt="Klarna" />
                  <ReactSVG src={PaybrightLogo} alt="Paybright" />
                  <ReactSVG src={VisaLogo} alt="Visa" />
                  <ReactSVG src={AELogo} alt="American Express" />
                  <ReactSVG src={MastercardLogo} alt="Mastercard" />
                  <ReactSVG src={PaypalLogoX} alt="PayPal" />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}
