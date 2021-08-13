import React, { useState } from "react";
import styles from "./Header.module.scss";
import { ReactSVG } from "react-svg";
import { Link, useHistory } from "react-router-dom";
import PhoneIcon from "../../../svgs/phone.svg";
import EmptyHeartIcon from "../../../svgs/empty_heart.svg";
import ScaleIcon from "../../../svgs/scale.svg";
import SearchIcon from "../../../svgs/search.svg";
import HamburgerIcon from "../../../svgs/hamburger.svg";
import EmptyCartIcon from "../../../svgs/empty_cart.svg";
import MovingTruckIcon from "../../../svgs/moving_truck.svg";
import Logo from "../../../svgs/logo.svg";
import { useSelector } from "react-redux";

const SearchSection = () => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className={styles.searchSection__container}>
      <div className={styles.input__wrapper}>
        <ReactSVG src={SearchIcon} />
        <input
          type="search"
          name="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <span onClick={() => setSearchInput("")}>Cancel</span>
    </div>
  );
};

const getNumShoppingCartItems = (products) => {
  return products.reduce((a, b) => a + b.quantity, 0);
};

export default function Header({ setShowSideMenu }) {
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const history = useHistory();

  const numShoppingCartItems = getNumShoppingCartItems(
    useSelector((state) => state.shoppingCart.products),
  );
  const numWishlistItems = useSelector((state) => state.wishlist.items.length);

  return (
    <div className={styles.header__container}>
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
          <div
            className={styles.comparison__wrapper}
            onClick={() => history.push("/compare")}>
            <ReactSVG src={ScaleIcon} />
          </div>
          <div
            className={styles.wishlist__wrapper}
            onClick={() => history.push("/wishlist")}>
            <ReactSVG src={EmptyHeartIcon} />
            {numWishlistItems ? (
              <div className={styles.numWishlistItems}>
                <span>{numWishlistItems}</span>
              </div>
            ) : null}
          </div>
          <div
            className={styles.shoppingCart__wrapper}
            onClick={() => history.push("/cart")}>
            <ReactSVG src={EmptyCartIcon} />
            {numShoppingCartItems ? (
              <div className={styles.numCartItems}>
                <span>{numShoppingCartItems}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className={styles.middleRow__wrapper}>
        <ReactSVG src={HamburgerIcon} onClick={() => setShowSideMenu(true)} />
        <ReactSVG src={Logo} onClick={() => history.push("/")} />
        <ReactSVG
          src={SearchIcon}
          onClick={() => setShowSearchMenu((prevState) => !prevState)}
        />
      </div>
      <div className={styles.bottom}>
        {showSearchMenu ? (
          <SearchSection />
        ) : (
          <div className={styles.freeShippingInfo__container}>
            <div className={styles.section__top}>
              <ReactSVG src={MovingTruckIcon} />
              <span>FREE SHIPPING</span>
              <ReactSVG src={MovingTruckIcon} />
            </div>
            <div className={styles.section__bottom}>
              <span>FROM LOS ANGELES ACROSS USA & CANADA</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
