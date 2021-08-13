import React from "react";
import FAQContainer from "./FAQContainer/FAQContainer";
import styles from "./GuideFAQ.module.scss";

export default function GuideFAQ() {
  const faqSections = [
    "Electric Unicycle",
    "Owning an electric unicycle FAQ",
    "Buying an electric unicycle FAQ",
  ];

  return (
    <div className={styles.container}>
      {faqSections.map((section, index) => (
        <FAQContainer sectionTitle={section} key={index} />
      ))}
    </div>
  );
}
