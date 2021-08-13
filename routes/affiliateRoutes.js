const router = require("express").Router();
const affiliateController = require("../controllers/affiliateController");

router.post(
  "/generate_affiliate_code",
  affiliateController.generateAffiliateLink,
);

router.post("/check_affiliate_code", affiliateController.checkAffiliateLink);

router.post(
  "/validate_affiliate_code",
  affiliateController.validateAffiliateLink,
);

router.post("/mark_affiliation", affiliateController.setAffiliation);

router.post("/generate_cookie", affiliateController.generateClicksTracker);

module.exports = router;
