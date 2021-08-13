import React from "react";
import styles from "./AffiliateNavigation.module.scss";
import { Link } from "react-router-dom";

const snakeCaseConverter = (string) => {
  return string
    .replace(/\W+/g, " ")
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join("_");
};

export default function AffiliateNavigation({
  activeSection,
  setActiveSection,
  renderAffiliateSection,
}) {
  const navLinks = [
    "Overview",
    "Commissions",
    "Clicks",
    "Payments",
    "Generate Link",
    "Settings",
  ];

  return (
    <div className={styles.nav__container}>
      <ul>
        {navLinks.map((link, index) => (
          <li
            key={index}
            style={
              snakeCaseConverter(link) === activeSection
                ? { borderBottomColor: "#212121" }
                : {}
            }>
            <Link
              to={`/account/affiliate/${snakeCaseConverter(link)}`}
              onClick={() => {
                setActiveSection(snakeCaseConverter(link));
                renderAffiliateSection(snakeCaseConverter(link));
              }}>
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
