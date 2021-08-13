import React from "react";
import styles from "./GuideBlock.module.scss";
import { ReactSVG } from "react-svg";

export default function GuideBlock({ icon, title, content, note }) {
  return (
    <div className={styles.block__wrapper}>
      <div className={styles.icon__wrapper}>
        <ReactSVG src={icon} />
      </div>
      <div className={styles.content__wrapper}>
        <h4>{title}</h4>
        <p>{content}</p>
        {note ? (
          <div className={styles.note__wrapper}>
            <p>{note}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
