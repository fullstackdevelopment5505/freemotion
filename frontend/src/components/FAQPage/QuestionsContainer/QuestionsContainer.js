import React, { useEffect, useState } from "react";
import styles from "./QuestionsContainer.module.scss";
import Collapsible from "./Collapsible/Collapsible";
import { parseFaqContent } from "../helpers";

const FaqSectionContainer = ({
  selectedCollapsible,
  setSelectedCollapsible,
  sectionHeader,
  faqContentList,
}) => {
  return (
    <div className={styles.faq__section}>
      <h2>{sectionHeader}</h2>
      {faqContentList.map((faqNode, index) => (
        <Collapsible
          key={index}
          index={faqNode.setId}
          selectedCollapsible={selectedCollapsible}
          setSelectedCollapsible={setSelectedCollapsible}
          question={faqNode.question}
          answer={faqNode.answer}
        />
      ))}
    </div>
  );
};

export default function QuestionsContainer({ faqData }) {
  const [selectedCollapsible, setSelectedCollapsible] = useState(null);
  const [parsedDataArray, setParsedDataArray] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setParsedDataArray(parseFaqContent(faqData));
    if (parsedDataArray) setLoading(false);
  }, [faqData]);

  return loading ? (
    <h3>Loading...</h3>
  ) : (
    <div className={styles.questions__container}>
      {parsedDataArray?.map((section, index) => (
        <FaqSectionContainer
          key={index}
          sectionHeader={section.header}
          faqContentList={section.faqContent}
          selectedCollapsible={selectedCollapsible}
          setSelectedCollapsible={setSelectedCollapsible}
        />
      ))}
    </div>
  );
}
