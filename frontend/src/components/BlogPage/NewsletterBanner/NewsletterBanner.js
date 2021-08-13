import React from "react";
import styles from "./NewsletterBanner.module.scss";
import BannerImage from "../../../images/image 25.png";

import MailchimpSubscribe from "react-mailchimp-subscribe";

const url =
  "//yahoo.us7.list-manage.com/subscribe/post?u=f198fe8031a34580cffc764bc&id=5003ed61d3";

// simplest form (only email)
const SimpleForm = () => <MailchimpSubscribe url={url} />;

export default function NewsletterBanner() {
  return (
    <div className={styles.banner__container}>
      <img src={BannerImage} alt={"Newsletter Banner"} />
      <div className={styles.newsletter__bannerText}>
        <h4>Exclusive Deals</h4>
        <h5>
          Want to receive exclusive deals on the latest products? Sign up below
          to get promo codes in your inbox
        </h5>
        <MailchimpSubscribe
          url={url}
          render={({ subscribe, status, message }) => (
            <form
              onSubmitted={(formData) => subscribe(formData)}
              className={styles.email__wrapper}>
              <SimpleForm onSumbit={(formData) => subscribe(formData)} />
            </form>
          )}
        />
      </div>
    </div>
  );
}
