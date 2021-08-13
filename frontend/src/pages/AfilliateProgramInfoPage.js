import React from "react";
import Banner from "../components/AfilliateProgramInfoPage/Banner/Banner";
import FAQ from "../components/AfilliateProgramInfoPage/FAQ/FAQ";
import MainPerks from "../components/AfilliateProgramInfoPage/MainPerks/MainPerks";
import Layout from "../components/Layout";
import Button from "../components/UI-Components/Button/Button";
import styles from "../styles/AfilliateProgramInfoPage.module.scss";

export default function AfilliateProgramInfoPage() {
  return (
    <Layout>
      <div className={styles.container}>
        <Banner />
        <MainPerks />
        <FAQ />
        <div className={styles.CTO__wrapper}>
          <h3>Redeem your Rewards Credit on future purchases</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting.
          </p>
          <Button content={"Apply Now"} />
        </div>
      </div>
    </Layout>
  );
}
