import React from "react";
import PaymentMethodContainer from "../components/FinancingPage/PaymentMethodContainer/PaymentMethodContainer";
import Layout from "../components/Layout";
import styles from "../styles/FinancingPage.module.scss";

import KlarnaIcon from "../svgs/financing/klarna.svg";
import PaybrightIcon from "../svgs/financing/paybright.svg";
import VisaIcon from "../svgs/financing/visa.svg";
import AmericanExpressIcon from "../svgs/financing/american_express.svg";
import MastercardIcon from "../svgs/financing/master_card.svg";
import PaypalIcon from "../svgs/financing/paypal.svg";

export default function FinancingPage() {
  const paymentMethodsData = [
    {
      name: "Klarna",
      website: "https://",
      logo: KlarnaIcon,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      listTitle: "Title",
      listItems: [
        "Lorem Ipsum is simply dummy text of the printing and industry.",
        "Lorem Ipsum is simply dummy text of the printing and industry.",
        "Lorem Ipsum is simply dummy text of the printing and industry.",
        "Lorem Ipsum is simply dummy text of the printing and industry.",
      ],
    },
    {
      name: "Paybright",
      website: "https://",
      logo: PaybrightIcon,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      name: "Visa",
      website: "https://",
      logo: VisaIcon,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      listTitle: "Title",
      listItems: [
        "Lorem Ipsum is simply dummy text of the printing and industry.",
        "Lorem Ipsum is simply dummy text of the printing and industry.",
        "Lorem Ipsum is simply dummy text of the printing and industry.",
        "Lorem Ipsum is simply dummy text of the printing and industry.",
      ],
    },
    {
      name: "American Express",
      website: "https://",
      logo: AmericanExpressIcon,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      name: "Mastercard",
      website: "https://",
      logo: MastercardIcon,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      name: "PayPal",
      website: "https://",
      logo: PaypalIcon,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ];

  return (
    <Layout>
      <div className={styles.container}>
        <h3>Financing</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </p>
        <div className={styles.paymentMethods__container}>
          {paymentMethodsData.map((paymentMethod, index) => (
            <PaymentMethodContainer
              key={index}
              name={paymentMethod.name}
              website={paymentMethod.website}
              logo={paymentMethod.logo}
              description={paymentMethod.description}
              listItems={paymentMethod.listItems}
              listTitle={paymentMethod.listTitle}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
