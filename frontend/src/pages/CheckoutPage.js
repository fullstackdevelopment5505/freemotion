import React, { useState, useEffect } from "react";
import OrderSteps from "../components/CheckoutPage/OrderSteps/OrderSteps";
import Layout from "../components/Layout";
import styles from "../styles/CheckoutPage.module.scss";
import { default as Shipping } from "../components/CheckoutPage/Shipping/Shipping";
import Payment from "../components/CheckoutPage/Payment/Payment";
import OrderSummary from "../components/CheckoutPage/OrderSummary/OrderSummary";
import OrderOverview from "../components/CheckoutPage/OrderOverview/OrderOverview";
import { withFirebase } from "../components/Firebase";
import { useSelector } from "react-redux";
import axios from "axios";

function CheckoutPage({ firebase }) {
  const [currentStep, setCurrentStep] = useState(1);

  let localUserUid;

  const user = JSON.parse(localStorage.getItem("authUser"));
  if (user) localUserUid = user.uid;

  let loggedUser = localUserUid ? true : false;

  const orderStep = window.location.pathname.split("/")[2];
  const [stage, setStage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Shipping Info
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [userRegion, setUserRegion] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userStreetAddressLine1, setUserStreetAddressLine1] = useState("");
  const [userStreetAddressLine2, setUserStreetAddressLine2] = useState("");
  const [userStreetAddress, setUserStreetAddress] = useState("");
  const [userZip, setUserZip] = useState("");
  const [sameBillingAddress, setSameBillingAddress] = useState(true);

  // Shopping Cart Fetching State
  const shippingCartProductsIds = useSelector(
    (state) => state.shoppingCart.products,
  );
  const [products, setProducts] = useState([]);

  // Fetch Shopping Cart Products
  useEffect(() => {
    let queryHeader = ``;

    console.log(shippingCartProductsIds);
    if (shippingCartProductsIds.length > 0) {
      queryHeader = `(where: {sys: {id_in: [`;
      for (let i = 0; i < shippingCartProductsIds.length; i++) {
        queryHeader += `"${shippingCartProductsIds[i].productId}"`;
        if (i < shippingCartProductsIds.length - 1) queryHeader += `, `;
      }
      queryHeader += `]}})`;
    }

    const query = `
      query {
        productCollection${queryHeader} {
          items {
            productName
            sku
            oldPrice
            currentPrice
            colorOptions
            brand
            productImage {
              url
            }
            sys {
              id
            }
            itemsInStock
          }
        }
      }
    `;

    console.log(query);

    const fetchProducts = async () => {
      const result = await axios({
        method: "post",
        url: `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}?access_token=EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
        data: JSON.stringify({ query }),
        headers: {
          Authorization: `Bearer EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
          "Content-Type": "application/json",
        },
      });

      let xProducts = result.data.data.productCollection.items;

      if (xProducts.length)
        for (let i = 0; i < xProducts.length; i++) {
          for (let j = 0; j < shippingCartProductsIds.length; j++)
            if (xProducts[i].sys.id == shippingCartProductsIds[j].productId) {
              xProducts[i].quantity = shippingCartProductsIds[j].quantity;
              setProducts((prevState) => [...prevState, xProducts[i]]);
            }

          setProducts(xProducts);
          console.log(xProducts);
        }
    };

    if (shippingCartProductsIds.length > 0) fetchProducts();
  }, []);

  // Fetch User Shipping & Billing Data
  useEffect(() => {
    const fetchUserDisplayName = async () => {
      if (localUserUid)
        await firebase
          .user(localUserUid)
          .once("value")
          .then((snapshot) => {
            setUserFirstName(snapshot.val().firstName);
            setUserLastName(snapshot.val().lastName);
            setUserEmail(snapshot.val().email);
            setUserCity(snapshot.val().address?.city);
            setUserPhoneNumber(snapshot.val()?.phoneNumber);
            setUserCountry(snapshot.val().address?.country);
            setUserRegion(snapshot.val().address?.region);
            setUserStreetAddressLine1(
              snapshot.val().address?.streetAddressLine1,
            );
            setUserStreetAddressLine2(
              snapshot.val().address?.streetAddressLine2,
            );
            setUserZip(snapshot.val().address?.zipCode);

            setTimeout(() => setLoading(false));
          });
    };

    const orderStage = handleCheckoutStep(orderStep);
    setStage(orderStage);

    // console.log(validateZipCode(userCountry, "efsfdsagsdfh d125ft25da"));

    // console.log(validatePhoneNumber("0756516223", userCountry));

    fetchUserDisplayName();
  }, [orderStep, products]);

  const handleCheckoutStep = (step) => {
    step = parseInt(step);

    switch (step) {
      case 1:
        return (
          <Shipping
            loading={loading}
            setLoading={setLoading}
            userFirstName={userFirstName}
            setUserFirstName={setUserFirstName}
            userLastName={userLastName}
            setUserLastName={setUserLastName}
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            userCity={userCity}
            setUserCity={setUserCity}
            userCountry={userCountry}
            setUserCountry={setUserCountry}
            userRegion={userRegion}
            setUserRegion={setUserRegion}
            userPhoneNumber={userPhoneNumber}
            setUserPhoneNumber={setUserPhoneNumber}
            userStreetAddressLine1={userStreetAddressLine1}
            setUserStreetAddressLine1={setUserStreetAddressLine1}
            userStreetAddressLine2={userStreetAddressLine2}
            setUserStreetAddressLine2={setUserStreetAddressLine2}
            setUserStreetAddress={setUserStreetAddress}
            userZip={userZip}
            setUserZip={setUserZip}
            sameBillingAddress={sameBillingAddress}
            setSameBillingAddress={setSameBillingAddress}
            setStage={setCurrentStep}
          />
        );
      case 2:
        return <Payment products={products} setStage={setCurrentStep} />;
      case 3:
        return (
          <OrderSummary
            setLoading={setLoading}
            products={products}
            setStage={setCurrentStep}
          />
        );
      default:
        return (
          <Shipping
            loading={loading}
            setLoading={setLoading}
            userFirstName={userFirstName}
            setUserFirstName={setUserFirstName}
            userLastName={userLastName}
            setUserLastName={setUserLastName}
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            userCity={userCity}
            setUserCity={setUserCity}
            userCountry={userCountry}
            setUserCountry={setUserCountry}
            userRegion={userRegion}
            setUserRegion={setUserRegion}
            userPhoneNumber={userPhoneNumber}
            setUserPhoneNumber={setUserPhoneNumber}
            userStreetAddressLine1={userStreetAddressLine1}
            setUserStreetAddressLine1={setUserStreetAddressLine1}
            userStreetAddressLine2={userStreetAddressLine2}
            setUserStreetAddressLine2={setUserStreetAddressLine2}
            userZip={userZip}
            setUserZip={setUserZip}
            sameBillingAddress={sameBillingAddress}
            setSameBillingAddress={setSameBillingAddress}
            setStage={setCurrentStep}
          />
        );
    }
  };

  return (
    <Layout>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <React.Fragment>
          <OrderSteps
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
          <div className={styles.container}>
            {stage}
            {orderStep != 3 && (
              <OrderOverview
                loggedUser={loggedUser}
                orderStep={orderStep}
                products={products}
              />
            )}
          </div>
        </React.Fragment>
      )}
    </Layout>
  );
}

CheckoutPage = withFirebase(CheckoutPage);

export default CheckoutPage;
