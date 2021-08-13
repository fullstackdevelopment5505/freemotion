import React, { useState, useEffect } from "react";
import styles from "../styles/BlogPage.module.scss";
import Layout from "../components/Layout";
import HeaderBanner from "../images/Rectangle 1457.png";
import BannerDecoration from "../images/bg_bnr_decor.png";
import AuthorAvatar from "../images/image 2 (1).png";
import axios from "axios";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { DateTime } from "luxon";
import NewsletterBanner from "../components/Homepage/NewsletterBanner/NewsletterBanner";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

// SVG Icons
import ShareIcon from "../svgs/ic_share.svg";
import LinkedinIcon from "../svgs/linkedin.svg";
import FacebookIcon from "../svgs/facebook.svg";
import TwitterIcon from "../svgs/twitter.svg";
import LinkIcon from "../svgs/link.svg";
import { ReactSVG } from "react-svg";
import RelatedBlogs from "../components/BlogPage/RelatedBlogs/RelatedBlogs";
/* import NewsletterBanner from "../components/BlogPage/NewsletterBanner/NewsletterBanner"; */
import { LazyLoadImage } from "react-lazy-load-image-component";

const readingTime = require("reading-time");

export default function BlogPage() {
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = window.location.href.split("/");
    const blogId = url[url.length - 1];

    const fetchBlogThumbnail = async (assetId) => {
      const asset = await axios({
        method: "get",
        url: `https://cdn.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/assets/${assetId}`,
        headers: {
          Authorization: `Bearer EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
        },
      });

      return asset.data.fields.file.url;
    };

    const fetchBlogData = async () => {
      const result = await axios({
        method: "get",
        url: `https://cdn.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/entries?select=sys.id,sys.createdAt,fields&sys.id=${blogId}`,
        headers: {
          Authorization: `Bearer EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
        },
      });

      const blogThumbnail = await fetchBlogThumbnail(
        result.data.items[0].fields.thumbnailImage.sys.id,
      );

      console.log({
        ...result.data.items[0].fields,
        id: result.data.items[0].sys.id,
        thumbnail: blogThumbnail,
        publishedAt: result.data.items[0].sys.createdAt,
        readingTime: getTextLength(result.data.items[0].fields.blogContent),
      });

      setBlog({
        ...result.data.items[0].fields,
        id: result.data.items[0].sys.id,
        thumbnail: blogThumbnail,
        publishedAt: result.data.items[0].sys.createdAt,
        readingTime: getTextLength(result.data.items[0].fields.blogContent),
      });
      setLoading(false);
    };

    fetchBlogData();
  }, []);

  useEffect(() => {
    const xSection = Array.from(document.getElementsByTagName("code"));
    console.log(xSection);
    xSection.forEach((item) => {
      item.parentElement.style.borderLeft = "5px solid #333";
      item.parentElement.style.padding = "1.5rem";
      item.parentElement.style.backgroundColor = "#f9fafa";
    });
  }, [loading]);

  const getTextLength = (htmlStringText) => {
    const cleanText = documentToHtmlString(htmlStringText).replace(
      /<[^>]*>?/gm,
      "",
    );
    const rTime = readingTime(cleanText).text;
    return rTime;
  };

  return (
    <Layout>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.banner__wrapper}>
              <LazyLoadImage
                className={styles.background__bannerImage}
                src={HeaderBanner}
                alt="xx"
              />
              <LazyLoadImage
                src={BannerDecoration}
                className={styles.decoration__bannerImage}
                alt="yy"
              />
            </div>
            <div className={styles.header__blogHeader}>
              <LazyLoadImage
                className={styles.thumbnail}
                src={blog.thumbnail}
                alt={blog.title}
              />
              <div className={styles.content__header}>
                <div className={styles.top}>
                  <span>{blog.category}</span>
                  <span>{blog.readingTime}</span>
                </div>
                <h2>{blog.title}</h2>
                <div className={styles.author}>
                  <LazyLoadImage src={AuthorAvatar} alt="John Smith" />
                  <div>
                    <span>John Smith</span>
                    <span>
                      {DateTime.fromISO(blog.publishedAt).toFormat(
                        "MMMM dd, yyyy",
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.content__container}>
            <div className={styles.floatingSocialButtons__wrapper}>
              <ReactSVG src={ShareIcon} />
              <ReactSVG src={LinkedinIcon} />
              <ReactSVG src={FacebookIcon} />
              <ReactSVG src={TwitterIcon} />
              <ReactSVG src={LinkIcon} />
            </div>
            <div className={styles.content__wrapper}>
              {documentToReactComponents(blog.blogContent)}
            </div>
            <div className={styles.sharePost}>
              <span>Share Post</span>
              <div className={styles.buttons__wrapper}>
                <ReactSVG src={LinkedinIcon} />
                <ReactSVG src={FacebookIcon} />
                <ReactSVG src={TwitterIcon} />
                <ReactSVG src={LinkIcon} />
              </div>
            </div>
            <div className={styles.tags__wrapper}>
              {blog.tags.map((tag, index) => (
                <p key={index}>
                  <span>#</span>
                  {tag}
                </p>
              ))}
            </div>
          </div>
          <div className={styles.relatedPosts__container}>
            <div className={styles.relatedPosts__wrapper}>
              <RelatedBlogs />
            </div>
          </div>
          <div className={styles.newsletter__wrapper}>
            <NewsletterBanner />
          </div>
        </div>
      )}
    </Layout>
  );
}
