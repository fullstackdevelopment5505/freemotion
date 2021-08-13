import React from "react";
import ReactDOM from "react-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/Payment/CheckoutForm/CheckoutForm";

require("dotenv").config();

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51HlxPPAhDbIeWsMXRtT4AZMMX5547Csemxk6pa9TbuNqaYBeLjBWcAZIX7SSIs5eD3ARZmvahP8Olt4BWiPjv90e0050UtViYV",
);

export default function PaymentTestPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
