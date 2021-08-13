import React from "react";
import styles from "./Footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faEnvelope,
  faMapMarkerAlt,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import { ReactSVG } from "react-svg";

import DutyfreeLogo from "../../../svgs/dutyfree.svg";

import KlarnaLogo from "../../../svgs/klarna.svg";
import PaybrightLogo from "../../../svgs/paybright.svg";
import VisaLogo from "../../../svgs/visa.svg";
import AmericanExpressLogo from "../../../svgs/americanexpress.svg";
import MastercardLogo from "../../../svgs/mastercard.svg";
import PaypalLogo from "../../../svgs/paypal.svg";

import InstagramIcon from "../../../svgs/instagram.svg";
import FacebookIcon from "../../../svgs/facebook.svg";
import TwitterIcon from "../../../svgs/twitter.svg";
import YoutubeIcon from "../../../svgs/youtube.svg";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addFilter } from "../../../actions/filtersActions";

export default function Footer() {
  const history = useHistory();
  const dispatch = useDispatch();

  const categories = [
    "Electric Unicycles",
    "Electric Scooters",
    "Electric Skateboards",
    "Hoverboards",
    "Used Certified",
    "Extras",
  ];

  return (
    <div className={styles.footer__container}>
      <div className={styles.section}>
        <h4>SHOP</h4>
        <ul>
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() => {
                history.push(`products`);
                dispatch(addFilter("category", category));
              }}>
              <FontAwesomeIcon icon={faChevronRight} />
              <span>{category}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.section}>
        <h4>CUSTOMER SERVICES</h4>
        <ul>
          <li
            onClick={() => {
              history.push(`/support/contact`);
            }}>
            <FontAwesomeIcon icon={faChevronRight} />
            <span>Contact Freemotion</span>
          </li>
          <li
            onClick={() => {
              history.push(`/affiliate`);
            }}>
            <FontAwesomeIcon icon={faChevronRight} />
            <span>Affiliate Program</span>
          </li>
          <li
            onClick={() => {
              history.push(`products`);
            }}>
            <FontAwesomeIcon icon={faChevronRight} />
            <span>Become Partner</span>
          </li>
          <li
            onClick={() => {
              history.push(`/testimonials`);
            }}>
            <FontAwesomeIcon icon={faChevronRight} />
            <span>Customer Testimonials</span>
          </li>
          <li
            onClick={() => {
              history.push(`products`);
            }}>
            <FontAwesomeIcon icon={faChevronRight} />
            <span>Freemotion Safety</span>
          </li>
          <li
            onClick={() => {
              history.push(`/frequently-asked-questions`);
            }}>
            <FontAwesomeIcon icon={faChevronRight} />
            <span>FAQ</span>
          </li>
        </ul>
      </div>
      <div className={styles.section}>
        <h4>INFORMATION</h4>
        <ul>
          <li
            onClick={() => {
              history.push(`/blog`);
            }}>
            <FontAwesomeIcon icon={faChevronRight} />
            <span>Our Blog</span>
          </li>
          <li
            onClick={() => {
              history.push(`/about`);
            }}>
            <FontAwesomeIcon icon={faChevronRight} />
            <span>Our Story</span>
          </li>
          <li
            onClick={() => {
              history.push(`products`);
            }}>
            <FontAwesomeIcon icon={faChevronRight} />
            <span>Why Buy From Us?</span>
          </li>
          <li
            onClick={() => {
              history.push(`/shipping-info`);
            }}>
            <FontAwesomeIcon icon={faChevronRight} />
            <span>Shipping & Returns</span>
          </li>
          <li
            onClick={() => {
              history.push(`/warranty-info`);
            }}>
            <FontAwesomeIcon icon={faChevronRight} />
            <span>Warranty Policy</span>
          </li>
          <li
            onClick={() => {
              history.push(`/buying-guide`);
            }}>
            <FontAwesomeIcon icon={faChevronRight} />
            <span>Buying Guide</span>
          </li>
        </ul>
      </div>
      <div className={styles.locationSection__container}>
        <div>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <div className={styles.location}>
            <span>San Diego, California, USA</span>
            <span>Montreal, QC, Canada</span>
          </div>
        </div>
        <div>
          <FontAwesomeIcon icon={faPhoneAlt} />
          <span>(626) 295-6599</span>
          <span>/</span>
          <span>(514) 922-7332</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faEnvelope} />
          <span>info@freemotion.com </span>
        </div>
      </div>
      <div className={styles.logosSection__container}>
        <div className={styles.firstRow}>
          <ReactSVG src={DutyfreeLogo} />
        </div>
        <div className={styles.secondRow}>
          <ReactSVG src={KlarnaLogo} />
          <ReactSVG src={PaybrightLogo} />
        </div>
        <div className={styles.thirdRow}>
          <ReactSVG src={VisaLogo} />
          <ReactSVG src={AmericanExpressLogo} />
          <ReactSVG src={MastercardLogo} />
          <div className={styles.paypal__wrapper}>
            <ReactSVG src={PaypalLogo} />
          </div>
        </div>
      </div>
      <div className={styles.footerBottom__container}>
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
        <div className={styles.usefulLinks__container}>
          <ul>
            <li onClick={() => history.push(`/`)}>
              <span>Privacy Policy</span>
            </li>
            <li onClick={() => history.push(`/`)}>
              <span>Terms & Conditions</span>
            </li>
            <li onClick={() => history.push(`/`)}>
              <span>Terms Of Use</span>
            </li>
            <li onClick={() => history.push(`/`)}>
              <span>Site Map</span>
            </li>
          </ul>
        </div>
        <div className={styles.copyright}>
          <span>© 2020 Freemotion. All Rights Reserved</span>
        </div>
      </div>
    </div>
  );
}
