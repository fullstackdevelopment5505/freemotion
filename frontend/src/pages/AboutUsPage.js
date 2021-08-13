import React from "react";
import styles from "../styles/AboutUsPage.module.scss";
import Layout from "../components/Layout";
import Hero from "../components/AboutUsPage/Hero/Hero";
import FloatingShowcase from "../components/AboutUsPage/FloatingShowcase/FloatingShowcase";
import ValuesShowcase from "../components/AboutUsPage/ValuesShowcase/ValuesShowcase";
import OurGoals from "../components/AboutUsPage/OurGoals/OurGoals";

export default function AboutUsPage() {
  return (
    <Layout>
      <div className={styles.container}>
        <Hero />
        <FloatingShowcase />
        <ValuesShowcase />
        <OurGoals />
      </div>
    </Layout>
  );
}
