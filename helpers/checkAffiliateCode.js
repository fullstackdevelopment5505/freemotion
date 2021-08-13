module.exports.lookupAffiliateCode = (users, affCode) => {
  let userData = undefined;

  for (const [key, value] of Object.entries(users)) {
    if (value.affiliateCode && value.affiliateCode === affCode) {
      userData = {
        uid: key,
        affiliateCode: value.affiliateCode,
      };
      break;
    }
  }

  return userData;
};
