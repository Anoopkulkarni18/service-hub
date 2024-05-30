import React, { useContext } from "react";
import { CartContext } from "./context/CartContext";

export default function Cart() {
  const { cart } = useContext(CartContext);

  //   const handleQuantityChange = (item, quantity) => {
  //     updateCart(item, quantity);
  //   };

  //   const handleRemoveItem = (item) => {
  //     removeFromCart(item);
  //   };

  const calculateTotal = () => {
    console.log(cart);
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.name}>
            <div>
              <span>{item.name}</span>
              <span>${item.price}</span>
              <input
                type="number"
                value={item.quantity}
                // onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                min="1"
              />
              {/* <button onClick={() => handleRemoveItem(item)}>Remove</button> */}
            </div>
          </li>
        ))}
      </ul>
      <div>
        <h3>Total: ${calculateTotal().toFixed(2)}</h3>
      </div>
    </div>
  );
}
