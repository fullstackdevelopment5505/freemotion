import React from "react";
import SidebarLayout from "../components/AccountPages/SidebarLayout/SidebarLayout";
import Layout from "../components/Layout";
import styles from "../styles/ShippingInfoPage.module.scss";
import ShippingInfoFormWrapper from "../components/AccountPages/ShippingInfoFormWrapper/ShippingInfoFormWrapper";
import AccountPagesNavigation from "../components/Mobile/AccountPagesNavigation/AccountPagesNavigation";

export default function ShippingInfoPage() {
  return (
    <Layout>
      <div className={styles.container}>
        {window.screen.width >= 992 && <SidebarLayout />}
        {window.screen.width < 992 && <AccountPagesNavigation />}
        <ShippingInfoFormWrapper />
      </div>
    </Layout>
  );
}
