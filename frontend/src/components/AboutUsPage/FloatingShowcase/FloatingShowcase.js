import React from "react";
import { ReactSVG } from "react-svg";
import styles from "./FloatingShowcase.module.scss";

import AuthorizedIcon from "../../../svgs/authorized_svg.svg";
import LowestCostIcon from "../../../svgs/lowestcost_svg.svg";
import OneYearIcon from "../../../svgs/1year_svg.svg";
import MoneyBackIcon from "../../../svgs/moneyback_svg.svg";

export const ShowcaseBlock = ({ header, subheader, icon }) => (
  <div className={styles.block}>
    <ReactSVG src={icon} />
    <h4>{header}</h4>
    <p>{subheader}</p>
  </div>
);

export default function FloatingShowcase() {
  const blocksContent = [
    {
      icon: AuthorizedIcon,
      header: "AUTHORIZED",
      subheader: "Distributor/Dealer",
    },
    {
      icon: LowestCostIcon,
      header: "LOWEST COST",
      subheader: "Lowest price guarantee",
    },
    {
      icon: OneYearIcon,
      header: "1 YEAR",
      subheader: "1 year complete warranty",
    },
    {
      icon: MoneyBackIcon,
      header: "MONEY BACK",
      subheader: "Easy free returns",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.blocks__container}>
          {blocksContent.map((block, index) => (
            <ShowcaseBlock
              header={block.header}
              subheader={block.subheader}
              icon={block.icon}
            />
          ))}
        </div>
        <div className={styles.content__wrapper}>
          <h3>Quality And Support</h3>
          <p>
            Being an e-commerce website, we understand that every customer wants
            a convenient online purchase, quality product, quick delivery, a
            24/7 access to customer service, and uncomplicated exchange
            policies. This is the goal of FreeMotion, Everyone at FreeMotion
            believes in, and works toward that goal. We assist customers through
            our interactive website and catalogs, our 24/7 available service and
            device experts, and our consumer-friendly exchange & return
            policies. FreeMotion believes that happy customers are repeat
            customers. As our products are cutting-edge, FreeMotion makes sure
            the customer has a resource to turn to for information and support.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
