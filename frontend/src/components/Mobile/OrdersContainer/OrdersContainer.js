import React from "react";
import styles from "./OrdersContainer.module.scss";
import Order from "./Order/Order";

export default function OrdersContainer({
  setShowOrderDetails,
  setOrderId,
  loading,
  setLoading,
  orders,
}) {
  return (
    <div className={styles.container}>
      {!!orders &&
        orders.map((order) => (
          <Order
            key={order.id}
            id={order.id}
            date={"January 22, 2021"}
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
  );
}
