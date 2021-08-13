import React from "react";
import styles from "./GuideNavigation.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function GuideNavigation({ options }) {
  return (
    <div className={styles.container}>
      <ul className={styles.navItems}>
        {options.map((item, index) => (
          <li key={index}>
            <span>{item}</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </li>
        ))}
      </ul>
    </div>
  );
}
