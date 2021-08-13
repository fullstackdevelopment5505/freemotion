import React, { useState } from "react";
import styles from "./Searchbar.module.scss";
import { ReactSVG } from "react-svg";
import Search from "../../../svgs/search.svg";

export default function Searchbar() {
  return (
    <div className={styles.container}>
      <div className={styles.dropdown__container}></div>
    </div>
  );
}
