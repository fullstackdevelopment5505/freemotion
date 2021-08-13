import React from "react";
import styles from "./BlogsContainer.module.scss";
import ShowcaseBlogs from "./ShowcaseBlogs/ShowcaseBlogs";
import Blogs from "./Blogs/Blogs";
import { default as MobileBlogsContainer } from "../../Mobile/BlogsPage/BlogsContainer/BlogsContainer";

export default function BlogsContainer({ blogs }) {
  console.log(blogs);

  return (
    <div className={styles.container}>
      {window.screen.width < 992 ? (
        <MobileBlogsContainer blogs={blogs} />
      ) : (
        <React.Fragment>
          <ShowcaseBlogs
            blogs={blogs && blogs.length !== 0 && blogs.slice(0, 5)}
          />
          <Blogs blogs={blogs && blogs.length !== 0 && blogs.slice(5)} />
        </React.Fragment>
      )}
    </div>
  );
}
