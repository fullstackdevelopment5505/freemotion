import React from "react";
import styles from "./Hero.module.scss";
import BackgroundImage from "../../../images/image 2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faClipboard,
  faCertificate,
  faDollarSign,
  faTruckMoving,
} from "@fortawesome/free-solid-svg-icons";
import Button2 from "../../UI-Components/Button2/Button2";
import { ReactSVG } from "react-svg";

import SearchIcon from "../../../svgs/search.svg";

export const SupportCategoryCard = ({ icon, category }) => (
  <div className={styles.card__wrapper}>
    <FontAwesomeIcon icon={icon} />
    <span>{category}</span>
  </div>
);

export default function HelpPagesLayout({
  inputValue,
  setInputValue,
  category,
  setCategory,
}) {
  const cards = [
    {
      icon: faClipboard,
      category: "General",
    },
    {
      icon: faTruckMoving,
      category: "Shipping & Returns",
    },
    {
      icon: faCertificate,
      category: "Warranty",
    },
    {
      icon: faDollarSign,
      category: "Payment",
    },
  ];

  return (
    <div className={styles.layout__wrapper}>
      <img src={BackgroundImage} alt={"Get Help"} />
      <div className={styles.searchbar__hero}>
        <h5>How can we help you?</h5>
        <div className={styles.searchbar__wrapper}>
          <ReactSVG src={SearchIcon} />
          <input
            type="search"
            placeholder="What are you looking for?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button2 content={"Search"} />
        </div>
      </div>
      <div className={styles.navigation__wrapper}>
        {cards.map((card, index) => (
          <SupportCategoryCard
            key={index}
            icon={card.icon}
            category={card.category}
          />
        ))}
      </div>
    </div>
  );
}
