import React from "react";
import HelpPagesLayout from "../components/HelpPagesLayout/HelpPagesLayout";
import Layout from "../components/Layout";
import SupportInfoForm from "../components/SupportPages/ContactPage/SupportInfoForm/SupportInfoForm";
import styles from "../styles/ContactPage.module.scss";

export default function SupportPage() {
  return (
    <Layout>
      <div className={styles.container}>
        <HelpPagesLayout />
        <SupportInfoForm />
      </div>
    </Layout>
  );
}
