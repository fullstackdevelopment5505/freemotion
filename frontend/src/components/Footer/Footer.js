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

import DutyfreeLogo from "../../svgs/dutyfree.svg";

import KlarnaLogo from "../../svgs/klarna.svg";
import PaybrightLogo from "../../svgs/paybright.svg";
import VisaLogo from "../../svgs/visa.svg";
import AmericanExpressLogo from "../../svgs/americanexpress.svg";
import MastercardLogo from "../../svgs/mastercard.svg";
import PaypalLogo from "../../svgs/paypal.svg";

import InstagramIcon from "../../svgs/instagram.svg";
import FacebookIcon from "../../svgs/facebook.svg";
import TwitterIcon from "../../svgs/twitter.svg";
import YoutubeIcon from "../../svgs/youtube.svg";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFilter } from "../../actions/filtersActions";

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
    <div className={styles.footer__wrapper}>
      <div className={styles.footer}>
        <div className={styles.top__row}>
          <div className={styles.upperFooter}>
            <div className={styles.logo__wrapper__column}>
              <h2>FREEMOTION</h2>
              <ul>
                <li>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <div className={styles.location}>
                    <span>San Diego, California, USA</span>
                    <span>Montreal, QC, Canada</span>
                  </div>
                </li>
                <li className={styles.phone}>
                  <FontAwesomeIcon icon={faPhoneAlt} />
                  <div className={styles.phone__numbers}>
                    <span>(626) 295-6599</span>
                    <span>(514) 922-7332</span>
                  </div>
                </li>
                <li>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span>info@freemotion.com </span>
                </li>
              </ul>
            </div>
            <div className={styles.footer__categories__wrapper}>
              <div className={styles.categories__wrapper}>
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
              <div className={styles.categories__wrapper}>
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
                  {/* Need to talk with the designer in order to see what would be best for this page */}
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
              <div className={styles.categories__wrapper}>
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
                      history.push(`/testimonials`);
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
            </div>
          </div>
          <div className={styles.paymentGateways__row}>
            <ReactSVG src={DutyfreeLogo} />
            <div className={styles.paymentGateways__container}>
              <ReactSVG src={KlarnaLogo} />
              <ReactSVG src={PaybrightLogo} />
              <ReactSVG src={VisaLogo} />
              <ReactSVG src={AmericanExpressLogo} />
              <ReactSVG src={MastercardLogo} />
              <div className={styles.paypal__wrapper}>
                <ReactSVG src={PaypalLogo} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottom__row}>
          <span className={styles.copyright}>
            © 2020 Freemotion. All Rights Reserved
          </span>
          <div className={styles.rightCol}>
            <div className={styles.social__wrapper}>
              <a
                href="https://www.instagram.com/freemotionshop"
                rel="noreferrer"
                target="_blank">
                <ReactSVG src={InstagramIcon} />
              </a>
              <a
                href="https://www.instagram.com/freemotionshop"
                rel="noreferrer"
                target="_blank">
                <ReactSVG src={FacebookIcon} />
              </a>
              <a
                href="https://www.instagram.com/freemotionshop"
                rel="noreferrer"
                target="_blank">
                <ReactSVG src={TwitterIcon} />
              </a>
              <a
                href="https://www.instagram.com/freemotionshop"
                rel="noreferrer"
                target="_blank">
                <ReactSVG src={YoutubeIcon} />
              </a>
            </div>
            <div className={styles.infoPages__wrapper}>
              <ul>
                <li onClick={() => history.push(`/`)}>
                  <span>Privacy Policy</span>
                </li>
                <li onClick={() => history.push(`/`)}>
                  <span>Terms & Conditions</span>
                </li>
                {/* Work with React-Router Sitemap Generator Library Installed on 10/07/2021 at 11:06 AM */}
                <li onClick={() => history.push(`/`)}>
                  <span>Site Map</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
