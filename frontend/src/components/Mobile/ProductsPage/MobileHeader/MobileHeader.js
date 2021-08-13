import React from "react";
import { ReactSVG } from "react-svg";
import styles from "./MobileHeader.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export default function MobileHeader({
  setShowSortMenu,
  setShowFilterMenu,
  currentPage,
  numItems,
  numItemsPerPage,
  setNumItemsPerPage,
}) {
  const renderMenuPagination = (currentPage, numItems, numItemsPerPage) => {
    const prevPage = currentPage - 1;
    let startingIndex = prevPage * numItemsPerPage + 1;
    let endIndex =
      currentPage * numItemsPerPage > numItems
        ? numItems
        : currentPage * numItemsPerPage;
    return `${startingIndex} - ${endIndex}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h3>Products</h3>
        <div className={styles.paginationSettings__wrapper}>
          <span>
            {renderMenuPagination(currentPage, numItems, numItemsPerPage)}
          </span>
          <span>of</span>
          <span>{numItems} Results</span>
        </div>
      </div>
      <div className={styles.optionsButtons__wrapper}>
        <button onClick={() => setShowFilterMenu(true)}>
          <span>Filter</span>
          <span className={styles.numFilters}>22</span>
        </button>
        <button onClick={() => setShowSortMenu(true)}>
          <span>Alphabetically, A-Z</span>
          <FontAwesomeIcon icon={faCaretDown} />
        </button>
      </div>
    </div>
  );
}
