const initialState = {
  items: [],
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_WISHLIST_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case "REMOVE_WISHLIST_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item !== action.payload),
      };

    case "CLEAR_WISHLIST":
      return initialState;

    default:
      return state;
  }
};

export default wishlistReducer;
