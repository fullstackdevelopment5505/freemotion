import React from "react";
import SidebarLayout from "../components/AccountPages/SidebarLayout/SidebarLayout";
import Layout from "../components/Layout";
import styles from "../styles/AccountPage.module.scss";
import AccountBanner from "../components/AccountPages/AccountPage/AccountBanner/AccountBanner";
import RecommendedProducts from "../components/AccountPages/AccountPage/RecommendedProducts/RecommendedProducts";
import { FirebaseContext } from "../components/Firebase";
import AccountNavigation from "../components/Mobile/AccountNavigation/AccountNavigation";

export default function AccountPage() {
  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <Layout>
          <div className={styles.container}>
            {window.screen.width >= 992 && <SidebarLayout />}
            <div className={styles.content__wrapper}>
              <AccountBanner firebase={firebase} />
              {window.screen.width < 992 && <AccountNavigation />}
              <RecommendedProducts />
            </div>
          </div>
        </Layout>
      )}
    </FirebaseContext.Consumer>
  );
}
