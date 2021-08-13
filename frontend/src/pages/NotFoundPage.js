import React from "react";
import Layout from "../components/Layout";
import styles from "../styles/NotFoundPage.module.scss";
import { Link } from "react-router-dom";

import BrokenScooter from "../images/broken_scooter.png";
import SearchIcon from "../svgs/search.svg";
import LeftCaret from "../svgs/left_caret.svg";
import { ReactSVG } from "react-svg";
import NewReleaseShowcase from "../components/NotFoundPage/NewReleaseShowcase/NewReleaseShowcase";

export default function NotFoundPage() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.top__section}>
          <div className={styles.goHome}>
            <ReactSVG src={LeftCaret} />
            <Link to="/">Go Home</Link>
          </div>
          <h1>Oops!</h1>
          <p>This page can't be found</p>
          <img src={BrokenScooter} alt={"Oops! This page can't be found"} />
          <span>Nothing has been found at this location.</span>
          <span>Try searching, or check out the links below.</span>
          <div className={styles.searchbar__wrapper}>
            <ReactSVG src={SearchIcon} />
            <input type="search" name="search" placeholder="Search..." />
          </div>
        </div>
        <div className={styles.popularProducts__container}>
          <NewReleaseShowcase />
        </div>
      </div>
    </Layout>
  );
}
