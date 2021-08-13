import React from "react";
import HeaderController from "../../UI-Components/HeaderController/HeaderController";
import styles from "./RelatedBlogs.module.scss";
import Blog from "./Blog/Blog";

export default function RelatedBlogs() {
  return (
    <div className={styles.container}>
      <HeaderController header={"Related Posts"} />
      <div className={styles.blogs__container}>
        {[...Array(4)].map((blog, index) => (
          <Blog />
        ))}
      </div>
    </div>
  );
}
