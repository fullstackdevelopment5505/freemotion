import React from "react";
import styles from "./AffiliateNavigation.module.scss";
import MenuIcon from "../../../../svgs/ic_menu.svg";
import { useHistory } from "react-router-dom";
import { ReactSVG } from "react-svg";

export default function AffiliateNavigation({
  activeSection,
  setActiveSection,
  renderAffiliateSection,
  openNav,
  setOpenNav,
}) {
  const history = useHistory();

  const snakeCaseConverter = (string) => {
    return string
      .replace(/\W+/g, " ")
      .split(/ |\B(?=[A-Z])/)
      .map((word) => word.toLowerCase())
      .join("_");
  };

  const navItems = [
    {
      content: "Overview",
      link: "/overview",
    },
    {
      content: "Commissions",
      link: "/commissions",
    },
    {
      content: "Clicks",
      link: "/clicks",
    },
    {
      content: "Payments",
      link: "/payments",
    },
    {
      content: "Generate Link",
      link: "/generate_link",
    },
    {
      content: "Settings",
      link: "/settings",
    },
  ];

  function titleCase(string) {
    let sentence = string.toLowerCase().replace("_", " ").split(" ");
    for (let i = 0; i < sentence.length; i++)
      sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);

    return sentence.join(" ");
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.content__wrapper}
        onClick={() => setOpenNav((prevState) => !prevState)}
        style={
          openNav === false
            ? {
                borderBottomLeftRadius: "6px",
                borderBottomRightRadius: "6px",
              }
            : {}
        }>
        <span>{titleCase(activeSection)}</span>
        <ReactSVG src={MenuIcon} />
      </div>
      {openNav ? (
        <div className={styles.dropdown__menu}>
          <ul className={styles.dropdown__list}>
            {navItems.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  renderAffiliateSection(snakeCaseConverter(item.content));
                  setActiveSection(snakeCaseConverter(item.content));
                  history.push(`/account/affiliate${item.link}`);

                  setTimeout(() => {
                    setOpenNav(false);
                  }, 250);
                }}>
                <span
                  style={
                    snakeCaseConverter(item.content) === activeSection
                      ? { color: "#212121", borderBottomColor: "#212121" }
                      : { color: "#898989" }
                  }>
                  {item.content}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
