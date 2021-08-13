import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

import CardInput from "../CardInput/CardInput";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    let clientSecret;

    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const validateCardInfo = async (clientSecret) => {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            // Retrieve the user billing information from the account details
            name: "Jenny Rosen",
            email: "test@test.com",
          },
        },
      });

      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)

        // Raise Payment Issue Errors & Display the errors accordingly on the cart payment stage page
        console.log(result.error.message);
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === "succeeded") {
          // Show a success message to your customer
          // There's a risk of the customer closing the window before callback
          // execution. Set up a webhook or plugin to listen for the
          // payment_intent.succeeded event that handles any business critical
          // post-payment actions.

          // <------------------------------------------------------------------------>
          // <----- Redirect the user to the shopping cart order completion page ----->
          console.log("Succeeded!"); // Success Message
          // <------------------------------------------------------------------------>
          // <------------------------------------------------------------------------>
        }
      }
    };

    const fetchClientSecret = async () => {
      await axios
        .post("/payment/create-payment-intent", {
          email: "test@test.com",
          currency: "eur",
        })
        .then((res) => {
          clientSecret = res.data.client_secret;
          console.log(clientSecret);
          validateCardInfo(clientSecret);
        })
        .catch((err) => {
          console.log("Couldn't validate card information");
          console.error({ Error: err.message });
        });
    };

    fetchClientSecret();
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardInput />
      <button disabled={!stripe}>Confirm order</button>
    </form>
  );
}
