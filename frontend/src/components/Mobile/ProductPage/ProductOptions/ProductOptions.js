import React from "react";
import { ReactSVG } from "react-svg";
import styles from "./ProductOptions.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import ChevronRight from "../../../../svgs/right_chevron.svg";

const ColorSetCircle = styled.div`
  background: #${(props) => props.color2};
  z-index: 9;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    right: 50%;
    bottom: 0;
    left: 0;
    background-color: #${(props) => props.color1};
  }

  width: 16px !important;
  height: 16px;
  object-fit: contain;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.65rem;
`;

const ColorCircle = styled.div`
  width: 15px !important;
  height: 15px;
  object-fit: contain;
  border-radius: 50%;
  margin-right: 0.65rem;
  background: #${(props) => props.color};
  border: ${(props) => props.color === "ffffff" && "1px solid #dedede"};
`;

const filteredColors = (string) => {
  if (string.includes("&") || string.toLowerCase().includes("and")) {
    let colorsArray = [];
    colorsArray.push(
      getColorCode(string.split(" ")[0]),
      getColorCode(string.split(" ")[2]),
    );
    return colorsArray;
  } else {
    return getColorCode(string);
  }
};

const getColorCode = (colorName) => {
  if (colorName.toLowerCase().includes("black")) return "212121";
  if (colorName.toLowerCase().includes("red")) return "dd2424";
  if (colorName.toLowerCase().includes("white")) return "ffffff";
};

export default function ProductOptions({
  quantityValidator,
  numAvailableColors,
  selectedColor,
  wheelSize,
  numAvailableProducts,
  numProducts,
  quantityError,
  setOptionsType,
  setOptions,
  setShowProductOptionsModal,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.options__wrapper}>
        <div
          className={styles.colors__options}
          onClick={() => {
            setShowProductOptionsModal(true);
            setOptionsType("colors");
            setOptions(["Black", "White", "Red and Black", "White and Black"]);
          }}>
          <div className={styles.left__col}>
            <span>Colors: </span>
            <span>({numAvailableColors} Available)</span>
          </div>
          <div>
            {typeof filteredColors(selectedColor) == "string" ? (
              <ColorCircle color={filteredColors(selectedColor)} />
            ) : (
              <ColorSetCircle
                color1={filteredColors(selectedColor)[0]}
                color2={filteredColors(selectedColor)[1]}
              />
            )}
            <span>{selectedColor}</span>
            <ReactSVG src={ChevronRight} />
          </div>
        </div>
        <div
          className={styles.wheelSize__options}
          onClick={() => {
            setShowProductOptionsModal(true);
            setOptionsType("wheels");
            setOptions(["80mm Slick Wheels", "86mm Slick Wheels"]);
          }}>
          <span className={styles.left__col}>Wheel Size: </span>
          <div>
            <span>{wheelSize}</span>
            <ReactSVG src={ChevronRight} />
          </div>
        </div>
        <div className={styles.quantity__wrapper}>
          <div className={styles.stock}>
            <span>Quantity: </span>
            <span>({numAvailableProducts} In Stock)</span>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.counter}>
              <button
                onClick={() =>
                  quantityValidator(numAvailableProducts, numProducts, "minus")
                }>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <span>{numProducts}</span>
              <button
                onClick={() =>
                  quantityValidator(numAvailableProducts, numProducts, "plus")
                }>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            {quantityError && (
              <p className={styles.error__wrapper}>{quantityError}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
