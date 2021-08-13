import React, { useState } from "react";
import SidebarLayout from "../components/AccountPages/SidebarLayout/SidebarLayout";
import Layout from "../components/Layout";
import styles from "../styles/ProfilePage.module.scss";
import ShippingInfoFormWrapper from "../components/AccountPages/ShippingInfoFormWrapper/ShippingInfoFormWrapper";
import ProfileFormWrapper from "../components/AccountPages/ProfilePage/ProfileFormWrapper/ProfileFormWrapper";
import { FirebaseContext } from "../components/Firebase";
import AccountPagesNavigation from "../components/Mobile/AccountPagesNavigation/AccountPagesNavigation";

export default function AccountPage() {
  const [loading, setLoading] = useState(true);

  return (
    <Layout>
      <FirebaseContext.Consumer>
        {(firebase) => (
          <div className={styles.container}>
            {window.screen.width >= 992 && <SidebarLayout />}
            {window.screen.width < 992 && <AccountPagesNavigation />}
            <div className={styles.rightCol}>
              <h2>Profile Details</h2>
              <ProfileFormWrapper
                loading={loading}
                firebase={firebase}
                setLoading={setLoading}
              />
            </div>
          </div>
        )}
      </FirebaseContext.Consumer>
    </Layout>
  );
}
