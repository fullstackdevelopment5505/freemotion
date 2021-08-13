import React, { useState, useEffect, useRef } from "react";
import { ReactSVG } from "react-svg";
import styles from "./ProductOptionsModal.module.scss";
import Button2 from "../../../UI-Components/Button2/Button2";
import CheckedIcon from "../../../../svgs/checked.svg";
import styled from "styled-components";

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

  width: 16px;
  height: 16px;
  object-fit: contain;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.65rem;
`;

const ColorCircle = styled.div`
  width: 15px;
  height: 15px;
  object-fit: contain;
  border-radius: 50%;
  margin-right: 0.65rem;
  background: #${(props) => props.color};
  border: ${(props) => props.color === "ffffff" && "1px solid #dedede"};
`;

function useOutsideAlerter(ref, setShowProductOptionsModal) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowProductOptionsModal(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

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

const ColorsOptionsList = ({ options, selectedColor, setSelectedColor }) => (
  <ul>
    {options.map((option, index) => (
      <li key={index} onClick={() => setSelectedColor(option)}>
        <div className={styles.color__wrapper}>
          {typeof filteredColors(option) == "string" ? (
            <ColorCircle color={filteredColors(option)} />
          ) : (
            <ColorSetCircle
              color1={filteredColors(option)[0]}
              color2={filteredColors(option)[1]}
            />
          )}
          <span>{option}</span>
        </div>
        {option === selectedColor && (
          <div className={styles.checked__wrapper}>
            <ReactSVG src={CheckedIcon} />
          </div>
        )}
      </li>
    ))}
  </ul>
);

const WheelSizesOptionsList = ({ options, wheelSize, setWheelSize }) => (
  <ul>
    {options.map((option, index) => (
      <li key={index} onClick={() => setWheelSize(option)}>
        <span>{option}</span>
        {option === wheelSize && (
          <div className={styles.checked__wrapper}>
            <ReactSVG src={CheckedIcon} />
          </div>
        )}
      </li>
    ))}
  </ul>
);

export default function SortModal({
  optionsType,
  options,
  setShowProductOptionsModal,
  selectedColor,
  setSelectedColor,
  wheelSize,
  setWheelSize,
}) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowProductOptionsModal);

  return (
    <div className={styles.overshadow}>
      <div ref={wrapperRef} className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.content__wrapper}>
            <p>{optionsType}: </p>
            <div className={styles.sortOptions__wrapper}>
              {optionsType === "colors" ? (
                <ColorsOptionsList
                  options={options}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                />
              ) : (
                <WheelSizesOptionsList
                  options={options}
                  wheelSize={wheelSize}
                  setWheelSize={setWheelSize}
                />
              )}
            </div>
          </div>
          <Button2
            handleClick={setShowProductOptionsModal}
            parameter={false}
            content={"Cancel"}
          />
        </div>
      </div>
    </div>
  );
}
