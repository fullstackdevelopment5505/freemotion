import React, { useEffect } from "react";
import styles from "./OrdersContainer.module.scss";
import OrderBlock from "./OrderBlock/OrderBlock";

export default function OrdersContainer({
  setShowOrderDetails,
  setOrderId,
  loading,
  setLoading,
  orders,
}) {
  console.log(orders);

  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className={styles.orders__container}>
      <h2>Orders</h2>
      <div className={styles.ordersTags}>
        <span>Order</span>
        <span>Date</span>
        <span>Status</span>
        <span>Total</span>
        <span>Tracking</span>
        <span>Actions</span>
      </div>
      <div className={styles.orders__wrapper}>
        {!!orders &&
          orders.map((order) => (
            <OrderBlock
              key={order.id}
              id={order.id}
              date={order.placedAt}
              status={"Cancelled"}
              total={{
                value: order.cartTotal,
                numItems: order.products.length,
              }}
              tracking={{ operator: "FedEx", id: "4455798709987" }}
              setShowOrderDetails={setShowOrderDetails}
              setOrderId={setOrderId}
            />
          ))}
      </div>
    </div>
  );
}
