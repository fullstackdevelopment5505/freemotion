import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/FAQPage.module.scss";
import Hero from "../components/FAQPage/Hero/Hero";
import QuestionsContainer from "../components/FAQPage/QuestionsContainer/QuestionsContainer";
import axios from "axios";

require("dotenv").config();

export default function FAQPage() {
  const [faqData, setFaqData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [category, setCategory] = useState("General");

  useEffect(() => {
    const fetchFAQData = async () => {
      const result = await axios({
        method: "get",
        url: `https://cdn.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/entries/?content_type=faqPageContent`,
        headers: {
          Authorization: `Bearer EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
          "Content-Type": "application/json",
        },
      });

      setFaqData(result.data.items[0].fields.faqContent.content);
    };

    fetchFAQData();
    setLoading(false);
  }, [faqData]);

  return (
    <Layout>
      <div className={styles.container}>
        <Hero
          inputValue={inputValue}
          setInputValue={setInputValue}
          setCategory={setCategory}
        />
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <QuestionsContainer faqData={faqData} category={category} />
        )}
      </div>
    </Layout>
  );
}
