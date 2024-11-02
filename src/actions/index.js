export const setCart = (cart) => {
  return {
    type: "SET_CART",
    payload: cart,
  };
};

export const setCartItems = (cartItems) => {
  return {
    type: "SET_CART_ITEMS",
    payload: cartItems,
  };
};
