const initialState = {
  products: [],
};

const updateProductQuantity = (cartProducts, addedProduct) => {
  let existingProduct = false;
  for (let i = 0; i < cartProducts.length; i++)
    if (cartProducts[i].productId == addedProduct.productId) {
      cartProducts[i].quantity += addedProduct.quantity;
      existingProduct = true;
      break;
    }

  if (!existingProduct) cartProducts = [...cartProducts, addedProduct];

  return cartProducts;
};

const incrementProductQuantity = (cartProducts, productId) => {
  for (let i = 0; i < cartProducts.length; i++)
    if (cartProducts[i].productId == productId) {
      cartProducts[i].quantity += 1;
    }

  return cartProducts;
};

const decrementProductQuantity = (cartProducts, productId) => {
  for (let i = 0; i < cartProducts.length; i++)
    if (cartProducts[i].productId == productId) {
      cartProducts[i].quantity -= 1;
    }

  return cartProducts;
};

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CART_ITEM":
      return {
        ...state,
        products: updateProductQuantity(state.products, action.payload),
      };

    case "REMOVE_CART_ITEM":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.productId !== action.payload,
        ),
      };

    case "INCREMENT_PRODUCT_QUANTITY":
      return {
        ...state,
        products: incrementProductQuantity(state.products, action.payload),
      };

    case "DECREMENT_PRODUCT_QUANTITY":
      return {
        ...state,
        products: decrementProductQuantity(state.products, action.payload),
      };

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
};

export default shoppingCartReducer;
