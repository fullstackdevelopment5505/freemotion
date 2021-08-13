import React from "react";
import styles from "./HelpPagesLayout.module.scss";
import BackgroundImage from "../../images/image 1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faQuestion,
  faCertificate,
  faBook,
  faTruckMoving,
} from "@fortawesome/free-solid-svg-icons";
import Button2 from "../UI-Components/Button2/Button2";
import { useHistory } from "react-router-dom";

export const SupportCategoryCard = ({ icon, category, link }) => {
  const history = useHistory();

  return (
    <div className={styles.card__wrapper} onClick={() => history.push(link)}>
      <FontAwesomeIcon icon={icon} />
      <span>{category}</span>
    </div>
  );
};

export default function HelpPagesLayout() {
  const cards = [
    {
      icon: faQuestion,
      category: "FAQ",
      link: "/frequently-asked-questions",
    },
    {
      icon: faTruckMoving,
      category: "Shipping & Returns",
      link: "/shipping-info",
    },
    {
      icon: faBook,
      category: "Buying Guide",
      link: "/buying-guide",
    },
    {
      icon: faCertificate,
      category: "Warranty Registration",
      link: "/warranty-info",
    },
  ];

  return (
    <div className={styles.layout__wrapper}>
      <img src={BackgroundImage} alt={"Get Help"} />
      <div className={styles.searchbar__hero}>
        <h5>How can we help you?</h5>
        <div className={styles.searchbar__wrapper}>
          <FontAwesomeIcon icon={faSearch} />
          <input type="search" placeholder="What are you looking for?" />
          <Button2 content={"Search"} />
        </div>
      </div>
      <div className={styles.navigation__wrapper}>
        {cards.map((card, index) => (
          <SupportCategoryCard
            key={index}
            icon={card.icon}
            category={card.category}
            link={card.link}
          />
        ))}
      </div>
    </div>
  );
}
