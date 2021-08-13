module.exports.getUserByUid = (users, affCode) => {
  for (const [key, value] of Object.entries(users))
    if (value.affiliateCode && value.affiliateCode === affCode) return key;

  return undefined;
};
