import React, { useState } from "react";
import styles from "./Menu.module.scss";
import { ReactSVG } from "react-svg";
import French from "../../../svgs/languages_flags/french.svg";
import English from "../../../svgs/languages_flags/english.svg";

// Products Categories Images
import Unicycle from "../../../images/products_categories/unicycle_category.png";
import Scooter from "../../../images/products_categories/scooter_category.png";
import Skateboard from "../../../images/products_categories/skateboard_category.png";
import Accessory from "../../../images/products_categories/accessory_category.png";

import TimesIcon from "../../../svgs/times.svg";
import US_Flag from "../../../svgs/us_flag.svg";
import UserAvatar from "../../../svgs/avatar.svg";

import InstagramIcon from "../../../svgs/instagram.svg";
import FacebookIcon from "../../../svgs/facebook.svg";
import TwitterIcon from "../../../svgs/twitter.svg";
import YoutubeIcon from "../../../svgs/youtube.svg";

import PhoneIcon from "../../../svgs/phone.svg";
import EmptyHeartIcon from "../../../svgs/empty_heart.svg";
import ScaleIcon from "../../../svgs/scale.svg";
import EmptyCartIcon from "../../../svgs/empty_cart.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import CurrencyLanguageModal from "../CurrencyLanguageModal/CurrencyLanguageModal";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { addFilter } from "../../../actions/filtersActions";

export default function Menu({ setShowSideMenu }) {
  const [showCLMenu, setShowCLMenu] = useState(false);
  const currency = useSelector((state) => state.currency.currency);
  const language = useSelector((state) => state.language.language);
  const history = useHistory();
  const dispatch = useDispatch();

  const [showProductsCategories, setShowProductsCategories] = useState(false);

  const redirectWithCategory = (category) => {
    switch (category) {
      case "Electric Unicycles":
        dispatch(addFilter("category", "Electric Unicycles"));
        break;
      case "Electric Scooters":
        dispatch(addFilter("category", "Electric Scooters"));
        break;
      case "Electric Skateboards":
        dispatch(addFilter("category", "Electric Skateboards"));
        break;
      case "Accessories":
        dispatch(addFilter("category", "Extras"));
        break;
    }

    history.push("/products");
  };

  return (
    <React.Fragment>
      {showCLMenu && <CurrencyLanguageModal setShowCLMenu={setShowCLMenu} />}
      <div className={styles.menu__container}>
        <div className={styles.top}>
          <div className={styles.call__col}>
            <div className={styles.call__wrapper}>
              <ReactSVG src={PhoneIcon} />
              <span>Call 24/7</span>
            </div>
            <div className={styles.phoneNumbers__wrapper}>
              <a href="tel:(626) 295-6599">(626) 295-6599</a>
              <a href="tel:(514) 922-7332">(514) 922-7332</a>
            </div>
          </div>
          <div className={styles.optionsCol__container}>
            <div className={styles.comparison__wrapper}>
              <ReactSVG src={ScaleIcon} />
            </div>
            <div className={styles.wishlist__wrapper}>
              <ReactSVG src={EmptyHeartIcon} />
            </div>
            <div className={styles.shoppingCart__wrapper}>
              <ReactSVG src={EmptyCartIcon} />
            </div>
          </div>
        </div>
        <div className={styles.content__wrapper}>
          <div
            className={styles.closeIcon__wrapper}
            onClick={() => setShowSideMenu(false)}>
            <ReactSVG src={TimesIcon} />
          </div>
          <div
            className={styles.languageCurrency__wrapper}
            onClick={() => setShowCLMenu(!showCLMenu)}>
            <ReactSVG src={language === "en" ? English : French} />
            <span>{currency === "usd" ? "/ USD $" : "/ CAD C$"}</span>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
          <div className={styles.mainCategories__navigation}>
            <ul>
              <li className={styles.products}>
                <div
                  className={styles.item__header}
                  onClick={() =>
                    setShowProductsCategories((prevState) => !prevState)
                  }>
                  <h5>PRODUCTS</h5>
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    style={{
                      transition: "0.5s ease-in-out",
                      transform: showProductsCategories
                        ? `rotate(180deg)`
                        : `rotate(0)`,
                    }}
                  />
                </div>
                <div
                  style={
                    showProductsCategories
                      ? {
                          maxHeight: "45vh",
                        }
                      : {
                          maxHeight: "0",
                        }
                  }
                  className={styles.content}>
                  <div
                    className={styles.content__item}
                    onClick={() => {
                      redirectWithCategory("Electric Unicycles");
                    }}>
                    <img src={Unicycle} alt="Unicycles" />
                    <span>e-Unicycles</span>
                  </div>
                  <div
                    className={styles.content__item}
                    onClick={() => {
                      redirectWithCategory("Electric Scooters");
                    }}>
                    <img src={Scooter} alt="Scooters" />
                    <span>e-Scooters</span>
                  </div>
                  <div
                    className={styles.content__item}
                    onClick={() => {
                      redirectWithCategory("Electric Skateboards");
                    }}>
                    <img src={Skateboard} alt="Skateboards" />
                    <span>e-Skateboard</span>
                  </div>
                  <div
                    className={styles.content__item}
                    onClick={() => {
                      redirectWithCategory("Accessories");
                    }}>
                    <img src={Accessory} alt="Accessories" />
                    <span>e-Accessories</span>
                  </div>
                </div>
              </li>
              <li onClick={() => history.push("/brands")}>
                <h5>BRANDS</h5>
                <FontAwesomeIcon icon={faCaretDown} />
              </li>
              <li onClick={() => history.push("/deals")}>
                <h5>DEALS</h5>
                <FontAwesomeIcon icon={faCaretDown} />
              </li>
            </ul>
          </div>
          <div className={styles.usefulLinks__navigation}>
            <ul>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/financing">Financing</Link>
              </li>
              <li>
                <Link to="/support/contact">Support</Link>
              </li>
            </ul>
          </div>
          <div
            className={styles.account__wrapper}
            onClick={() => history.push("/account")}>
            <ReactSVG src={UserAvatar} />
            <span>My Account</span>
          </div>
          <div className={styles.social__container}>
            <div
              onClick={() =>
                window.location.replace(
                  "https://www.instagram.com/freemotionshop",
                )
              }>
              <ReactSVG src={InstagramIcon} />
            </div>
            <div
              onClick={() =>
                window.location.replace("https://facebook.com/FreeMotionStore")
              }>
              <ReactSVG src={FacebookIcon} />
            </div>
            <div
              onClick={() =>
                window.location.replace("https://twitter.com/FreeMotionShop")
              }>
              <ReactSVG src={TwitterIcon} />
            </div>
            <div
              onClick={() =>
                window.location.replace(
                  "https://www.youtube.com/channel/UCYLFI3ZpXTYnLwgSln5wOcw",
                )
              }>
              <ReactSVG src={YoutubeIcon} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
