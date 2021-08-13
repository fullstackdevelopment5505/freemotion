import React, { useState } from "react";
import styles from "./Switch.module.scss";

export default function Switch() {
  const [active, setActive] = useState(false);

  return (
    <div
      className={styles.switch__wrapper}
      onClick={() => setActive((active) => !active)}
      style={
        active === true
          ? {
              borderColor: "#FF5722",
            }
          : {}
      }>
      <div
        className={styles.toggler}
        style={
          active === true
            ? {
                backgroundColor: "#FF5722",
                marginLeft: "1.2rem",
              }
            : {}
        }
      />
    </div>
  );
}
