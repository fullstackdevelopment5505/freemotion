import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/BlogsPage.module.scss";
import BlogsContainer from "../components/BlogsPage/BlogsContainer/BlogsContainer";
import Navigation from "../components/BlogsPage/Navigation/Navigation";
import { default as MobileNavigation } from "../components/Mobile/BlogsPage/Navigation/Navigation";
import axios from "axios";
require("dotenv").config();

export default function BlogPage() {
  const [loading, setLoading] = useState(true);
  const [blogsCategoryIndex, setBlogsCategoryIndex] = useState(1);
  const [blogs, setBlogs] = useState(null);

  const getCategoryByIndex = (categoryIndex) => {
    switch (categoryIndex) {
      case 1:
        return "";
      case 2:
        return "Electric Unicycles";
      case 3:
        return "Electric Scooters";
      case 4:
        return "Electric Skateboards";
    }
  };

  useEffect(() => {
    let category = getCategoryByIndex(blogsCategoryIndex);

    const queryHeader =
      blogsCategoryIndex != 1
        ? `blogPostCollection (where: {category: "${category}"})`
        : `blogPostCollection`;

    const query = `
      {
        ${queryHeader} {
          items {
            title
            category
            blogContent {
              json
            }
            createdAt
            tags
            sys {
              id
              publishedAt
            }
            thumbnailImage {
              url
            }
          }
        }
      }
    `;

    // console.log(query);

    const fetchBlogPosts = async () => {
      const result = await axios({
        method: "post",
        url: `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/`,
        data: JSON.stringify({ query }),
        headers: {
          Authorization: `Bearer EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
          "Content-Type": "application/json",
        },
      });

      // console.log(result.data.data.blogPostCollection.items);

      setBlogs(result.data.data.blogPostCollection.items);
    };

    fetchBlogPosts();

    setLoading(false);
  }, [blogsCategoryIndex]);

  return (
    <Layout>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.container}>
          {window.screen.width < 992 ? (
            <MobileNavigation
              categoryIndex={blogsCategoryIndex}
              setCategoryIndex={setBlogsCategoryIndex}
            />
          ) : (
            <Navigation
              categoryIndex={blogsCategoryIndex}
              setCategoryIndex={setBlogsCategoryIndex}
            />
          )}
          <BlogsContainer blogs={blogs} />
        </div>
      )}
    </Layout>
  );
}
