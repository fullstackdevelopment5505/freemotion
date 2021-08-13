require("dotenv").config();
const { Client, Config, CheckoutAPI } = require("@adyen/api-library");
const config = new Config();
config.apiKey = "KRqG5PrFIbwEYKzNwrbVJqHqz1Cyx7GpmDAdyv4OLXI8SvnWDU";
config.merchantAccount = "freemotiontest";
const client = new Client({ config });
client.setEnvironment("TEST");
const checkout = new CheckoutAPI(client);

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/* 

  Stripe Payment Controller Functions

*/

const generateResponse = (intent) => {
  // Note that if your API version is before 2019-02-11, 'requires_action'
  // appears as 'requires_source_action'.
  if (
    intent.status === "requires_action" &&
    intent.next_action.type === "use_stripe_sdk"
  ) {
    // Tell the client to handle the action
    return {
      requires_action: true,
      payment_intent_client_secret: intent.client_secret,
    };
  } else if (intent.status === "succeeded") {
    // The payment didn’t need any additional actions and completed!
    // Handle post-payment fulfillment
    return {
      success: true,
    };
  } else {
    // Invalid status
    return {
      error: "Invalid PaymentIntent status",
    };
  }
};

module.exports.createPaymentIntent = async (req, res) => {
  const { email, currency } = req.body;

  const paymentMethodId = await stripe.paymentMethods.create({
    type: "card",
    card: {
      number: "4242424242424242",
      exp_month: 4,
      exp_year: 2022,
      cvc: "314",
    },
  });

  const paymentIntent = await stripe.paymentIntents.create({
    // 10000 -> equivalent of 100.00 of selected currency
    amount: 10000,
    currency: currency,
    payment_method: paymentMethodId.id,
    confirmation_method: "manual",
    confirm: true,
  });

  res.send(generateResponse(paymentIntent));

  // res.json({ paymentMethodId });

  res.status(200).json({ client_secret: paymentIntent["client_secret"] });
};

module.exports.getOrderStatus = async (req, res) => {
  console.log({ content: req.body });
};

module.exports.createCheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: "vlad.mihet@yahoo.com",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Stubborn Attachments",
              images: ["https://i.imgur.com/EHyR2nP.png"],
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5000?success=true`,
      cancel_url: `http://localhost:5000?canceled=true`,
    });
    res.json({ id: session.id });
  } catch (err) {
    res.status(400).json({ err });
  }
};

// module.exports.createPaypalPaymentIntent = async (req, res) => {};

/* 

  Paybright Payment Integration

*/

module.exports.PB_start = async (req, res) => {
  // Set your X-API-KEY with the API key from the Customer Area.

  checkout
    .payments({
      merchantAccount: "freemotiontest",
      countryCode: "CA",
      shopperLocale: "en_CA",
      amount: {
        currency: "CAD",
        value: "6000",
      },
      shopperReference: "xcdfs",
      reference: "fdsagsadgas",
      channel: "Web",
      paymentMethod: {
        type: "paybright",
      },
      shopperName: {
        firstName: "Simon",
        lastName: "Hopper",
      },
      telephoneNumber: "+16478491378",
      shopperEmail: "s.hopper@adyen.com",
      dateOfBirth: "1970-07-10",
      billingAddress: {
        street: "Richmond St W",
        houseNumberOrName: "240",
        city: "Toronto",
        postalCode: "M5V 2C5",
        country: "CA",
      },
      deliveryAddress: {
        street: "Richmond St W",
        houseNumberOrName: "240",
        city: "Toronto",
        postalCode: "M5V 2C5",
        country: "CA",
      },
      lineItems: [
        {
          quantity: "1",
          amountExcludingTax: "3310",
          description: "Shoes",
          amountIncludingTax: "4000",
          taxCategory: "Low",
        },
        {
          quantity: "2",
          amountExcludingTax: "2480",
          description: "Socks",
          amountIncludingTax: "3000",
          taxCategory: "Low",
        },
        {
          quantity: "1",
          amountExcludingTax: "-1000",
          description: "Discount",
          amountIncludingTax: "-1000",
          taxCategory: "Low",
        },
      ],
      returnUrl: "https://your-company.com/checkout?shopperOrder=12xy..",
    })
    .then((res) => res.json(res))
    .catch((err) => res.json({ err }));
};
