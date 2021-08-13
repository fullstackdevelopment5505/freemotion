import React from "react";
import styles from "./AccountNavigation.module.scss";

import MyAccountIcon from "../../../svgs/my_account.svg";
import OrdersIcon from "../../../svgs/orders.svg";
import ShippingIcon from "../../../svgs/shipping_billing.svg";
import ProfileIcon from "../../../svgs/profile.svg";
import AffiliateIcon from "../../../svgs/affiliate.svg";
import RightChevron from "../../../svgs/right_chevron.svg";
import { ReactSVG } from "react-svg";
import { useHistory } from "react-router-dom";

export default function AccountNavigation() {
  const history = useHistory();

  return (
    <div className={styles.container}>
      <ul className={styles.pages__wrapper}>
        <li onClick={() => history.push("/account")}>
          <div className={styles.wrapper}>
            <ReactSVG className={styles.icon} src={MyAccountIcon} />
            <span>My Account</span>
          </div>
          <ReactSVG src={RightChevron} />
        </li>
        <li onClick={() => history.push("/account/orders")}>
          <div className={styles.wrapper}>
            <ReactSVG src={OrdersIcon} />
            <span>Orders</span>
          </div>
          <ReactSVG src={RightChevron} />
        </li>
        <li onClick={() => history.push("/account/billing")}>
          <div className={styles.wrapper}>
            <ReactSVG src={ShippingIcon} />
            <span>Shipping / Billing</span>
          </div>
          <ReactSVG src={RightChevron} />
        </li>
        <li onClick={() => history.push("/account/profile")}>
          <div className={styles.wrapper}>
            <ReactSVG src={ProfileIcon} />
            <span>Profile</span>
          </div>
          <ReactSVG src={RightChevron} />
        </li>
        <li onClick={() => history.push("/account/affiliate/overview")}>
          <div className={styles.wrapper}>
            <ReactSVG src={AffiliateIcon} />
            <span>Affiliate Program</span>
          </div>
          <ReactSVG src={RightChevron} />
        </li>
      </ul>
    </div>
  );
}
