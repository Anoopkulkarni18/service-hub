import { createContext, useReducer } from "react";
export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return { ...state, cart: [...state.cart, action.value] };
    case "UPDATE":
      return { ...state, cart: action.value };
    default:
      return state;
  }
};

export const CartProvider = (props) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    cart: [],
  });
  return (
    <CartContext.Provider value={{ cart: cartState.cart, cartDispatch }}>
      {props.children}
    </CartContext.Provider>
  );
};
