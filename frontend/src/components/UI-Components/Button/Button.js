import React from "react";
import styles from "./Button.module.scss";

export default function Button({
  content,
  buttonType,
  handleClick,
  parameter,
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
