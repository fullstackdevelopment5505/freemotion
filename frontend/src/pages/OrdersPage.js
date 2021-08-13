import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import styles from "../styles/OrdersPage.module.scss";
import SidebarLayout from "../components/AccountPages/SidebarLayout/SidebarLayout";
import OrdersContainer from "../components/AccountPages/OrdersPage/OrdersContainer/OrdersContainer";
import OrderDetailsModal from "../components/AccountPages/OrdersPage/OrderDetailsModal/OrderDetailsModal";
import { default as MobileOrdersContainer } from "../components/Mobile/OrdersContainer/OrdersContainer";
import { withFirebase } from "../components/Firebase";
import AccountPagesNavigation from "../components/Mobile/AccountPagesNavigation/AccountPagesNavigation";

let OrdersPage = ({ firebase }) => {
  let localUserUid;

  const user = JSON.parse(localStorage.getItem("authUser"));
  if (user) localUserUid = user.uid;

  const [loading, setLoading] = useState(true);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    console.log(localUserUid);

    const fetchUserOrders = async () => {
      let localOrders = [];

      if (localUserUid) {
        const ordersRef = firebase.fdb.collection("orders");

        const snapshot = await ordersRef
          .where("customerId", "==", localUserUid)
          .get();

        if (snapshot.empty) console.log("No Orders!");

        snapshot.forEach((order) => {
          localOrders = [...localOrders, order.data()];
        });
      }
      // Fetch Orders
      setOrders(localOrders);
    };

    fetchUserOrders();
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        {window.screen.width >= 992 && <SidebarLayout />}
        {window.screen.width < 992 && <AccountPagesNavigation />}
        {window.screen.width < 992 ? (
          <MobileOrdersContainer
            setShowOrderDetails={setShowOrderDetails}
            setOrderId={setOrderId}
            loading={loading}
            setLoading={setLoading}
            orders={orders}
          />
        ) : (
          <OrdersContainer
            setShowOrderDetails={setShowOrderDetails}
            setOrderId={setOrderId}
            loading={loading}
            setLoading={setLoading}
            orders={orders}
          />
        )}
      </div>
      {showOrderDetails && (
        <OrderDetailsModal
          orderId={orderId}
          setShowOrderDetails={setShowOrderDetails}
        />
      )}
    </Layout>
  );
};

OrdersPage = withFirebase(OrdersPage);

export default OrdersPage;
