import React from "react";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactSVG } from "react-svg";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import UserAvatar from "../../svgs/avatar.svg";
import InstagramIcon from "../../svgs/instagram.svg";
import FacebookIcon from "../../svgs/facebook.svg";
import TwitterIcon from "../../svgs/twitter.svg";
import YoutubeIcon from "../../svgs/youtube.svg";
import Logo from "../../svgs/logo.svg";
import MovingTruck from "../../svgs/moving_truck.svg";
import Phone from "../../svgs/phone.svg";
import EmptyHeart from "../../svgs/empty_heart.svg";
import Scale from "../../svgs/scale.svg";
import Search from "../../svgs/search.svg";
import EmptyCart from "../../svgs/empty_cart.svg";
import US_Flag from "../../svgs/us_flag.svg";

import {
  renderDataHeaderLanguage,
  renderDataHeaderCurrency,
} from "../LanguageCurrencyModal/helpers/renderData";
import { withFirebase } from "../Firebase";

const getNumShoppingCartItems = (products) => {
  return products.reduce((a, b) => a + b.quantity, 0);
};

function Header({
  firebase,
  showOptionsModal,
  setShowOptionsModal,
  language,
  currency,
  setShowDealsDropdown,
  setShowBrandsDropdown,
  setShowProductsDropdown,
}) {
  const numShoppingCartItems = getNumShoppingCartItems(
    useSelector((state) => state.shoppingCart.products),
  );
  const numWishlistItems = useSelector((state) => state.wishlist.items.length);

  return (
    <div className={styles.header}>
      <div className={styles.top__wrapper}>
        <div className={styles.top}>
          <div className={styles.wrapper}>
            <ReactSVG src={MovingTruck} />
            <span className={styles.shipping__info}>
              FREE SHIPPING FROM LOS ANGELES ACROSS USA & CANADA
            </span>
          </div>
          <div className={styles.column__wrapper}>
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
            <div
              style={{ backgroundColor: !!showOptionsModal && "#fff" }}
              className={styles.currency__wrapper}
              onClick={() => setShowOptionsModal((prevState) => !prevState)}>
              {renderDataHeaderLanguage(language)}
              <span style={{ color: !!showOptionsModal && "#212121" }}>
                / {renderDataHeaderCurrency(currency)}
              </span>
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
            <div className={styles.call__wrapper}>
              <ReactSVG src={Phone} />
              <span>Call 24/7</span>
              <a href="tel:(626) 295-6599">(626) 295-6599</a>
              <a href="tel:(514) 922-7332">(514) 922-7332</a>
            </div>
            <div className={styles.avatar__wrapper}>
              <Link
                to={firebase.auth.currentUser ? "/account/profile" : "/login"}>
                <ReactSVG src={UserAvatar} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom__wrapper}>
        <div className={styles.bottom}>
          <div className={styles.leftCol}>
            <Link to="/">
              <ReactSVG className={styles.logo} src={Logo} />
            </Link>
            <ul>
              <Link
                to="/products"
                onMouseOver={() => {
                  setShowProductsDropdown(true);
                  setShowBrandsDropdown(false);
                  setShowDealsDropdown(false);
                }}>
                <li>
                  <span>Products</span>
                  <FontAwesomeIcon icon={faCaretDown} />
                </li>
              </Link>
              <Link
                to="/brands"
                onMouseOver={() => {
                  setShowBrandsDropdown(true);
                  setShowDealsDropdown(false);
                  setShowProductsDropdown(false);
                }}>
                <li>
                  <span>Brands</span>
                  <FontAwesomeIcon icon={faCaretDown} />
                </li>
              </Link>
              <Link
                to="/deals"
                onMouseOver={() => {
                  setShowDealsDropdown(true);
                  setShowBrandsDropdown(false);
                  setShowProductsDropdown(false);
                }}>
                <li>
                  <span>Deals</span>
                  <FontAwesomeIcon icon={faCaretDown} />
                </li>
              </Link>
            </ul>
          </div>
          <div className={styles.rightCol}>
            <div className={styles.socialIcons}>
              <a
                href="https://www.instagram.com/freemotionshop"
                rel="noreferrer"
                target="_blank">
                <div className={styles.instagramIcon}>
                  <ReactSVG src={InstagramIcon} />
                </div>
              </a>
              <a
                href="https://facebook.com/FreeMotionStore"
                rel="noreferrer"
                target="_blank">
                <div className={styles.facebookIcon}>
                  <ReactSVG src={FacebookIcon} />
                </div>
              </a>
              <a
                href="https://twitter.com/FreeMotionShop"
                rel="noreferrer"
                target="_blank">
                <div className={styles.twitterIcon}>
                  <ReactSVG src={TwitterIcon} />
                </div>
              </a>
              <a
                href="https://www.youtube.com/channel/UCYLFI3ZpXTYnLwgSln5wOcw"
                rel="noreferrer"
                target="_blank">
                <div className={styles.youtubeIcon}>
                  <ReactSVG src={YoutubeIcon} />
                </div>
              </a>
            </div>
            <div className={styles.searchbar__wrapper}>
              <input type="search" placeholder="Search..." />
              <ReactSVG src={Search} />
            </div>
            <div className={styles.options__wrapper}>
              <Link to="/compare">
                <ReactSVG src={Scale} />
              </Link>
              <Link to="/wishlist">
                <div className={styles.wishlist__wrapper}>
                  <ReactSVG src={EmptyHeart} />
                  {numWishlistItems ? (
                    <div className={styles.numWishlistItems}>
                      <span>{numWishlistItems}</span>
                    </div>
                  ) : null}
                </div>
              </Link>
              <Link to="/cart">
                <div className={styles.cart__wrapper}>
                  <ReactSVG src={EmptyCart} />
                  {numShoppingCartItems ? (
                    <div className={styles.numCartItems}>
                      <span>{numShoppingCartItems}</span>
                    </div>
                  ) : null}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Header = withFirebase(Header);

export default Header;
