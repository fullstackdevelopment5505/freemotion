import React from "react";
import { ReactSVG } from "react-svg";
import styles from "./DealsDropdown.module.scss";

import DealsOfTheDayIcon from "../../../../svgs/deals/deals_of_the_day.svg";
import RepeatCustomerDiscountIcon from "../../../../svgs/deals/repeat_customer_discount.svg";
import GroupPurchaseIcon from "../../../../svgs/deals/group_purchase.svg";
import BundleAndSaveIcon from "../../../../svgs/deals/bundle_and_save.svg";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const DealCard = ({ icon, title, url, handleClick }) => (
  <div className={styles.card__wrapper} onClick={() => handleClick(url)}>
    <div className={styles.svg__wrapper}>
      <ReactSVG src={icon} />
    </div>
    <h4>{title}</h4>
  </div>
);

export default function DealsDropdown({ setShowDealsDropdown }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const dealsCardsData = [
    {
      icon: DealsOfTheDayIcon,
      title: "Deals of the day",
      url: "/deals",
    },
    {
      icon: RepeatCustomerDiscountIcon,
      title: "Repeat Customer Discount",
      url: "/deals",
    },
    {
      icon: GroupPurchaseIcon,
      title: "Group Purchase",
      url: "/deals",
    },
    {
      icon: BundleAndSaveIcon,
      title: "Bundle & Save",
      url: "/deals",
    },
  ];

  const handleClick = (url) => {
    history.push(`${url}`);
  };

  return (
    <div
      className={styles.container}
      onMouseOver={() => setShowDealsDropdown(true)}>
      <div
        className={styles.wrapper}
        onMouseLeave={() => setShowDealsDropdown(false)}>
        {dealsCardsData.map((card, index) => (
          <DealCard
            icon={card.icon}
            title={card.title}
            key={index}
            url={card.url}
            handleClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
}
