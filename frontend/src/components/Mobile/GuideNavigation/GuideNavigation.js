import React from "react";
import styles from "./GuideNavigation.module.scss";

export default function GuideNavigation({
  options,
  selectedOption,
  setSelectedOption,
}) {
  return (
    <div className={styles.container}>
      <select
        className={styles.dropdown__container}
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}>
        {options.map((option, index) => (
          <option
            selected={index === selectedOption ? true : false}
            key={index}
            value={index}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
