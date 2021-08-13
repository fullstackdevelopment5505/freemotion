import React, { useEffect } from "react";
import styles from "./Overview.module.scss";
import RightArrowIcon from "../../../../svgs/right_arrow.svg";
import CopyIcon from "../../../../svgs/copy.svg";
import MailIcon from "../../../../svgs/copy_mail.svg";
import { renderCurrencyLocale } from "../../../../helpers/renderCurrency";
import FacebookIcon from "../../../../svgs/copy_facebook.svg";
import { ReactSVG } from "react-svg";

const CommissionEntryRow = ({ id, status, rate, amount }) => (
  <div className={styles.commissionEntry__wrapper}>
    <span>{id}</span>
    <span>{status}</span>
    <span>{rate}</span>
    <span>{renderCurrencyLocale(amount)}</span>
  </div>
);

const RecentClicksEntryRow = ({ link, origin, status, date }) => (
  <div className={styles.recentClicksEntry__wrapper}>
    <span>{link}</span>
    <span>{origin}</span>
    <span>{status}</span>
    <span>{date}</span>
  </div>
);

const EmptyRecentClicks = () => (
  <div className={styles.emptyRecentClicks}>
    <h5>Sorry! There are no registered clicks yet</h5>
  </div>
);

export default function Overview({ loading, setLoading }) {
  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className={styles.container}>
      <h3>Stats</h3>
      <div className={styles.cards__container}>
        <div className={styles.balanceCard}>
          <div className={styles.header}>
            <div className={styles.leftCol}>
              <span>Balance</span>
              <span>As of 2/9/2021</span>
            </div>
            <div>
              <span>Withdrawal of funds</span>
              <ReactSVG src={RightArrowIcon} />
            </div>
          </div>
          <div className={styles.card__content}>
            <p>{renderCurrencyLocale(1000)}</p>
            <p>
              Affiliate rate: <span>5.00%</span>
            </p>
          </div>
        </div>
        <div className={styles.visitorsCard}>
          <div className={styles.header}>
            <span>Visitors</span>
            <span>As of 2/9/2021</span>
          </div>
          <div className={styles.card__content}>
            <p>25</p>
            <p>
              Conversion rate: <span>5.00%</span>
            </p>
          </div>
        </div>
        <div className={styles.earningsCard}>
          <div className={styles.header}>
            <div className={styles.wrapper}>
              <span>Total Earnings</span>
              <span>{renderCurrencyLocale(6000)}</span>
            </div>
            <div className={styles.wrapper}>
              <span>Total Refunded</span>
              <span>{renderCurrencyLocale(5000)}</span>
            </div>
          </div>
          <div className={styles.footer}>
            <div>
              <span>Total Paid</span>
              <span>{renderCurrencyLocale(1000)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.recentCommissions__container}>
        <h3>Recent Commissions</h3>
        <div className={styles.table__wrapper}>
          <div className={styles.tags}>
            <span>ID</span>
            <span>Status</span>
            <span>Rate</span>
            <span>Amount</span>
          </div>
          <div className={styles.commissionsEntries__container}>
            {[...Array(4)].map((entry, index) => (
              <CommissionEntryRow
                key={index}
                id={1}
                status={"active"}
                rate={12}
                amount={123}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.recentClicks__container}>
        <h3>Recent Clicks</h3>
        <div className={styles.table__wrapper}>
          <div className={styles.tags}>
            <span>Link</span>
            <span>Origin</span>
            <span>Status</span>
            <span>Date</span>
          </div>
          <div className={styles.recentClicksEntries__container}>
            {[...Array(4)].map((entry, index) => (
              <RecentClicksEntryRow
                key={index}
                link={"Some Link"}
                origin={"Some origin"}
                status={"active"}
                date={"12/02/2021"}
              />
            ))}
            {/* <EmptyRecentClicks /> */}
          </div>
        </div>
      </div>
      <div className={styles.mobileAffiliateInfo}>
        <div className={styles.top}>
          <span>Your Affiliate ID</span>
          <span>11742</span>
        </div>
        <div className={styles.middle}>
          <span>Your Referral URL</span>
          <div className={styles.url__placeholder}>
            <span>https://freemotionshop.com?ref=11742</span>
            <ReactSVG src={CopyIcon} />
          </div>
          <div className={styles.icons__wrapper}>
            <ReactSVG src={FacebookIcon} />
            <ReactSVG src={MailIcon} />
          </div>
        </div>
      </div>
      <div className={styles.recentCommisions__card}>
        <h3>Recent Commissions</h3>
        <p>Sorry! There are no registered commissions yet.</p>
      </div>
      <div className={styles.recentClicks__card}>
        <h3>Recent Clicks</h3>
        <p>Sorry! There are no registered commissions yet.</p>
      </div>
    </div>
  );
}
