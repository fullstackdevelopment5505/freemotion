import React from "react";
import { ReactSVG } from "react-svg";
import styles from "./BrandsDropdown.module.scss";

import Brand1 from "../../../../svgs/colored_brands/Brand1.svg";
import Brand2 from "../../../../svgs/colored_brands/Brand2.svg";
import Brand3 from "../../../../svgs/colored_brands/Brand3.svg";
import Brand4 from "../../../../svgs/colored_brands/Brand4.svg";
import Brand5 from "../../../../svgs/colored_brands/Brand5.svg";
import Brand6 from "../../../../svgs/colored_brands/Brand6.svg";
import Brand7 from "../../../../svgs/colored_brands/Brand7.svg";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const BrandCard = ({ icon, handleClick }) => (
  <div className={styles.card__wrapper} onClick={() => handleClick()}>
    <div className={styles.svg__wrapper}>
      <ReactSVG src={icon} />
    </div>
  </div>
);

export default function BrandsDropdown({ setShowBrandsDropdown }) {
  const history = useHistory();
  const dispatch = useDispatch();

  let cardsArray = [Brand1, Brand2, Brand3, Brand4, Brand5, Brand6, Brand7];
  let numRows = Math.ceil(cardsArray.length / 4);

  let indexedRows = [];

  for (let i = 1; i <= numRows; i++) indexedRows.push(i);

  const handleClick = () => {
    history.push("/brands");
  };

  return (
    <div
      className={styles.container}
      onMouseOver={() => setShowBrandsDropdown(true)}>
      <div
        className={styles.wrapper}
        onMouseLeave={() => setShowBrandsDropdown(false)}>
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
                <BrandCard icon={card} key={index} handleClick={handleClick} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
