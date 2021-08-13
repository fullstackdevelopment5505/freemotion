import React from "react";
import styles from "./ComparisonContainer.module.scss";
import ProductBlock from "./ProductBlock/ProductBlock";
import ProductImage from "../../../../images/e-Unicycles 5.png";
import Switch from "../../../UI-Components/Switch/Switch";
import ProductDescription from "./ProductDescription/ProductDescription";

export default function ComparisonContainer() {
  const specs = [
    {
      1: [
        {
          name: "Max Range",
          property: "30 km, 80 miles",
        },
        {
          name: "Range",
          property: "Up to 40 Miles, Up to 64 Km",
        },
        {
          name: "Motor",
          property: "1500W",
        },
        {
          name: "Battery",
          property: "100V/2700Wh LG M50T 21700",
        },
        {
          name: "Charging Time",
          property: "2 hours with 5A fast charger",
        },
        {
          name: "Max Speed ",
          property: "Up to 40 Mph, Up to 64 Kmh",
        },
        {
          name: "Max Load ",
          property: "130 Kg, 286 Lbs",
        },
        {
          name: "Max Climb Angle ",
          property: "25°",
        },
        {
          name: "Tyres",
          property: 1,
        },
        {
          name: "Wheel Size",
          property: "16 x 2.5 in",
        },
        {
          name: "Brakes",
          property: null,
        },
        {
          name: "Dimensions",
          property: null,
        },
        {
          name: "App Support",
          property: null,
        },
      ],
    },
  ];
  console.log(specs[0][`${0 + 1}`]);

  return (
    <div className={styles.container}>
      <div className={styles.products__container}>
        <div className={styles.wrapper}>
          {[...Array(3)].map((product, index) => (
            <ProductBlock
              productImage={ProductImage}
              sku={2231}
              productName={"Gotway Monster Pro Electric Unicycle"}
              oldPrice={"3300.00"}
              newPrice={"2310.00"}
              discountPercentage={30}
              review={4}
              numStockItems={12}
              brand={"Gotway"}
              id={index}
            />
          ))}
        </div>
      </div>
      <div className={styles.showDifferences__switch}>
        <Switch />
        <span>Only Show Differences</span>
      </div>
      <h3>Key Features</h3>
      <div className={styles.productDescription__container}>
        <div className={styles.wrapper}>
          {[...Array(3)].map((productParameters, index) => (
            <ProductDescription
              key={index}
              productDescription={
                "Speeding out onto the market next month is a cool, brand new electric unicycle "
              }
              specs={specs}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
