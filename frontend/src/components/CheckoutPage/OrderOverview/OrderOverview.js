import React from "react";
import styles from "./OrderOverview.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import KlarnaLogo from "../../../logos/klarna.png";
import PaypalLogo from "../../../logos/paypal.png";
import PaybrightLogo from "../../../logos/paybright.png";
import MastercardLogo from "../../../logos/mastercard.png";
import AELogo from "../../../logos/americanexpress.png";
import VisaLogo from "../../../logos/visa.png";
import { useHistory } from "react-router-dom";
import { renderCurrencyLocale } from "../../../helpers/renderCurrency";

export const SummaryProduct = ({
  id,
  productImage,
  productName,
  quantity,
  price,
}) => {
  const history = useHistory();

  return (
    <div
      className={styles.product}
      onClick={() => {
        console.log(id);
        history.push(`/products/${id}`);
      }}>
      <div className={styles.image__wrapper}>
        <img src={productImage} alt={productName} />
      </div>
      <div className={styles.productInfo}>
        <div className={styles.nameQuantity__wrapper}>
          <p>{productName}</p>
          <p>Quantity: {quantity}</p>
        </div>
        <span>{renderCurrencyLocale(price)}</span>
      </div>
    </div>
  );
};

const getCartTotal = (cartProducts) => {
  let cartTotal = 0;
  for (let i = 0; i < cartProducts.length; i++)
    cartTotal += cartProducts[i].currentPrice * cartProducts[i].quantity;
  return cartTotal;
};

export default function OrderOverview({ orderStep, loggedUser, products }) {
  const shippingAddress = useSelector((state) => state.shippingAddress.address);
  const billingAddress = useSelector((state) => state.billingAddress.address);
  let cartTotal = getCartTotal(products);

  return (
    <div className={styles.container}>
      {loggedUser === false && (
        <span className={styles.x}>Login and checkout faster</span>
      )}
      <div className={styles.overview__container}>
        <div className={styles.orderSummary}>
          <h4>Order Summary</h4>
          <div className={styles.priceOverview}>
            <div>
              <span>Shipping</span>
              <span>{renderCurrencyLocale(100)}</span>
            </div>
            <div>
              <span>Subtotal</span>
              <span>{renderCurrencyLocale(cartTotal)}</span>
            </div>
            <div>
              <span>Total</span>
              <span>{renderCurrencyLocale(cartTotal)}</span>
            </div>
          </div>
        </div>
        <div className={styles.orderDetails}>
          <div className={styles.header}>
            <h4>Order Details</h4>
            <span>Edit</span>
          </div>
          <div className={styles.overviewProducts__wrapper}>
            {products.map((product, index) => (
              <SummaryProduct
                id={product.sys.id}
                key={index}
                productImage={product.productImage.url}
                productName={product.productName}
                quantity={product.quantity}
                price={product.currentPrice}
              />
            ))}
          </div>
        </div>
        {!!(orderStep != 1) && (
          <div className={styles.shippingAddress}>
            <div className={styles.shippingContainer}>
              <div>
                <p>Shipping Address</p>
                <FontAwesomeIcon icon={faPen} />
              </div>
              <div>
                <span>
                  {shippingAddress.firstName + " " + shippingAddress.lastName}
                </span>
                <span>{shippingAddress.streetAddressLine1}</span>
                <span>{shippingAddress.streetAddressLine2}</span>
                <span>
                  {shippingAddress.city}, {shippingAddress.region},{" "}
                  {shippingAddress.zipCode}, {shippingAddress.country}
                </span>
                <span>{shippingAddress.phoneNumber}</span>
              </div>
            </div>
            <div className={styles.billingContainer}>
              <div>
                <p>Billing Address</p>
                <FontAwesomeIcon icon={faPen} />
              </div>
              <div>
                <span>
                  {billingAddress.firstName + " " + billingAddress.lastName}
                </span>
                <span>{billingAddress.streetAddressLine1}</span>
                <span>{billingAddress.streetAddressLine2}</span>
                <span>
                  {billingAddress.city}, {billingAddress.region},{" "}
                  {billingAddress.zipCode}, {billingAddress.country}
                </span>
                <span>{billingAddress.phoneNumber}</span>
                <span>{billingAddress.email}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.acceptedPaymentMethods__container}>
        <p>Accepted Payment Methods</p>
        <div className={styles.methods__container}>
          <img src={KlarnaLogo} alt="Klarna" />
          <img src={PaybrightLogo} alt="Paybright" />
          <img src={VisaLogo} alt="Visa" />
          <img src={AELogo} alt="American Express" />
          <img src={MastercardLogo} alt="Mastercard" />
          <img src={PaypalLogo} alt="PayPal" />
        </div>
      </div>
    </div>
  );
}
