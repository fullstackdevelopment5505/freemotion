const initialState = {
  currency: "usd",
};

const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENCY":
      return {
        ...state,
        currency: action.payload,
      };

    default:
      return state;
  }
};

export default currencyReducer;
