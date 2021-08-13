import React from "react";
import styles from "./FilterMenu.module.scss";
import InputDropdown from "../../../UI-Components/InputDropdown/InputDropdown";

export default function FilterMenu({ showProducts }) {
  return (
    <div className={styles.filterMenu__container}>
      <div className={styles.products__viewBy__wrapper}>
        {showProducts && (
          <div className={styles.products__dropdown__wrapper}>
            <label>Products</label>
            <InputDropdown options={["Product 1", "Product 2"]} />
          </div>
        )}
        <div className={styles.viewBy__dropdown__wrapper}>
          <label>View by</label>
          <InputDropdown
            options={["09 Sep 2020 - 12 Sep 2020", "02 Sep 2020 - 05 Sep 2020"]}
          />
        </div>
      </div>
      <div className={styles.pageItems__dropdown__wrapper}>
        <label>Items per page: </label>
        <InputDropdown options={[10, 16, 24, 32, 64]} />
      </div>
    </div>
  );
}
