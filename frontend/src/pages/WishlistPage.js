import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ProductsContainer from "../components/WishlistPage/ProductsContainer/ProductsContainer";
import styles from "../styles/WishlistPage.module.scss";
import BannerImage from "../images/image 3.png";
import Button2 from "../components/UI-Components/Button2/Button2";
import { useSelector } from "react-redux";
import { FirebaseContext } from "../components/Firebase";
import axios from "axios";

export const RegisterBanner = () => (
  <div className={styles.banner}>
    <img
      src={BannerImage}
      alt={"Log in to save the items so they won't be lost."}
    />
    <div className={styles.banner__textContent}>
      <div className={styles.topBlock}>
        <h3>DON'T LOSE YOUR WISHLIST</h3>
        <p>Log in to save the items so they won't be lost.</p>
      </div>
      <Button2 content={"Register"} />
      <div className={styles.bottomBlock}>
        <p>Do you have an account ?</p>
        <span>LOG IN</span>
      </div>
    </div>
  </div>
);

export default function WishlistPage() {
  const wishlistItemsIds = useSelector((state) => state.wishlist.items);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let queryHeader = ``;

    console.log(wishlistItemsIds);
    if (wishlistItemsIds.length > 0) {
      queryHeader = `(where: {sys: {id_in: [`;
      for (let i = 0; i < wishlistItemsIds.length; i++) {
        queryHeader += `"${wishlistItemsIds[i]}"`;
        if (i < wishlistItemsIds.length - 1) queryHeader += `, `;
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

    if (wishlistItemsIds.length > 0) fetchProducts();
  }, []);

  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <Layout>
          <React.Suspense fallback={<p>Loading...</p>}>
            <div className={styles.container}>
              <div className={styles.header}>
                <h3>My Wishlist</h3>
                {products.length > 0 ? (
                  products.length > 1 ? (
                    <p>{products.length} Items</p>
                  ) : (
                    <p>One Item</p>
                  )
                ) : (
                  <p>No Items</p>
                )}
              </div>
              <div className={styles.row}>
                <ProductsContainer products={products} />
                {!firebase.auth.currentUser && <RegisterBanner />}
              </div>
            </div>
          </React.Suspense>
        </Layout>
      )}
    </FirebaseContext.Consumer>
  );
}
