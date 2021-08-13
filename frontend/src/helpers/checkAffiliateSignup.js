import axios from "axios";

const admin = require("firebase-admin");
const db = admin.database();
const ref = db.ref("users");

module.exports.checkAffiliateCode = (code) => {};
