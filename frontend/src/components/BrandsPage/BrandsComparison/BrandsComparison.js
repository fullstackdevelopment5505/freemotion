import React, { useState } from "react";
import styles from "./BrandsComparison.module.scss";
import { ReactSVG } from "react-svg";
import Info from "../../../svgs/info.svg";
import Star from "../../../svgs/star.svg";

export default function BrandsComparison({
  selectedCategory,
  setSelectedCategory,
}) {
  const categories = [
    "Electric Unicycles",
    "Electric Scooters",
    "Electric Skateboards",
  ];

  const proprieties = [
    "Innovation",
    "Releases",
    "Performance",
    "Value",
    "Range",
    "Reliability",
    "Comfort",
    "Aesthetics",
  ];

  const brandsData = [
    {
      innovation: 5,
      releases: "About 1 a year",
      performance: 4,
      value: 3,
      range: 4,
      reliability: 4,
      comfort: 5,
      aesthetics: 3,
    },
    {
      innovation: 3,
      releases: "About 2 a year",
      performance: 4,
      value: 4,
      range: 3,
      reliability: 5,
      comfort: 5,
      aesthetics: 5,
    },
    {
      innovation: 5,
      releases: "3+ a year",
      performance: 5,
      value: 5,
      range: 5,
      reliability: 3,
      comfort: 3,
      aesthetics: 3,
    },
    {
      innovation: 5,
      releases: "1 a year so far",
      performance: 5,
      value: 5,
      range: 5,
      reliability: 3,
      comfort: 3,
      aesthetics: 2,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Compare Electric Unicycle Brands</h2>
        <div className={styles.selectedCategory}>
          <ul>
            {categories.map((category, index) => (
              <li
                key={index}
                onClick={() => setSelectedCategory(category)}
                style={
                  category == selectedCategory
                    ? {
                        color: "#ff5722",
                        textDecoration: "underline",
                      }
                    : {}
                }>
                <span>{category}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.brands__comparison}>
        <div className={styles.brands__wrapper}>
          <div className={styles.brandName__wrapper}>
            <span></span>
          </div>
          <div className={styles.brandName__wrapper}>
            <span>InMotion</span>
            <ReactSVG src={Info} />
          </div>
          <div className={styles.brandName__wrapper}>
            <span>King Song</span>
            <ReactSVG src={Info} />
          </div>
          <div className={styles.brandName__wrapper}>
            <span>Gotway</span>
            <ReactSVG src={Info} />
          </div>
          <div className={styles.brandName__wrapper}>
            <span>Veteran</span>
            <ReactSVG src={Info} />
          </div>
        </div>
        <div className={styles.brandsProprieties}>
          {proprieties.map((property, index) => (
            <div key={index} className={styles.row}>
              <span className={styles.propertyName}>{property}</span>
              {Object.keys(brandsData).map((_, index) => (
                <div className={styles.column}>
                  <span key={index}>
                    {brandsData[_][property.toLowerCase()]}
                  </span>
                  {property !== "Releases" && <ReactSVG src={Star} />}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
