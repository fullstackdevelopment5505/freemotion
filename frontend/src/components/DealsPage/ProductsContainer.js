import React from "react";
import styles from "./ProductsContainer.module.scss";
import BannerImage from "../../images/image 1 (2).jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThLarge,
  faTimes,
  faThList,
} from "@fortawesome/free-solid-svg-icons";
import InputDropdown from "../UI-Components/InputDropdown/InputDropdown";
import { default as Products } from "../ProductsPage/ProductsContainer/ProductsContainer";

export default function ProductsContainer() {
  return (
    <div className={styles.container}>
      <div className={styles.banner__wrapper}>
        <img src={BannerImage} alt="Best Deals" />
      </div>
      <div className={styles.sort__menu}>
        <div className={styles.leftGroup}>
          <div className={styles.numResults}>
            <span>1-24</span>
            <span>of</span>
            <span>48 Results</span>
          </div>
          <div className={styles.numResults__page}>
            <span>Show:</span>
            <InputDropdown options={[12, 24, 36]} />
          </div>
        </div>
        <div className={styles.rightGroup}>
          <div className={styles.sortBy}>
            <span>Sort by:</span>
            <InputDropdown
              options={[
                "Alphabetically, A-Z",
                "Alphabetically, Z-A",
                "By Release Date, Asc",
                "By Release Date, Desc",
              ]}
            />
          </div>
          <div className={styles.viewAs}>
            <span>View as:</span>
            <InputDropdown
              options={[
                <FontAwesomeIcon icon={faThLarge} />,
                <FontAwesomeIcon icon={faThList} />,
              ]}
            />
          </div>
        </div>
      </div>
      <div className={styles.items__container}>
        <Products listOrder={false} products={[]} />
      </div>
    </div>
  );
}
