export const initState = {
  cart: null,
  cartItems: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_CART":
      return { ...state, cart: action.payload };
    case "SET_CART_ITEMS":
      return { ...state, cartItems: action.payload };
    default:
      break;
  }
};

export default reducer;
