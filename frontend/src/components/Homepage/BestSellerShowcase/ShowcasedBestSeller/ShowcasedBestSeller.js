import React, { useEffect, useState } from "react";
import styles from "./ShowcasedBestSeller.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { renderCurrencyLocale } from "../../../../helpers/renderCurrency";

// Icons
import TopSpeedIcon from "../../../../svgs/best_seller/hp_top_speed.svg";
import BatteryIcon from "../../../../svgs/best_seller/hp_battery.svg";
import MotorIcon from "../../../../svgs/best_seller/hp_motor.svg";

import { ReactSVG } from "react-svg";
import EmptyHeartIcon from "../../../../svgs/empty_heart.svg";
import EmptyStarIcon from "../../../../svgs/empty_star.svg";
import StarIcon from "../../../../svgs/full_star.svg";
import FullHeartIcon from "../../../../svgs/full_heart.svg";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToWishlist,
  removeWishlistItem,
} from "../../../../actions/wishlistActions";

export default function ShowcasedBestSeller({
  name,
  description,
  rating,
  image,
  productId,
  speedInfo,
  batteryInfo,
  motorInfo,
  oldPrice,
  newPrice,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const wishlistProductsId = useSelector((state) => state.wishlist.items);
  const [wishlistProduct, setWishlistProduct] = useState(false);

  useEffect(() => {
    setWishlistProduct(wishlistProductsId.includes(productId));
  }, []);

  return (
    <div className={styles.bestseller__wrapper}>
      <div className={styles.header}>
        <h3>BEST</h3>
        <h3>SELLER</h3>
      </div>
      <img src={image} alt={name} />
      <div className={styles.textContent__wrapper}>
        <h2>{name}</h2>
        <p>{description}</p>
        <div className={styles.review__wrapper}>
          {[...Array(Math.round(rating))].map((_, index) => (
            <ReactSVG src={StarIcon} key={index} />
          ))}
          {[...Array(5 - Math.round(rating))].map((_, index) => (
            <ReactSVG src={EmptyStarIcon} key={index} />
          ))}
        </div>
        <div className={styles.price__wrapper}>
          <div className={styles.oldPrice__wrapper}>
            <span>{renderCurrencyLocale(oldPrice)}</span>
            <div className={styles.diagonal__price__line} />
          </div>
          <span>{renderCurrencyLocale(newPrice)}</span>
        </div>
        <ul className={styles.specs__wrapper}>
          <li>
            <ReactSVG
              src={TopSpeedIcon}
              beforeInjection={(svg) => {
                svg.setAttribute("style", `width: 1.25rem`);
                svg.setAttribute("style", `height: 1.25rem`);
              }}
            />
            <span>{speedInfo}</span>
          </li>
          <li>
            <ReactSVG
              src={BatteryIcon}
              beforeInjection={(svg) => {
                svg.setAttribute("style", `width: 1.25rem`);
                svg.setAttribute("style", `height: 1.25rem`);
              }}
            />
            <span>{batteryInfo}</span>
          </li>
          <li>
            <ReactSVG
              src={MotorIcon}
              beforeInjection={(svg) => {
                svg.setAttribute("style", `width: 1.25rem`);
                svg.setAttribute("style", `height: 1.25rem`);
              }}
            />
            <span>{motorInfo}</span>
          </li>
        </ul>
        <div className={styles.purchase__wrapper}>
          <div className={styles.svg__wrapper}>
            {wishlistProduct ? (
              <ReactSVG
                beforeInjection={(svg) => {
                  svg.setAttribute("style", `width: 1.1rem`);
                  svg.setAttribute("style", `height: 1.1rem`);
                  svg.setAttribute("style", `margin-bottom: -6px`);
                  svg.children[0].setAttribute("style", `stroke: #ff5722`);
                }}
                src={FullHeartIcon}
                onClick={() => {
                  setWishlistProduct(false);
                  dispatch(removeWishlistItem(productId));
                }}
              />
            ) : (
              <ReactSVG
                beforeInjection={(svg) => {
                  svg.setAttribute("style", `width: 1.1rem`);
                  svg.setAttribute("style", `height: 1.1rem`);
                  svg.setAttribute("style", `margin-bottom: -6px`);
                }}
                src={EmptyHeartIcon}
                onClick={() => {
                  setWishlistProduct(true);
                  dispatch(addItemToWishlist(productId));
                }}
              />
            )}
          </div>
          <div
            className={styles.wrapper}
            onClick={() => history.push(`products`)}>
            <span>Buy now</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
        {/* <div className={styles.man__wrapper}>
          <img className={styles.man} src={ManImage} alt="Man" />
        </div> */}
      </div>
    </div>
  );
}
