import React, { useState, useEffect } from "react";
import styles from "./FAQ.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export const Collapsible = ({
  index,
  question,
  answer,
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

export default function FAQ({ selectedCollapsible, setSelectedCollapsible }) {
  const questions = [
    "What is an Affiliate Program?",
    "What are the Benefits of Affiliate Marketing?",
    "Things To Consider When Developing Your Affiliate Marketing?",
    "Common Affiliate Program Challenges",
    "Examples of Software to Manage an Ecommerce Affiliate Program",
    "Executive Summary",
  ];

  return (
    <div className={styles.container}>
      <h3>Frequently Asked Questions </h3>
      <div className={styles.faq__container}>
        {questions.map((question, index) => (
          <Collapsible
            key={index}
            index={index}
            question={question}
            answer={
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also "
            }
            selectedCollapsible={selectedCollapsible}
            setSelectedCollapsible={setSelectedCollapsible}
          />
        ))}
      </div>
    </div>
  );
}
