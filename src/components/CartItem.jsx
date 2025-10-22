import React from "react";
import { useCart } from "../context/useCart";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.name, item.quantity - 1);
    } else {
      removeFromCart(item.name);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.name, item.quantity + 1);
  };

  const handleRemove = () => {
    removeFromCart(item.name);
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="item-details">
        <p className="item-name">{item.name}</p>
        <p className="item-price">${item.price.toFixed(2)}</p>
      </div>
      <div className="quantity">
        <button className="decrease" onClick={handleDecrease}>
          -
        </button>
        <span className="quantity-count">{item.quantity}</span>
        <button className="increase" onClick={handleIncrease}>
          +
        </button>
      </div>
      <button className="remove-item" onClick={handleRemove}>
        Remove
      </button>
    </div>
  );
};

export default CartItem;
