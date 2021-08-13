const getCartTotal = (cartProducts) => {
  let cartTotal = 0;
  for (let i = 0; i < cartProducts.length; i++)
    cartTotal += cartProducts[i].currentPrice;
  return cartTotal;
};

export default getCartTotal;
