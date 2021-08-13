import React, { useState, useEffect } from "react";
import styles from "./OrderDetailsModal.module.scss";
import ProductImage from "../../../../images/e-Unicycles 2.png";
import axios from "axios";
import TimesIcon from "../../../../svgs/modal_times.svg";
import { ReactSVG } from "react-svg";
import { withFirebase } from "../../../Firebase";
import { DateTime } from "luxon";
import { renderCurrencyLocale } from "../../../../helpers/renderCurrency";

require("dotenv").config();

const fetchProductsThumbnails = async (productsIds) => {
  let queryFilters = [];
  let queryHeader = "";
  let queryVariables = {};

  for (let i = 1; i <= productsIds.length; i++) {
    queryFilters.push(`id${i}`);
    i < productsIds.length
      ? (queryHeader += `$id${i}: String!, `)
      : (queryHeader += `$id${i}: String!`);
    queryVariables[`id${i}`] = productsIds[i - 1];
  }

  console.log(queryVariables);

  const query = `
    {
      query(${queryHeader}) {
        productCollection(where: {sys: {id_in:[${queryFilters}]} }) {
          items {
            productImage {
              url
            }
          }
        }
      }
    }  
  `;

  var data = JSON.stringify({
    query,
    variables: queryVariables,
  });

  var config = {
    method: "post",
    url: `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/?access_token=EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
    headers: {
      Authorization: `Bearer EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
      "Content-Type": "application/json",
    },
    data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const OrderProductBlock = ({ name, image, price, quantity }) => (
  <div className={styles.orderProduct}>
    <div className={styles.firstCol}>
      <img src={ProductImage} alt={name} />
      <span>{name}</span>
    </div>
    <span className={styles.quantity}>{quantity}</span>
    <span className={styles.price}>{renderCurrencyLocale(price)}</span>
  </div>
);

const renderShippingAddress = (data) => {
  const address = data?.streetAddressLine1 + " " + data?.streetAddressLine2;
  const zip = data?.zipCode;
  const city = data?.city;
  const country = data?.country;
  const region = data?.region;
  const phone = data?.phoneNumber;

  console.log(data);

  return (
    address +
    ", " +
    city +
    ", " +
    region +
    ", " +
    zip +
    ", " +
    country +
    ", " +
    phone
  );
};

function OrderDetailsModal({ firebase, orderId, setShowOrderDetails }) {
  const [orderData, setOrderData] = useState({});
  const [orderProducts, setOrderProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      const order = await firebase.order(orderId);
      const products = order.data().products;
      let productsIds = [];
      console.log(order.data());

      products.forEach((product) => productsIds.push(product.productId));

      setOrderProducts(products);
      setOrderData(order.data());

      fetchProductsThumbnails(productsIds);
    };

    fetchOrderData();
  }, []);

  return (
    <div className={styles.overshadow}>
      <div className={styles.modal__wrapper}>
        <div className={styles.header}>
          <div
            className={styles.close__wrapper}
            onClick={() => setShowOrderDetails(false)}>
            <ReactSVG src={TimesIcon} />
          </div>
          <div className={styles.topRow}>
            <div>
              <span>Order</span>
              <span>#{orderId}</span>
            </div>
            <div>
              <span>Date</span>
              <span>{orderData.placedAt}</span>
            </div>
            <div>
              <span>Status</span>
              <span>{orderData.status}</span>
            </div>
          </div>
          <div className={styles.bottomRow}>
            <span>Shipping Address</span>
            <span>
              {orderData.customerName +
                " " +
                renderShippingAddress(orderData?.customerShippingAddress)}
            </span>
          </div>
        </div>
        <div className={styles.orderProducts__container}>
          <div className={styles.tags}>
            <span>Product</span>
            <span>Quantity</span>
            <span>Price</span>
          </div>
          <div className={styles.products__wrapper}>
            {!!orderProducts &&
              orderProducts.map((product) => (
                <OrderProductBlock
                  key={product.productId}
                  price={product.price}
                  name={product.productName}
                  quantity={1}
                />
              ))}
          </div>
          <div className={styles.orderOverview}>
            <div className={styles.top__wrapper}>
              <div>
                <span>Subtotal: </span>
                <span>{renderCurrencyLocale(orderData.cartTotal)}</span>
              </div>
              <div>
                <span>Shipping: </span>
                <span>Free</span>
              </div>
            </div>
            <div className={styles.bottom__wrapper}>
              <span>Total: </span>
              <span>{renderCurrencyLocale(orderData.cartTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

OrderDetailsModal = withFirebase(OrderDetailsModal);

export default OrderDetailsModal;
