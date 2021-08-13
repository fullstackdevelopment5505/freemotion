const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const MailChimp = require("mailchimp-api-v3");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const mailchimp = new MailChimp("6419a649395f2b877050302af979fd97-us7");

const app = express();

// Import Routes
const emailRoutes = require("./routes/emailRoutes");
const affiliateRoutes = require("./routes/affiliateRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.removeHeader("X-Powered-By");
  next();
});

// Use Routes
app.use("/email", emailRoutes);
app.use("/affiliate", affiliateRoutes);
app.use("/payment", paymentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));

  app.use(express.static(path.join(__dirname, "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
