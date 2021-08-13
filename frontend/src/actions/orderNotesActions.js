module.exports.updateOrderNotes = (orderNotes) => {
  return {
    type: "UPDATE_ORDER_NOTES",
    payload: orderNotes,
  };
};
