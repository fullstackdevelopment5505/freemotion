const router = require("express").Router();
const paymentController = require("../controllers/paymentController");

router.post("/create-payment-intent", paymentController.createPaymentIntent);

router.post("/get_order_status", paymentController.getOrderStatus);

router.post(
  "/create-checkout-session",
  paymentController.createCheckoutSession,
);

router.post("/pb_test", paymentController.PB_start);

module.exports = router;
