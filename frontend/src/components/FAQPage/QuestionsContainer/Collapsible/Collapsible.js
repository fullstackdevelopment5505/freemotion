import React from "react";
import styles from "./Collapsible.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Collapsible({
  index,
  selectedCollapsible,
  setSelectedCollapsible,
  question,
  answer,
}) {
  return (
    <div className={styles.collapsible__wrapper}>
      <div
        className={styles.question}
        style={{
          borderBottomLeftRadius: selectedCollapsible === index && "0",
          borderBottomRightRadius: selectedCollapsible === index && "0",
          borderBottom: selectedCollapsible === index && "none",
        }}>
        <h5>{question}</h5>
        <FontAwesomeIcon
          icon={selectedCollapsible === index ? faMinus : faPlus}
          onClick={() =>
            index !== selectedCollapsible
              ? setSelectedCollapsible(index)
              : setSelectedCollapsible(null)
          }
        />
      </div>
      <div
        className={styles.answer__wrapper}
        style={{
          border: selectedCollapsible === index && "1px solid #e7eaed",
          height: selectedCollapsible === index && "5rem",
          borderTop: selectedCollapsible === index && "none",
        }}>
        <div
          className={styles.answer}
          style={{ opacity: selectedCollapsible === index && "1" }}>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}
