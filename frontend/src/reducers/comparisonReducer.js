const initialState = {
  items: [],
};

const comparisonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_COMPARISON_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case "REMOVE_COMPARISON_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item !== action.payload),
      };

    case "CLEAR_COMPARISON":
      return initialState;

    default:
      return state;
  }
};

export default comparisonReducer;
