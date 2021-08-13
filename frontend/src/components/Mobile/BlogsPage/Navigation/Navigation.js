import React from "react";
import styles from "./Navigation.module.scss";

export default function Navigation({ categoryIndex, setCategoryIndex }) {
  const navOptions = [
    "All Topics",
    "Electric Unicycles",
    "Electric Scooters",
    "Electric Skateboards",
  ];

  return (
    <div className={styles.nav__container}>
      <ul>
        {navOptions.map((option, index) => (
          <li
            key={index}
            onClick={() => setCategoryIndex(index + 1)}
            style={
              categoryIndex === index + 1
                ? { color: "#ff5722", borderBottomColor: "#ff5722" }
                : {}
            }>
            <span>{option}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
