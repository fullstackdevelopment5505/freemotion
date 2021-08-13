import React from "react";
import Layout from "../components/Layout";
import styles from "../styles/ShippingPage.module.scss";
import { ReactSVG } from "react-svg";

import MovingTruck from "../svgs/shipping_moving_truck.svg";
import DutyFreeLogo from "../svgs/dutyfree_banner.svg";

import UPSLogo from "../svgs/shipping_logos/ups.svg";
import DHLLogo from "../svgs/shipping_logos/dhlexpress.svg";
import FEDEXLogo from "../svgs/shipping_logos/fedex.svg";
import USPOSTALSERVICELogo from "../svgs/shipping_logos/uspostalservice.svg";

export default function ShippingPage() {
  const shippingMethods = [
    {
      name: "UPS",
      icon: UPSLogo,
      number: "1-800-742-5877 ",
    },
    {
      name: "Us Postal Service",
      icon: USPOSTALSERVICELogo,
      number: "1-800-742-5877 ",
    },
    {
      name: "FedEx",
      icon: FEDEXLogo,
      number: "1-800-742-5877 ",
    },
    {
      name: "DHL Express",
      icon: DHLLogo,
      number: "1-800-742-5877 ",
    },
  ];

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.banner}>
          <div className={styles.left__wrapper}>
            <div className={styles.textContent}>
              <span>FREE SHIPPING</span>
              <span>from Los Angeles across USA & Canada</span>
            </div>
            <ReactSVG src={MovingTruck} />
          </div>
          <ReactSVG src={DutyFreeLogo} />
        </div>
        <h2>Shipping Methods</h2>
        <p>
          We work with the following carriers to deliver items. If you have an
          issue with your delivery, you can contact the carrier directly.{" "}
        </p>
        <div className={styles.shippingMethods__container}>
          {shippingMethods.map((_, index) => (
            <div key={index} className={styles.shippingMethod__wrapper}>
              <div className={styles.wrapper}>
                <ReactSVG src={_.icon} />
                <h4>{_.name}</h4>
              </div>
              <span className={styles.number}>{_.number}</span>
            </div>
          ))}
        </div>
        <div className={styles.orderTracking__container}>
          <h2>Order traking</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
          <h3>Order traking tips & considerations</h3>
          <p>
            *Please allow 1-2 additional business days processing time for all
            personalized products
          </p>
          <p>*Shipping times may vary during high volume order periods</p>
          <p>
            If your order has not shipped after three business days, you will
            receive an email notifying you. Some reasons for the delay could
            include the following:
          </p>
          <ul>
            <li>
              <span>
                We are experiencing higher order volume during this time
              </span>
            </li>
            <li>
              <span>
                Item(s) in your order may be on backorder in the next 72 hours
              </span>
            </li>
            <li>
              <span>
                Item(s) in your order may be out of stock due to high demand
              </span>
            </li>
            <li>
              <span>
                Shipping address outside of the continental United States
              </span>
            </li>
            <li>
              <span>
                A payment issue may have occurred while placing the order
              </span>
            </li>
          </ul>
          <p>
            If you need further assistance, please contact us at (626) 295-6599,
            and we are happy to assist.
          </p>
        </div>
        <div className={styles.shippingTime__container}>
          <h3>Shipping time</h3>
          <p>
            Due to the coronavirus's impact and the mandates in place, your
            order may experience a shipping delay. This delay is due to several
            factors, including travel restrictions, available staffing, and/or
            federal/state/local mandates.
          </p>
          <ul>
            <li>
              <span>
                Standard shipping is 3-5 days plus an additional 1-3 days for
                processing.
              </span>
            </li>
            <li>
              <span>
                Standard shipping of Personalized product is 3-5 days plus 2-6
                days for processing.
              </span>
            </li>
          </ul>
        </div>
        <div className={styles.returnPolicy__container}>
          <h3>Return Policy</h3>
          <p>
            FreeMotion is happy to offer 14 days of free returns. A return
            request must meet the following criteria:
          </p>
          <ul>
            <li>
              <span>Receiving defects or the wrong item</span>
            </li>
            <li>
              <span>Delayed shipment</span>
            </li>
            <li>
              <span>
                We will apply restocking fees for opened, tested, or used items
                depending on the condition of the item.
              </span>
            </li>
            <li>
              <span>
                We, unfortunately, must require a 10% restocking fee for
                customer changing their minds or refusing a shipment.
              </span>
            </li>
            <li>
              <span>
                All customers must provide a Return Merchandise Authorization
                (RMA) code and a reason for the return.
              </span>
            </li>
            <li>
              <span>
                We will gladly provide your refund 3 days after we receive the
                item and inspect it.
              </span>
            </li>
            <li>
              <span>
                Any shipping charges incurred when returning the product to
                FreeMotion are the responsibility of the customer. -Returned
                products must be undamaged, clean, and in otherwise new
                condition with all original materials i.e. original packaging,
                manuals, and accessories, and must be accompanied by the
                original invoice.
              </span>
            </li>
            <li>
              <span>
                All customers must provide a Return Merchandise Authorization
                (RMA) code and a reason for the return. Contact us for an RMA
                code.
              </span>
            </li>
            <li>
              <span>
                We, unfortunately, must charge a minimum of 10% restocking fee
                for customers simply changing their minds or refusing a shipment
                without one of the listed reasons.
              </span>
            </li>
            <li>
              <span>Defective Device</span>
            </li>
            <li>
              <span>Wrong Item received</span>
            </li>
            <li>
              <span>Severely delayed shipment</span>
            </li>
            <li>
              <span>
                We might apply additional restocking fees for opened, tested, or
                used items depending on the condition of the item, on a case by
                case basis.
              </span>
            </li>

            <li>
              <span>
                Any shipping charges incurred when returning the product to
                FreeMotion are the responsibility of the customer.
              </span>
            </li>
            <li>
              <span>
                All returned items will be inspected and a refund will be issued
                within 3 business days of receipt of the item.
              </span>
            </li>
            <li>
              <span>
                Returned products must be undamaged, clean, and in otherwise new
                condition with all original materials i.e. original packaging,
                manuals, and accessories, and must be accompanied by the
                original invoice.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
