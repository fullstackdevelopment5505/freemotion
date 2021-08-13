import React, { useState, Suspense, useLayoutEffect } from "react";
import styles from "../styles/Homepage.module.scss";
import Layout from "../components/Layout";
import Hero from "../components/Homepage/Hero/Hero";
import QualityAssuranceBanner from "../components/Homepage/QualityAssuranceBanner/QualityAssuranceBanner";
import CategoriesShowcase from "../components/Homepage/CategoriesShowcase/CategoriesShowcase";
import BestSellerShowcase from "../components/Homepage/BestSellerShowcase/BestSellerShowcase";
import CompareProductsBanner from "../components/Homepage/CompareProductsBanner/CompareProductsBanner";
import NewReleaseShowcase from "../components/Homepage/NewReleaseShowcase/NewReleaseShowcase";
import ReviewsSection from "../components/Homepage/ReviewsSection/ReviewsSection";
import BlogsSection from "../components/Homepage/BlogsSections/BlogsSection";
import NewsletterBanner from "../components/Homepage/NewsletterBanner/NewsletterBanner";
import DeliveryInfo from "../components/Homepage/DeliveryInfo/DeliveryInfo";
import PopularBrands from "../components/Homepage/PopularBrands/PopularBrands";
import MessengerCustomerChat from "react-messenger-customer-chat";
import { default as TabletShowcase } from "../components/Tablet/CategoriesShowcase/CategoriesShowcase";

export default function Homepage() {
  const [loading, setLoading] = useState(true);

  return (
    <Layout>
      <Hero />
      <QualityAssuranceBanner />
      {window.screen.width >= 576 && window.screen.width < 768 ? (
        <TabletShowcase />
      ) : (
        <CategoriesShowcase />
      )}
      <DeliveryInfo />
      <BestSellerShowcase />
      <CompareProductsBanner />
      <Suspense fallback={<p>Loading New Products...</p>}>
        <NewReleaseShowcase loading={loading} setLoading={setLoading} />
      </Suspense>
      <PopularBrands />
      <ReviewsSection />
      {/* Instagram Banner */}
      <BlogsSection />
      <NewsletterBanner />
      {/*  <MessengerCustomerChat pageId="" appId="429632885128789" htmlRef="https://www.facebook.com/FreeMotionStore/" /> */}
    </Layout>
  );
}
