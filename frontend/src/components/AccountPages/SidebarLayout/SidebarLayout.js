import React, { useState, useEffect } from "react";
import styles from "./SidebarLayout.module.scss";
import { useHistory } from "react-router-dom";

import MyAccountIcon from "../../../svgs/home.svg";
import OrdersIcon from "../../../svgs/orders.svg";
import ShippingIcon from "../../../svgs/shipping_billing.svg";
import ProfileIcon from "../../../svgs/profile.svg";
import AffiliateIcon from "../../../svgs/affiliate.svg";
import LogoutIcon from "../../../svgs/logout.svg";
import { ReactSVG } from "react-svg";
import { FirebaseContext } from "../../Firebase";

export default function SidebarLayout() {
  const history = useHistory();

  const [activePanel, setActivePanel] = useState(0);

  useEffect(() => {
    const url = window.location.pathname;
    if (url == "/account") setActivePanel(0);
    if (url == "/account/orders") setActivePanel(1);
    if (url == "/account/billing") setActivePanel(2);
    if (url == "/account/profile") setActivePanel(3);
    if (url.includes("/account/affiliate")) setActivePanel(4);
  }, []);

  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <div className={styles.sidebar__wrapper}>
          <ul className={styles.pages__wrapper}>
            <li
              onClick={() => history.push("/account")}
              style={{ borderRight: activePanel === 0 && "1px solid #ff5722" }}>
              <ReactSVG
                className={styles.icon}
                src={MyAccountIcon}
                className={activePanel === 0 && styles.active}
              />
              <span style={{ color: activePanel === 0 && "#ff5722" }}>
                My Account
              </span>
            </li>
            <li
              onClick={() => history.push("/account/orders")}
              style={{ borderRight: activePanel === 1 && "1px solid #ff5722" }}>
              <ReactSVG
                src={OrdersIcon}
                className={activePanel === 1 && styles.active}
              />
              <span style={{ color: activePanel === 1 && "#ff5722" }}>
                Orders
              </span>
            </li>
            <li
              onClick={() => history.push("/account/billing")}
              style={{ borderRight: activePanel === 2 && "1px solid #ff5722" }}>
              <ReactSVG
                src={ShippingIcon}
                className={activePanel === 2 && styles.active}
              />
              <span style={{ color: activePanel === 2 && "#ff5722" }}>
                Shipping / Billing
              </span>
            </li>
            <li
              onClick={() => history.push("/account/profile")}
              style={{ borderRight: activePanel === 3 && "1px solid #ff5722" }}>
              <ReactSVG
                src={ProfileIcon}
                className={activePanel === 3 && styles.active}
              />
              <span style={{ color: activePanel === 3 && "#ff5722" }}>
                Profile
              </span>
            </li>
            <li
              onClick={() => history.push("/account/affiliate/overview")}
              style={{ borderRight: activePanel === 4 && "1px solid #ff5722" }}>
              <ReactSVG
                src={AffiliateIcon}
                className={activePanel === 4 && styles.active}
              />
              <span style={{ color: activePanel === 4 && "#ff5722" }}>
                Affiliate Program
              </span>
            </li>
          </ul>
          <div
            className={styles.logout__wrapper}
            onClick={() => firebase.doSignOut()}>
            <ReactSVG src={LogoutIcon} />
            <span>Log Out</span>
          </div>
        </div>
      )}
    </FirebaseContext.Consumer>
  );
}
