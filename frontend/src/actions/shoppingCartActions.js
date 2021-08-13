module.exports.addToCart = (productId, quantity) => {
  return {
    type: "ADD_CART_ITEM",
    payload: {
      productId,
      quantity,
    },
  };
};

module.exports.incrementProductQuantity = (productId) => {
  return {
    type: "INCREMENT_PRODUCT_QUANTITY",
    payload: productId,
  };
};

module.exports.decrementProductQuantity = (productId) => {
  return {
    type: "DECREMENT_PRODUCT_QUANTITY",
    payload: productId,
  };
};

module.exports.removeFromCart = (productId) => {
  return {
    type: "REMOVE_CART_ITEM",
    payload: productId,
  };
};

module.exports.clearCart = () => {
  return {
    type: "CLEAR_CART",
  };
};
