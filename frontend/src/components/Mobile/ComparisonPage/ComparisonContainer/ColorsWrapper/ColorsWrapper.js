import React, { useState } from "react";
import styles from "./ColorsWrapper.module.scss";

export default function ColorsWrapper({ colors }) {
  const [selectedColor, setSelectedColor] = useState(0);

  return <div className={styles.container}></div>;
}
