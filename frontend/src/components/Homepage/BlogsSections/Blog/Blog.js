import React from "react";
import styles from "./Blog.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faCalendar as farCalendar } from "@fortawesome/free-regular-svg-icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useHistory } from "react-router-dom";

export default function Blog({ thumbnail, title, date, content, blogId }) {
  const history = useHistory();

  return (
    <div className={styles.blog__wrapper}>
      <div className={styles.thumbnail__wrapper}>
        <img
          src={thumbnail}
          alt={title}
          onClick={() => history.push(`/blogs/${blogId}`)}
        />
        <div className={styles.thumbnailTitle}>
          <h3>{title}</h3>
        </div>
      </div>
      <div className={styles.blog__content}>
        <div className={styles.date__wrapper}>
          <FontAwesomeIcon icon={farCalendar} />
          <span>{date}</span>
        </div>
        <p>{content}</p>
      </div>
    </div>
  );
}
