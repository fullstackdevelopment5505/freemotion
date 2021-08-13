import React from "react";
import styles from "./ValuesShowcase.module.scss";

export const Card = ({ index, valueName, content }) => (
  <div className={styles.card__wrapper}>
    <span className={styles.index}>{index + 1}</span>
    <h5>{valueName}</h5>
    <p>{content}</p>
  </div>
);

export default function ValuesShowcase() {
  const cardsContent = [
    {
      value: "Quality",
      content:
        "Quality matters! FreeMotion believes in selling quality over quantity. We believe that providing our customers with a quality product will produce happy customers. A happy customer always lands back at FreeMotion. All our products are certified and abide by the regulations of North America Safety Standards. ",
    },
    {
      value: "Trust",
      content:
        "FreeMotion knows the reason behind the success of any company is its workforce.  FreeMotion believes in and takes care of its employees, partly because happy employees service customers efficiently and with a smile. We Solve Problems. And solving problems engenders TRUST. Trust between FreeMotion and its customers accounts for the many repeat customers we enjoy. ",
    },
    {
      value: "Transparency",
      content:
        "In a more and more online world, FreeMotion wants to make you feel as if we are just one step away. We engage as much as possible with our clients. FreeMotion is open for genuine discussions and feedback from the customers. If you just feel like writing about your electric mobility, just dropus a line.",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h3>Our Values </h3>
          <p>
            FreeMotion believes in the values of Quality, Trust, and
            Transparency.
          </p>
        </div>
        <div className={styles.cards__container}>
          {cardsContent.map((card, index) => (
            <Card index={index} valueName={card.value} content={card.content} />
          ))}
        </div>
        <span className={styles.footerSpan}>
          FreeMotion is not just a shop, it is a new way to see and acquire
          local transportation.
        </span>
      </div>
    </div>
  );
}
