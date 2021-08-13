import React from "react";
import styles from "./Button2.module.scss";

export default function Button2({
  handleClick,
  parameter,
  content,
  buttonType,
}) {
  return handleClick ? (
    <button
      type={buttonType ?? "button"}
      className={styles.button}
      onClick={(e) => (parameter ? handleClick(parameter) : handleClick())}>
      {content}
    </button>
  ) : (
    <button type={buttonType ?? "button"} className={styles.button}>
      {content}
    </button>
  );
}
