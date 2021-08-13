import React, { useEffect, lazy } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { withAuthentication } from "./components/Session/index";
import "graphql-playground/playground.css";
import axios from "axios";

// Lazy Loaded Routes to improve UX and increase website performance
const Homepage = lazy(() => import("./pages/Homepage"));
const ProductPage = lazy(() => import("./components/ProductPage/ProductPage"));
const AdminPage = lazy(() => import("./components/Admin"));
const FinancingPage = lazy(() => import("./pages/FinancingPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const ShoppingCartPage = lazy(() => import("./pages/ShoppingCartPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ShippingInfoPage = lazy(() => import("./pages/ShippingInfoPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BlogsPage = lazy(() => import("./pages/BlogsPage"));
const ComparisonsPage = lazy(() => import("./pages/ComparisonsPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));
const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage"));
const DealsPage = lazy(() => import("./pages/DealsPage"));
const BuyingGuidePage = lazy(() => import("./pages/BuyingGuidePage"));
const BrandsPage = lazy(() => import("./pages/BrandsPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const ShippingPage = lazy(() => import("./pages/ShippingPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const AffiliatePage = lazy(() => import("./pages/AffiliatePage"));
const WarrantyPage = lazy(() => import("./pages/WarrantyPage"));
const AfilliateProgramInfoPage = lazy(() =>
  import("./pages/AfilliateProgramInfoPage"),
);
const PaymentTestPage = lazy(() => import("./pages/PaymentTestPage"));
const PayPalTestPage = lazy(() => import("./pages/PayPalTestPage"));
const PaybrightTestPage = lazy(() => import("./pages/PaybrightTestPage"));
require("dotenv").config();

const contentful = require("contentful-management");
const client = contentful.createClient({
  accessToken: "CFPAT-9djfGPi-y6loHuG2DfHszb5O-Xw9l83iaQhw-b4W7yc",
});

const App = () => {
  useEffect(() => {
    const fetchAffiliateData = async () => {
      const url = window.location.href;
      if (url.includes("?ref=")) {
        const code = url.split("?ref=")[1];

        const result = await axios.post("/affiliate/check_affiliate_code", {
          code,
        });
        // console.log(result.data.result); 10OFFALL
      }
    };
    fetchAffiliateData();
  }, []);

  useEffect(() => {
    client
      .getSpace(process.env.REACT_APP_CONTENTFUL_SPACE_ID)
      .then((space) => space.getEnvironment("master-2021-02-10"))
      .then((environment) => environment.getEntry("3aAixUMllX9XxFBMtpNI0P"))
      .then((entry) => {
        entry.fields.numberSoldProducts["en-US"] = 0;
        return entry.update();
      })
      .then((entry) => console.log(`Entry ${entry.sys.id} updated.`))
      .catch(console.error);
  }, []);

  return (
    <Router>
      <div className="App">
        <React.Suspense fallback={<h2>Loading...</h2>}>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/products" component={ProductsPage} />
          <Route path="/products/:product_id" component={ProductPage} />
          <Route path="/cart" component={ShoppingCartPage} />
          <Route path="/account" exact={true} component={AccountPage} />
          <Route path="/account/affiliate" component={AffiliatePage} />
          <Route path="/account/orders" component={OrdersPage} />
          <Route path="/account/billing" component={ShippingInfoPage} />
          <Route path="/account/profile" component={ProfilePage} />
          <Route path="/wishlist" component={WishlistPage} />
          <Route path="/affiliate" component={AfilliateProgramInfoPage} />
          <Route path="/support/contact" component={ContactPage} />
          <Route path="/compare" component={ComparisonsPage} />
          <Route path="/blog" exact={true} component={BlogsPage} />
          <Route path="/blogs/:blog_id" component={BlogPage} />
          <Route path="/checkout/:order_step" component={CheckoutPage} />
          <Route path="/about" component={AboutUsPage} />
          <Route path="/frequently-asked-questions" component={FAQPage} />
          <Route path="/financing" component={FinancingPage} />
          <Route path="/testimonials" component={TestimonialsPage} />
          <Route path="/buying-guide" component={BuyingGuidePage} />
          <Route path="/deals" component={DealsPage} />
          <Route path="/brands" component={BrandsPage} />
          <Route path="/shipping-info" component={ShippingPage} />
          <Route path="/warranty-info" component={WarrantyPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/test_stripe_payment" component={PaymentTestPage} />
          <Route path="/test_paypal_payment" component={PayPalTestPage} />
          <Route path="/test_paybright_payment" component={PaybrightTestPage} />
          {/* <Route from="*" exact={true} component={NotFoundPage} /> */}
        </React.Suspense>
      </div>
    </Router>
  );
};

export default withAuthentication(App);
