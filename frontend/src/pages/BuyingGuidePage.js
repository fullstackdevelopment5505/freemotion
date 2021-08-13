import React, { useState } from "react";
import styles from "../styles/BuyingGuidePage.module.scss";
import Layout from "../components/Layout";
import GuideNavigation from "../components/BuyingGuidePage/GuideNavigation/GuideNavigation";
import GuideContent from "../components/BuyingGuidePage/GuideContent/GuideContent";
import GuideFAQ from "../components/BuyingGuidePage/GuideFAQ/GuideFAQ";
import { default as MobileGuideNavigation } from "../components/Mobile/GuideNavigation/GuideNavigation";

export default function BuyingGuidePage() {
  const [selectedOption, setSelectedOption] = useState("Cost");

  const navContent = [
    "Cost",
    "Ease Of Use",
    "Comfort",
    "Safety",
    "Range",
    "Battery",
    "Capacity",
    "FAQ",
  ];

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Buying Guide For Beginners</h2>
          <p>
            Electric Scooters may be the ideal solution for personal transport.
            Using a scooter is easy, without the hassle or cost associated with
            public transport or driving. No need to find a parking space, no
            need for a garage.
          </p>
        </div>
        <div className={styles.wrapper}>
          {window.screen.width < 991.98 ? (
            <MobileGuideNavigation
              options={navContent}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          ) : (
            <GuideNavigation options={navContent} />
          )}
          <div className={styles.guide__container}>
            <GuideContent />
            <GuideFAQ />
          </div>
        </div>
      </div>
    </Layout>
  );
}
