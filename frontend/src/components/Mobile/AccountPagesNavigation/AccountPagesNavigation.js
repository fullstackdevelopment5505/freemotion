import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./AccountPagesNavigation.module.scss";

export default function AccountPagesNavigation() {
  const history = useHistory();
  const navigationViews = [
    {
      content: "Account",
      link: "/account",
    },
    {
      content: "Orders",
      link: "/account/orders",
    },
    {
      content: "Shipping / Billing",
      link: "/account/billing",
    },
    {
      content: "Profile",
      link: "/account/profile",
    },
    {
      content: "Affiliate Program",
      link: "/account/affiliate",
    },
  ];

  return (
    <div className={styles.navigation__wrapper}>
      <ul>
        {navigationViews.map((view, index) => (
          <li key={index} onClick={() => history.push(view.link)}>
            <span>{view.content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
