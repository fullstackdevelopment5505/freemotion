import React, { useState, useEffect, useRef } from "react";
import Button from "../../UI-Components/Button/Button";
import styles from "./Payment.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Switch from "../../UI-Components/Switch/Switch";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import CustomCheckbox from "../../UI-Components/CustomCheckbox/CustomCheckbox";
import { ReactSVG } from "react-svg";
import { clearCart } from "../../../actions/shoppingCartActions";

// Logos Imports

import ChevronRight from "../../../svgs/chevron_right.svg";

import us_flag from "../../../logos/us_flag.png";
import canada_flag from "../../../logos/canada_flag.png";
import klarna_logo from "../../../logos/klarna.png";
import info_icon from "../../../logos/info_icon.png";
import paybright_logo from "../../../logos/paybright.png";
import paypal_logo from "../../../logos/paypal.png";

import { useHistory } from "react-router-dom";
import { withFirebase } from "../../Firebase";

import { renderCurrencyLocale } from "../../../helpers/renderCurrency";

require("dotenv").config();

const contentful = require("contentful-management");
const client = contentful.createClient({
  accessToken: "CFPAT-9djfGPi-y6loHuG2DfHszb5O-Xw9l83iaQhw-b4W7yc",
});

// // // // // // // // // // // // // // // // // //

const TooltipComponent = ({ title, tooltipContent }) => {
  return (
    <div className={styles.tooltip__container}>
      {title}
      <span className={styles.tooltip}>{tooltipContent}</span>
    </div>
  );
};

const PlanCard = ({
  numMonths,
  index,
  selectedPlan,
  setSelectedPlan,
  cartTotal,
}) => {
  const checkBox = useRef();

  return (
    <div
      className={styles.planCard__wrapper}
      onClick={() => {
        setSelectedPlan(index);
        checkBox.current.checked = true;
      }}
      style={
        selectedPlan === index
          ? {
              borderColor: "#ff5722",
            }
          : {}
      }>
      <input ref={checkBox} type="radio" name="plan" />
      <span>
        {renderCurrencyLocale((cartTotal / numMonths).toFixed(2))}
        /mo. for {numMonths} months
      </span>
    </div>
  );
};

const getCartOrderItems = (cartProducts) => {
  let orderProducts = [];

  cartProducts.forEach((product) => {
    orderProducts.push({
      productId: product.sys.id,
      productName: product.productName,
      brand: product.brand,
      quantity: product.quantity,
      sku: product.sku,
      price: product.currentPrice,
    });
  });

  return orderProducts;
};

const getCartTotal = (cartProducts) => {
  let cartTotal = 0;

  cartProducts.forEach(
    (product) =>
      (cartTotal += parseFloat(product.currentPrice * product.quantity)),
  );

  return cartTotal;
};

const getDate = () => {
  var dateObj = new Date();
  var month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  var date = ("0" + dateObj.getDate()).slice(-2);
  var year = dateObj.getFullYear();
  var shortDate = date + "/" + month + "/" + year;
  return shortDate;
};

