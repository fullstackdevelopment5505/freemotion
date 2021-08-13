import React from "react";
import styles from "./NewReleaseShowcase.module.scss";
import ProductCard from "./ProductCard/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import ProductImage1 from "../../../images/veteran-sherman-3200-4-238x238 4 (1).png";
import ProductImage2 from "../../../images/bronco-scooter-238x238 2 (1).png";
import ProductImage3 from "../../../images/veteran-sherman-3200-4-238x238 5 (1).png";

export default function NewReleaseShowcase() {
  return (
    <div className={styles.showcase__wrapper}>
      <div className={styles.showcase}>
        <div className={styles.header}>
          <h3>New Releases</h3>
          <div className={styles.controller}>
            <button>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
        <div className={styles.products__container}>
          <ProductCard
            name={"Gotway Monster Pro Electric Unicycle"}
            review={4}
            oldPrice={3300.0}
            newPrice={1089.0}
            image={ProductImage1}
          />
          <ProductCard
            name={"Gotway Monster Pro Electric Unicycle"}
            review={4}
            newPrice={1089.0}
            image={ProductImage2}
          />
          <ProductCard
            name={"Gotway Monster Pro Electric Unicycle"}
            review={4}
            oldPrice={3300.0}
            newPrice={1089.0}
            image={ProductImage3}
          />
        </div>
      </div>
    </div>
  );
}
