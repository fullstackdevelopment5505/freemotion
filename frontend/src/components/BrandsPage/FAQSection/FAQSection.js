import React from "react";
import styles from "./FAQSection.module.scss";
import FAQContainer from "../FAQContainer/FAQContainer";

export default function FAQSection() {
  const faqSections = [
    "Electric Unicycle",
    "Legal electric unicycle FAQ’s",
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
