import { combineReducers } from "redux";
import comparisonReducer from "./comparisonReducer";
import filtersReducer from "./filtersReducer";
import shoppingCartReducer from "./shoppingCartReducer";
import wishlistReducer from "./wishlistReducer";
import orderNotesReducer from "./orderNotesReducer";
import shippingAddressReducer from "./shippingAddressReducer";
import billingAddressReducer from "./billingAddressReducer";
import languageReducer from "./languageReducer";
import currencyReducer from "./currencyReducer";

const rootReducer = combineReducers({
  shoppingCart: shoppingCartReducer,
  wishlist: wishlistReducer,
  comparison: comparisonReducer,
  filters: filtersReducer,
  orderNotes: orderNotesReducer,
  shippingAddress: shippingAddressReducer,
  billingAddress: billingAddressReducer,
  currency: currencyReducer,
  language: languageReducer,
});

export default rootReducer;
