import React from "react";
import Blog from "../Blog/Blog";
import styles from "./BlogsContainer.module.scss";

export default function BlogsContainer({ blogs }) {
  return (
    <div className={styles.container}>
      {[...Array(6)].map((blog, index) => (
        <Blog key={index} />
      ))}
    </div>
  );
}
