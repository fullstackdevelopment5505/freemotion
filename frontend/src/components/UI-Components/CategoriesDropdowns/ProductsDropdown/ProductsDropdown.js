import React from "react";
import { ReactSVG } from "react-svg";
import styles from "./ProductsDropdown.module.scss";

import Category1 from "../../../../svgs/products/electric_unicycles.svg";
import Category2 from "../../../../svgs/products/electric_scooters.svg";
import Category3 from "../../../../svgs/products/electric_skateboards.svg";
import Category4 from "../../../../svgs/products/accessories.svg";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFilter } from "../../../../actions/filtersActions";

const CategoryCard = ({ icon, category, handleClick }) => (
  <div className={styles.card__wrapper} onClick={() => handleClick(category)}>
    <div className={styles.svg__wrapper}>
      <ReactSVG src={icon} />
      <h4>{category}</h4>
    </div>
  </div>
);

export default function ProductsDropdown({ setShowProductsDropdown }) {
  const history = useHistory();
  const dispatch = useDispatch();

  let cardsArray = [
    { icon: Category1, category: "Electric Unicycles" },
    { icon: Category2, category: "Electric Scooters" },
    { icon: Category3, category: "Electric Skateboards" },
    { icon: Category4, category: "Accessories" },
  ];
  let numRows = Math.ceil(cardsArray.length / 4);

  let indexedRows = [];

  for (let i = 1; i <= numRows; i++) indexedRows.push(i);

  const handleClick = (category) => {
    history.push(`products`);
    dispatch(addFilter("category", category));
  };

  return (
    <div
      className={styles.container}
      onMouseOver={() => setShowProductsDropdown(true)}>
      <div
        className={styles.wrapper}
        onMouseLeave={() => setShowProductsDropdown(false)}>
        {indexedRows.map((row, rowIndex) => {
          let elements = cardsArray.slice((row - 1) * 4, row * 4);
          return (
            <div
              className={styles.row}
              key={rowIndex}
              style={{
                width: `${
                  elements.length * 20 - (4 - elements.length) * 0.125
                }vw`,
              }}>
              {elements.map((card, index) => (
                <CategoryCard
                  icon={card.icon}
                  category={card.category}
                  key={index}
                  handleClick={handleClick}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
