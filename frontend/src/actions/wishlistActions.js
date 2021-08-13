module.exports.addItemToWishlist = (productId) => {
  return {
    type: "ADD_WISHLIST_ITEM",
    payload: productId,
  };
};

module.exports.removeWishlistItem = (productId) => {
  return {
    type: "REMOVE_WISHLIST_ITEM",
    payload: productId,
  };
};

module.exports.clearWishlist = () => {
  return {
    type: "CLEAR_WISHLIST",
  };
};
