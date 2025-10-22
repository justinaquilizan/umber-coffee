import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import CartItem from "../components/CartItem";
import "../styles/cart.css";

const CartPage = () => {
  const { cartItems, clearCart, updateQuantity, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container">
      <section className="page-header">
        <h1>Your Shopping Cart</h1>
        <p>Review your selected items before proceeding to checkout.</p>
      </section>

      <div className="cart">
        <div className="cart-items-container">
          {cartItems.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--secondary-color)" }}>
              Your cart is empty.
            </p>
          ) : (
            cartItems.map((item) => <CartItem key={item.name} item={item} />)
          )}
        </div>
        <div className="cart-summary">
          <p>
            Total: <span id="cart-total">${total.toFixed(2)}</span>
          </p>
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="btn"
              style={{ marginBottom: "1rem" }}>
              Clear Cart
            </button>
          )}
          <Link to="/checkout" className="checkout">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
