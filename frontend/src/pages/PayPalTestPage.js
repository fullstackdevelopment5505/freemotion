import React, { useState, useRef, useEffect } from "react";
require("dotenv").config();

export default function PayPalTestPage() {
  const [paidFor, setPaidFor] = useState(false);
  const [loaded, setLoaded] = useState(false);

  let paypalRef = useRef();

  const product = {
    price: 777.77,
    name: "Nice Gray Chair",
    description: "Some Nice Product",
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=AV95xY5X68v-DceY9q4x-RdeYQGPl4SuSsI1DKRnTJyo7j01bmS4Obr-8Huz2e7fAa59pnnwfMhw_0GW`;
    script.addEventListener("load", () => setLoaded(true));
    document.body.appendChild(script);

    if (loaded) {
      setTimeout(() => {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: product.description,
                    amount: {
                      currency_code: "USD",
                      value: product.price,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();

              console.log(order);
            },
          })
          .render(paypalRef);
      });
    }
  }, [loaded, product.price, product.description]);

  return (
    <div className="container">
      {paidFor ? (
        <div>
          <h2>Congrats, you just bought a new nice {product.name}!</h2>
        </div>
      ) : (
        <div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <span>${product.price}</span>
          <div ref={(v) => (paypalRef = v)} />
        </div>
      )}
    </div>
  );
}
