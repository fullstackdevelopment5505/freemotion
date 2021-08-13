module.exports.addToComparison = (productId) => {
  return {
    type: "ADD_COMPARISON_ITEM",
    payload: productId,
  };
};

module.exports.removeFromComparison = (productId) => {
  return {
    type: "REMOVE_COMPARISON_ITEM",
    payload: productId,
  };
};

module.exports.clearComparison = () => {
  return {
    type: "CLEAR_COMPARISON",
  };
};
