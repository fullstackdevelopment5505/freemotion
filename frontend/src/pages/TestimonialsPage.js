import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TestimonialsContainer from "../components/TestimonialsPage/TestimonialsContainer/TestimonialsContainer";
import styles from "../styles/TestimonialsPage.module.scss";
import OverallRating from "../components/TestimonialsPage/OverallRating/OverallRating";
import axios from "axios";
import { withFirebase } from "../components/Firebase";

function decimalAdjust(type, value, exp) {
  // If the exp is undefined or zero...
  if (typeof exp === "undefined" || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  value = value.toString().split("e");
  value = Math[type](+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp)));
  // Shift back
  value = value.toString().split("e");
  return +(value[0] + "e" + (value[1] ? +value[1] + exp : exp));
}

Math.round10 = function (value, exp) {
  return decimalAdjust("round", value, exp);
};

function TestimonialsPage({ firebase }) {
  const [reviews, setReviews] = useState([]);
  const [reviewsProducts, setReviewsProducts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All Reviews");

  const filters = [
    "All Reviews",
    "Electric Unicycles",
    "Electric Scooters",
    "Electric Skateboard",
  ];

  useEffect(() => {
    const fetchProductThumbnail = async (assetId) => {
      const asset = await axios({
        method: "get",
        url: `https://cdn.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/assets/${assetId}`,
        headers: {
          Authorization: `Bearer EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
        },
      });

      return asset.data.fields.file.url;
    };

    const fetchProductsData = async (productsIds) => {
      productsIds.forEach(async (productId) => {
        const result = await axios({
          method: "get",
          url: `https://cdn.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/entries?select=sys.id,sys.createdAt,fields&sys.id=${productId}`,
          headers: {
            Authorization: `Bearer EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
          },
        });

        const productThumbnail = await fetchProductThumbnail(
          result.data.items[0].fields.productImage.sys.id,
        );

        setReviewsProducts((prevState) => ({
          ...prevState,
          [productId]: {
            productName: result.data.items[0].fields.productName,
            productImage: productThumbnail,
          },
        }));
      });
    };

    const fetchProductReviews = async () => {
      const reviews =
        selectedCategory === "All Reviews"
          ? await firebase.reviews()
          : await firebase.categoryReviews(selectedCategory);
      let ids = [];

      if (reviews.empty) console.log("No Reviews!");

      reviews.forEach((review) => {
        setReviews((prevState) => [...prevState, review.data()]);
        ids.push(review.data().productId);
      });

      fetchProductsData(ids);
    };

    setReviews([]);
    fetchProductReviews();
  }, [selectedCategory]);

  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);

  return (
    <Layout>
      <React.Suspense fallback={<p>Loading Reviews</p>}>
        <div className={styles.container}>
          <h2>Customer Testimonials</h2>
          <div className={styles.wrapper}>
            {window.screen.width < 575.98 && (
              <div className={styles.navigation__wrapper}>
                <ul>
                  {filters.map((filter, index) => (
                    <li key={index} onClick={() => setSelectedCategory(filter)}>
                      <span>{filter}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <React.Fragment>
              {!!reviews.length ? <OverallRating reviews={reviews} /> : null}
              <div className={styles.testimonials__container}>
                {window.screen.width > 575.98 && (
                  <div className={styles.filters__wrapper}>
                    <div className={styles.filters}>
                      {filters.map((filter, index) => (
                        <span
                          style={
                            selectedCategory == filter
                              ? {
                                  color: "#ff5722",
                                  borderBottomColor: "#ff5722",
                                }
                              : {}
                          }
                          onClick={() => setSelectedCategory(filter)}
                          key={index}>
                          {filter}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {!!reviews.length ? (
                  <TestimonialsContainer
                    reviews={reviews}
                    reviewsProducts={reviewsProducts}
                  />
                ) : (
                  <p>No Reviews</p>
                )}
              </div>
            </React.Fragment>
          </div>
        </div>
      </React.Suspense>
    </Layout>
  );
}

TestimonialsPage = withFirebase(TestimonialsPage);

export default TestimonialsPage;
