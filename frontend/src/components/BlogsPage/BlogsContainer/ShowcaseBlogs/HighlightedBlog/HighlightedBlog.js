import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./HighlightedBlog.module.scss";

export default function HighlightedBlog({ blog }) {
  const history = useHistory();

  return (
    <div
      className={styles.container}
      onClick={() => history.push(`/blogs/${blog.sys.id}`)}>
      {blog ? (
        <React.Fragment>
          <img src={blog.thumbnailImage.url} alt={blog.title} />
          <div className={styles.shade} />
          <div className={styles.readingTime__wrapper}>
            <span>8 min read</span>
          </div>
          <div className={styles.blogContent__wrapper}>
            <span>{blog.category}</span>
            <h2>{blog.title}</h2>
            <p>
              {blog.blogContent.json.content[0].content[0].value
                .split(" ")
                .slice(0, 31)
                .join(" ") + "..."}
            </p>
          </div>
        </React.Fragment>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
