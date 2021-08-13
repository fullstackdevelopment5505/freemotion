const initialState = {
  orderNotes: "",
};

const orderNotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_ORDER_NOTES":
      return {
        ...state,
        orderNotes: action.payload,
      };

    default:
      return state;
  }
};

export default orderNotesReducer;
