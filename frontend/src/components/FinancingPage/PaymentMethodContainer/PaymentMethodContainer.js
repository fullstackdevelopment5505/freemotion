import React from "react";
import { ReactSVG } from "react-svg";
import styles from "./PaymentMethodContainer.module.scss";

import Caret from "../../../svgs/right_caret.svg";

export default function PaymentMethodContainer({
  name,
  website,
  logo,
  description,
  listItems,
  listTitle,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.left__wrapper}>
        <ReactSVG src={logo} />
        <div className={styles.link__wrapper}>
          <a href={website} alt={name}>
            Visit Website
          </a>
          <ReactSVG src={Caret} />
        </div>
      </div>
      <div className={styles.content__wrapper}>
        <h4>{name}</h4>
        <p>{description}</p>
        <h6>{listTitle && listTitle}</h6>
        {listItems?.length && (
          <ul>
            {listItems.map((item, index) => (
              <li key={index}>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
