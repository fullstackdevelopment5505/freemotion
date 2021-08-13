import React from "react";
import Blog from "./Blog/Blog";
import HighlightedBlog from "./HighlightedBlog/HighlightedBlog";
import styles from "./ShowcaseBlogs.module.scss";

export default function ShowcaseBlogs({ blogs }) {
  return (
    <div className={styles.container}>
      <HighlightedBlog blog={blogs && blogs.length != 0 && blogs[0]} />
      <div className={styles.blogs__block}>
        {[...Array(4)].map((blog, index) => (
          <Blog key={index} />
        ))}
      </div>
    </div>
  );
}
