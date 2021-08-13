import React, { useState, useEffect } from "react";
import styles from "./BlogsSection.module.scss";
import Blog from "./Blog/Blog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { DateTime } from "luxon";
import sanitizeHtml from "sanitize-html";
import Carousel from "react-elastic-carousel";
import CarouselDots from "../../Mobile/CarouselDots/CarouselDots";

export default function BlogsSection() {
  const [currentItem, setCurrentItem] = useState(0);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState(null);

  const carouselWrapper = document.getElementsByClassName(
    "rec-slider-container",
  )[3];

  let buttonIndex = window.screen.width < 768 ? 4 : 2;

  const carouselPrevButton = document.getElementsByClassName("rec-arrow-left")[
    buttonIndex
  ];
  const carouselNextButton = document.getElementsByClassName("rec-arrow-right")[
    buttonIndex
  ];

  const prevBlog = () => {
    carouselPrevButton.click();
    currentItem > 0 && setCurrentItem((prevState) => prevState - 1);
  };

  const nextBlog = () => {
    carouselNextButton.click();
    currentItem < 7 && setCurrentItem((prevState) => prevState + 1);
  };

  carouselPrevButton?.setAttribute("style", "display: none");
  carouselNextButton?.setAttribute("style", "display: none");
  carouselWrapper?.setAttribute("style", "margin: 0");

  useEffect(() => {
    const query = `
      {
        blogPostCollection {
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

      console.log(result.data.data.blogPostCollection.items);

      setBlogs(result.data.data.blogPostCollection.items);
    };

    fetchBlogPosts();

    setLoading(false);
  }, []);

  return (
    <div className={styles.blogsSection__wrapper}>
      <div className={styles.blogsSection}>
        {!!blogs && blogs.length > 0 && (
          <div className={styles.header}>
            {window.screen.width < 768 ? (
              <div className={styles.wrapper}>
                <h3>Blog</h3>
                <CarouselDots numItems={7} currentItem={currentItem} />{" "}
              </div>
            ) : (
              <h3>Blog</h3>
            )}
            <div className={styles.controller}>
              <button onClick={() => prevBlog()}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button onClick={() => nextBlog()}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        )}
        <div className={styles.blogs__container}>
          <Carousel
            itemsToShow={window.screen.width < 768 ? 1 : 3}
            pagination={false}>
            {!!blogs &&
              blogs.map((blog, index) => (
                <Blog
                  key={index}
                  title={blog.title}
                  date={DateTime.fromISO(blog.sys.publishedAt).toFormat(
                    "MMMM dd, yyyy",
                  )}
                  blogId={blog.sys.id}
                  content={
                    sanitizeHtml(
                      documentToHtmlString(blog.blogContent.json).replace(
                        /<[^>]*>?/gm,
                        "",
                      ),
                    ).slice(0, 150) + "..."
                  }
                  thumbnail={blog.thumbnailImage.url}
                />
              ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
