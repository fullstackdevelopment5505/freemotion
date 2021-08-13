import React, { useState, useEffect } from "react";
import styles from "./FAQSection.module.scss";
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

const cleanFaqContent = (content) => {
  if (content && content.length) {
    content = content.slice(0, content.length - 1);
    const cleanContent = [];
    content.forEach((question) => {
      let content = question.content[0].content[0].content[0].value.split("->");
      cleanContent.push({ question: content[0], answer: content[1] });
    });
    return cleanContent;
  }
};

export default function FAQSection({ faqContent }) {
  const [selectedCollapsible, setSelectedCollapsible] = useState(null);

  faqContent = cleanFaqContent(faqContent);

  return (
    <div className={styles.faq__container}>
      {faqContent?.map((QA, index) => (
        <Collapsible
          key={index}
          index={index}
          question={QA.question}
          answer={QA.answer}
          selectedCollapsible={selectedCollapsible}
          setSelectedCollapsible={setSelectedCollapsible}
        />
      ))}
    </div>
  );
}
