import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import styles from "../styles/BrandsPage.module.scss";
import BrandsContainerHero from "../components/BrandsPage/BrandsContainerHero/BrandsContainerHero";
import FAQSection from "../components/BrandsPage/FAQSection/FAQSection";
import BrandsComparison from "../components/BrandsPage/BrandsComparison/BrandsComparison";
import axios from "axios";

export default function BrandsPage() {
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    "Electric Unicycles",
  );

  useEffect(() => {
    const queryHeader = `(where: {brandCategory: "${selectedCategory}"})`;

    const query = `
      query {
        brandCollection${queryHeader} {
          items {
            sys {
              id
            }
            name
            description {
              json
            }
            logo {
              url
            }
            numberOfReleases
            innovationRating
            performanceRating
            valueRating
            rangeRating
            reliabilityRating
            comfortRating
            aestheticsRating
          }
        }
      }
    `;

    const fetchBrands = async () => {
      const result = await axios({
        method: "post",
        url: `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}?access_token=EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
        data: JSON.stringify({ query }),
        headers: {
          Authorization: `Bearer EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
          "Content-Type": "application/json",
        },
      });

      console.log(result.data.data.brandCollection.items);

      setBrands(result.data.data.brandCollection.items);
    };

    fetchBrands();
  }, [selectedCategory]);

  return (
    <Layout>
      <div className={styles.container}>
        <BrandsContainerHero />
        <BrandsComparison
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <FAQSection />
      </div>
    </Layout>
  );
}