let Payment = ({ firebase, products, setStage }) => {
  const dispatch = useDispatch();
  const orderNotes = useSelector((state) => state.orderNotes.orderNotes);
  const shippingAddress = useSelector((state) => state.shippingAddress.address);
  const billingAddress = useSelector((state) => state.billingAddress.address);
  const [saveInfo, setSaveInfo] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const orderProducts = getCartOrderItems(products);
  const date = getDate();

  const history = useHistory();

  const placeOrder = async () => {
    const orderId = uuid();
    const cartTotal = getCartTotal(products);

    // Retrieve Logged User's Id to track the review creator
    const user = await JSON.parse(localStorage.getItem("authUser"));
    const userId = user.uid;

    const order = firebase.fdb.collection("orders").doc(orderId);

    // Format Entry Data
    await order
      .set({
        id: orderId,
        products: orderProducts,
        placedAt: date,
        customerId: userId,
        customerName:
          shippingAddress.firstName + " " + shippingAddress.lastName,
        customerShippingAddress: {
          city: shippingAddress.city,
          country: shippingAddress.country,
          region: shippingAddress.region,
          streetAddressLine1: shippingAddress.streetAddressLine1,
          streetAddressLine2: shippingAddress.streetAddressLine2,
          zipCode: shippingAddress.zipCode,
          phoneNumber: shippingAddress.phoneNumber
            ? shippingAddress.phoneNumber
            : "",
        },
        customerBillingAddress: {
          city: billingAddress.city,
          country: billingAddress.country,
          region: billingAddress.region,
          streetAddressLine1: billingAddress.streetAddressLine1,
          streetAddressLine2: billingAddress.streetAddressLine2,
          zipCode: billingAddress.zipCode,
          phoneNumber: billingAddress.phoneNumber
            ? billingAddress.phoneNumber
            : "",
          email: billingAddress.email,
        },
        orderNotes,
        cartTotal,
        status: "active",
        trackingProvider: "",
        trackingNumber: "",
      })
      .then(() => {
        // If the order was successful, we'll empty the shopping cart
        dispatch(clearCart());
      })
      .then(() => {
        // Update entry by substracting the product quantities bought
        // from the entry's items available index
        orderProducts.forEach((product) =>
          client
            .getSpace(process.env.REACT_APP_CONTENTFUL_SPACE_ID)
            .then((space) => space.getEnvironment("master-2021-02-10"))
            .then((environment) => environment.getEntry(product.productId))
            .then((entry) => {
              entry.fields.itemsInStock["en-US"] =
                entry.fields.itemsInStock["en-US"] - product.quantity;
              entry.fields.numberSoldProducts["en-US"] =
                entry.fields.numberSoldProducts["en-US"] + product.quantity;
              return entry.update();
            })
            .then((entry) => console.log(`Entry ${entry.sys.id} updated.`))
            .catch(console.error),
        );
      })
      .then(() => history.push("/checkout/3"))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setStage(2);
  }, []);

  return (
    <div className={styles.container}>
      <h2>Payment Method</h2>
      <div className={styles.paymentSetup__container}>
        <div className={styles.us__orders}>
          <Switch />
          <img
            src={klarna_logo}
            alt={"Klarna"}
            style={{ marginLeft: "2.5rem" }}
          />
          <TooltipComponent
            title={
              <img
                src={info_icon}
                alt={"info"}
                style={{ marginBottom: "-3px" }}
              />
            }
            tooltipContent={
              <span>
                What is <span>klarna</span> ?
              </span>
            }
          />
          <img src={us_flag} alt={"us payments"} />
          <span>For US Orders</span>
        </div>
        <div className={styles.paySubscription__wrapper}>
          <h5>Pay Over Time</h5>
          <div className={styles.availablePlans__wrapper}>
            {[8, 12].map((plan, index) => (
              <PlanCard
                key={index}
                numMonths={plan}
                index={index}
                cartTotal={getCartTotal(products)}
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
              />
            ))}
          </div>
          <div className={styles.planError__wrapper}>
            <div className={styles.wrapper}>
              <FontAwesomeIcon icon={faInfoCircle} />
              <p>
                There has been an error with your address. Please check the
                following fields:
              </p>
            </div>
            <ul>
              <li>
                <span>phone</span>
              </li>
            </ul>
          </div>
          <div className={styles.plansInsight__wrapper}>
            <ul>
              <li>
                <span>Minimum total: $1,990</span>
              </li>
              <li>
                <span>APRs from 0% - 19.99%</span>
              </li>
              <li>
                <span>No impact on credit score to check eligibility</span>
              </li>
            </ul>
            <p>
              Promotional offer. Subject to a potential $2 monthly minimum
              interest charge and <span>credit terms</span>. Accounts are issued
              by WebBank
            </p>
          </div>
          <div className={styles.otherPaymentOptions__container}>
            <div className={styles.paybright__container}>
              <div className={styles.switch__wrapper}>
                <Switch />
              </div>
              <div className={styles.info__wrapper}>
                <div className={styles.logo__wrapper}>
                  <img src={paybright_logo} alt={"paybright"} />
                  <TooltipComponent
                    title={
                      <img
                        src={info_icon}
                        alt={"info"}
                        style={{ marginBottom: "-3px" }}
                      />
                    }
                    tooltipContent={
                      <span>
                        What is <span>klarna</span> ?
                      </span>
                    }
                  />
                </div>
                <div className={styles.country__wrapper}>
                  <img src={canada_flag} alt={"Canadian Orders"} />
                  <span>For Canadian Orders</span>
                </div>
              </div>
            </div>
            <div className={styles.paypal__container}>
              <div className={styles.switch__wrapper}>
                <Switch />
              </div>
              <div className={styles.info__wrapper}>
                <div className={styles.logo__wrapper}>
                  <img src={paypal_logo} alt={"paypal"} />
                  <TooltipComponent
                    title={
                      <img
                        src={info_icon}
                        alt={"info"}
                        style={{ marginBottom: "-3px" }}
                      />
                    }
                    tooltipContent={
                      <span>
                        What is <span>klarna</span> ?
                      </span>
                    }
                  />
                </div>
                <div className={styles.country__wrapper}>
                  <div className={styles.us_cad__wrapper}>
                    <img src={us_flag} alt={"US"} />
                    <img src={canada_flag} alt={"Canada"} />
                  </div>
                  <p>
                    Pay via PayPal; you can pay with your credit card if you
                    don’t have a PayPal account
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.saveInfo}>
            <CustomCheckbox
              checked={saveInfo}
              setChecked={setSaveInfo}
              labelContent={"Save my information for a faster checkout"}
              inputName={"saveInfo"}
            />
            <p className={styles.tc__agreement}>
              By clicking Place Order you agree to the{" "}
              <span>Terms & Conditions.</span>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <button type="button" onClick={() => placeOrder()}>
          <span>Place Order</span>
          <div className={styles.svg__wrapper}>
            <ReactSVG src={ChevronRight} />
          </div>
        </button>
      </div>
    </div>
  );
};

Payment = withFirebase(Payment);

export default Payment;
