module.exports.setCurrency = (currency) => {
  return {
    type: "SET_CURRENCY",
    payload: currency,
  };
};
