import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/ComparisonsPage.module.scss";
import ComparedProductsContainer from "../components/ComparisonsPage/ComparedProductsContainer/ComparedProductsContainer";
import ComparisonsSidebar from "../components/ComparisonsPage/ComparisonsSidebar/ComparisonsSidebar";
import ComparisonsHeader from "../components/ComparisonsPage/ComparisonsHeader/ComparisonsHeader";
import AddToComparisonModal from "../components/ComparisonsPage/AddToComparisonModal/AddToComparisonModal";
import { default as MobileComparisonContainer } from "../components/Mobile/ComparisonPage/ComparisonContainer/ComparisonContainer";
import ProductDescriptionModal from "../components/ComparisonsPage/ProductDescriptionModal/ProductDescriptionModal";
import { useSelector } from "react-redux";
import axios from "axios";

export default function ComparisonsPage() {
  const comparisonProductsIds = useSelector((state) => state.comparison.items);

  const [showModal, setShowModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [productId, setProductId] = useState();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let queryHeader = ``;

    if (comparisonProductsIds.length > 0) {
      queryHeader = `(where: {sys: {id_in: [`;
      for (let i = 0; i < comparisonProductsIds.length; i++) {
        queryHeader += `"${comparisonProductsIds[i]}"`;
        if (i < comparisonProductsIds.length - 1) queryHeader += `, `;
      }
      queryHeader += `]}})`;
    }

    const query = `
      query {
        productCollection${queryHeader} {
          items {
            productName
            sku
            oldPrice
            currentPrice
            colorOptions
            description {
              json
            }
            productImage {
              url
            }
            maxRange
            motorType
            maxSpeed
            maxLoad
            maxClimbAngle
            wheelSize
            sys {
              id
            }
            itemsInStock
            maxSpeedInMiles
            maxSpeedInKilometers
            maxLoadInKilograms
            maxLoadInPounds
            maxRangeInMiles
            maxRangeInKilometers
            battery
            motorType
            wheelSize
            color
            model
            weight
          }
        }
      }
    `;

    const fetchProducts = async () => {
      const result = await axios({
        method: "post",
        url: `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}?access_token=EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
        data: JSON.stringify({ query }),
        headers: {
          Authorization: `Bearer EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
          "Content-Type": "application/json",
        },
      });

      setProducts(result.data.data.productCollection.items);
    };

    if (comparisonProductsIds.length > 0) fetchProducts();
  }, []);

  return (
    <Layout>
      {window.screen.width < 992 ? (
        <MobileComparisonContainer />
      ) : (
        <React.Suspense fallback={<p>Loading...</p>}>
          <div className={styles.container}>
            <ComparisonsHeader />
            <div className={styles.content__container}>
              <ComparedProductsContainer
                setShowModal={setShowModal}
                setProductId={setProductId}
                setShowDescriptionModal={setShowDescriptionModal}
                products={products}
              />
              <ComparisonsSidebar setShowModal={setShowModal} />
            </div>
          </div>
        </React.Suspense>
      )}
      {showModal && <AddToComparisonModal setShowModal={setShowModal} />}
      {showDescriptionModal && (
        <ProductDescriptionModal
          setShowDescriptionModal={setShowDescriptionModal}
          productId={productId}
        />
      )}
    </Layout>
  );
}
