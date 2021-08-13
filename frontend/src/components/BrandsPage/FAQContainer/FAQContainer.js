import React, { useState } from "react";
import styles from "./FAQContainer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export const Collapsible = ({
  index,
  selectedCollapsible,
  setSelectedCollapsible,
}) => (
  <div className={styles.collapsible__wrapper}>
    <div
      className={styles.question}
      style={{
        borderBottomLeftRadius: selectedCollapsible === index && "0",
        borderBottomRightRadius: selectedCollapsible === index && "0",
        borderBottom: selectedCollapsible === index && "none",
      }}>
      <h5
        style={{
          color: selectedCollapsible === index && "#FF5722",
        }}>
        Lorem Ipsum is simply dummy text of the
      </h5>
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
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also{" "}
        </p>
      </div>
    </div>
  </div>
);

export default function FAQContainer({ sectionTitle }) {
  const [selectedCollapsible, setSelectedCollapsible] = useState(null);

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>{sectionTitle}</h3>
      <div className={styles.faq__container}>
        {[...Array(4)].map((_, index) => (
          <Collapsible
            key={index}
            index={index}
            selectedCollapsible={selectedCollapsible}
            setSelectedCollapsible={setSelectedCollapsible}
          />
        ))}
      </div>
    </div>
  );
}
