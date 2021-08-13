import React from "react";
import Blog from "./Blog/Blog";
import styles from "./Blogs.module.scss";
import NewsletterBanner from "../NewsletterBanner/NewsletterBanner";

export default function Blogs() {
  return (
    <div className={styles.container}>
      <div className={styles.blogsHeader}>
        {[...Array(6)].map((blog, index) => (
          <Blog key={index} />
        ))}
        <NewsletterBanner />
      </div>
      <div className={styles.blogsFooter}>
        {[...Array(4)].map((blog, index) => (
          <Blog key={index} />
        ))}
      </div>
    </div>
  );
}
