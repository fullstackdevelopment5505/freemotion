import React, { useEffect, useState } from "react";
import AffiliateNavigation from "../components/AccountPages/AffiliatePage/AffiliateNavigation/AffiliateNavigation";
import Overview from "../components/AccountPages/AffiliatePage/Overview/Overview";
import Commissions from "../components/AccountPages/AffiliatePage/Commissions/Commissions";

import SidebarLayout from "../components/AccountPages/SidebarLayout/SidebarLayout";
import Layout from "../components/Layout";
import styles from "../styles/AffiliatePage.module.scss";
import GenerateLink from "../components/AccountPages/AffiliatePage/GenerateLink/GenerateLink";
import Settings from "../components/AccountPages/AffiliatePage/Settings/Settings";
import Clicks from "../components/AccountPages/AffiliatePage/Clicks/Clicks";
import Payments from "../components/AccountPages/AffiliatePage/Payments/Payments";
import AccountPagesNavigation from "../components/Mobile/AccountPagesNavigation/AccountPagesNavigation";
import { default as MobileAffiliateNavigation } from "../components/Mobile/Affiliate/AffiliateNavigation/AffiliateNavigation";

export default function AffiliatePage() {
  const [affSection, setAffSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(1);
  const [activeNavSection, setActiveNavSection] = useState("Overview");
  const [openNav, setOpenNav] = useState(false);

  const renderAffiliateSection = (activeSection) => {
    switch (activeSection) {
      case "overview":
        setAffSection(<Overview loading={loading} setLoading={setLoading} />);
        break;
      case "commissions":
        setAffSection(
          <Commissions loading={loading} setLoading={setLoading} />,
        );
        break;
      case "clicks":
        setAffSection(<Clicks loading={loading} setLoading={setLoading} />);
        break;
      case "payments":
        setAffSection(<Payments loading={loading} setLoading={setLoading} />);
        break;
      case "generate_link":
        setAffSection(
          <GenerateLink loading={loading} setLoading={setLoading} />,
        );
        break;
      case "settings":
        setAffSection(<Settings loading={loading} setLoading={setLoading} />);
        break;

      default:
        setAffSection(<Overview loading={loading} setLoading={setLoading} />);
    }
  };

  useState(() => {
    const url = window.location.href.split("/");
    const section = url[url.length - 1];
    renderAffiliateSection(section);
    setActiveSection(section);
    setLoading(false);
  }, [activeSection]);

  return (
    <Layout>
      <div className={styles.container}>
        {window.screen.width >= 992 && <SidebarLayout />}
        {window.screen.width < 992 && <AccountPagesNavigation />}
        <div className={styles.content__container}>
          {window.screen.width < 992 ? (
            <MobileAffiliateNavigation
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              renderAffiliateSection={renderAffiliateSection}
              openNav={openNav}
              setOpenNav={setOpenNav}
            />
          ) : (
            <AffiliateNavigation
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              renderAffiliateSection={renderAffiliateSection}
            />
          )}
          {affSection}
        </div>
      </div>
    </Layout>
  );
}
