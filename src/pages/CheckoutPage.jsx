import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import Modal from "../components/Modal";
import "../styles/checkout.css";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (cartItems.length === 0 && !isConfirmationModalOpen) {
      navigate("/cart"); // Redirect to cart if empty, unless confirmation modal is open
    }
  }, [cartItems, navigate, isConfirmationModalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number
    if (name === "cardNumber") {
      formattedValue = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
      formattedValue =
        formattedValue.match(/.{1,4}/g)?.join(" ") || formattedValue;
    }
    // Format expiry date
    if (name === "expiryDate") {
      formattedValue = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
      if (formattedValue.length >= 2) {
        formattedValue =
          formattedValue.substring(0, 2) + "/" + formattedValue.substring(2, 4);
      }
    }
    // Format CVV
    if (name === "cvv") {
      formattedValue = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    }

    setFormData((prevData) => ({ ...prevData, [name]: formattedValue }));
    // Clear error for the field as user types
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is invalid";
    if (!formData.fullName) errors.fullName = "Full Name is required";
    if (!formData.address) errors.address = "Address is required";
    if (!formData.city) errors.city = "City is required";
    if (!formData.zipCode) errors.zipCode = "Zip Code is required";
    if (!formData.cardNumber) errors.cardNumber = "Card Number is required";
    else if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(formData.cardNumber))
      errors.cardNumber = "Card Number is invalid";
    if (!formData.expiryDate) errors.expiryDate = "Expiry Date is required";
    else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate))
      errors.expiryDate = "Expiry Date is invalid (MM/YY)";
    if (!formData.cvv) errors.cvv = "CVV is required";
    else if (!/^\d{3,4}$/.test(formData.cvv)) errors.cvv = "CVV is invalid";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const generatedOrderNumber = `#EC-2025-${Math.floor(
        10000 + Math.random() * 90000
      )}`;
      setOrderNumber(generatedOrderNumber);
      clearCart(); // Clear cart after successful order
      setIsProcessing(false);
      setIsConfirmationModalOpen(true);
    }, 2000);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    navigate("/"); // Redirect to home after closing modal
  };

  return (
    <div className="container">
      <section className="page-header">
        <h1>Checkout</h1>
        <p>Please fill in your details to complete your order.</p>
      </section>

      <div className="checkout-progress">
        <div
          className={`progress-step ${
            !isProcessing && !isConfirmationModalOpen ? "active" : ""
          }`}>
          <div className="progress-step-circle">1</div>
          <div className="progress-step-label">Information</div>
        </div>
        <div
          className={`progress-step ${
            isProcessing || isConfirmationModalOpen ? "active" : ""
          }`}>
          <div className="progress-step-circle">2</div>
          <div className="progress-step-label">Payment</div>
        </div>
        <div
          className={`progress-step ${
            isConfirmationModalOpen ? "active" : ""
          }`}>
          <div className="progress-step-circle">3</div>
          <div className="progress-step-label">Confirmation</div>
        </div>
      </div>

      <div className="checkout-form-container">
        <div
          id="form-content"
          style={{ display: isProcessing ? "none" : "block" }}>
          <form id="checkout-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h2>Contact Information</h2>
              <div className="form-group">
                <label htmlFor="email">Email Address:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {formErrors.email && (
                  <div className="error-message">{formErrors.email}</div>
                )}
              </div>
            </div>

            <div className="form-section">
              <h2>Shipping Information</h2>
              <div className="form-group">
                <label htmlFor="fullName">Full Name:</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                {formErrors.fullName && (
                  <div className="error-message">{formErrors.fullName}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                {formErrors.address && (
                  <div className="error-message">{formErrors.address}</div>
                )}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City:</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.city && (
                    <div className="error-message">{formErrors.city}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="zipCode">Zip Code:</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.zipCode && (
                    <div className="error-message">{formErrors.zipCode}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Payment Information</h2>
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number:</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                />
                {formErrors.cardNumber && (
                  <div className="error-message">{formErrors.cardNumber}</div>
                )}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date:</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.expiryDate && (
                    <div className="error-message">{formErrors.expiryDate}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV:</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.cvv && (
                    <div className="error-message">{formErrors.cvv}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="cart-summary">
              <p>Total:</p>
              <p id="checkout-total">${total.toFixed(2)}</p>
            </div>

            <button
              type="submit"
              className="checkout-submit-btn"
              disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>

        <div
          id="form-processing"
          className="form-processing"
          style={{ display: isProcessing ? "flex" : "none" }}>
          <div className="spinner"></div>
          <p>Processing your order...</p>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      <Modal
        isOpen={isConfirmationModalOpen}
        onClose={closeConfirmationModal}
        title="Order Confirmed!">
        <div className="success-icon">✓</div>
        <h2>Order Confirmed!</h2>
        <p>
          Thank you for your purchase. Your order has been successfully placed.
        </p>
        <p>
          Your order number is:
          <strong id="order-number">{orderNumber}</strong>
        </p>
        <p>
          You will receive an email confirmation shortly with your order
          details.
        </p>
        <div className="modal-actions">
          <Link to="/drinks" className="button">
            Continue Shopping
          </Link>
          <button onClick={closeConfirmationModal} className="button secondary">
            Back to Home
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CheckoutPage;
