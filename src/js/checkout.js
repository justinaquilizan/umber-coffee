document.addEventListener("DOMContentLoaded", function () {
  // Update cart count on page load
  updateCartCount();

  // Display total from cart
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  document.getElementById("checkout-total").textContent = `$${total.toFixed(
    2
  )}`;

  // Format card number input
  const cardNumberInput = document.getElementById("cardNumber");
  cardNumberInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    let formattedValue = value.match(/.{1,4}/g)?.join(" ") || value;
    e.target.value = formattedValue;
  });

  // Format expiry date input
  const expiryDateInput = document.getElementById("expiryDate");
  expiryDateInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (value.length >= 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    e.target.value = value;
  });

  // Format CVV input
  const cvvInput = document.getElementById("cvv");
  cvvInput.addEventListener("input", function (e) {
    e.target.value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  });

  const checkoutForm = document.getElementById("checkout-form");
  checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Update progress indicator
    document.querySelectorAll(".progress-step").forEach((step) => {
      step.classList.add("active");
    });

    // Show processing state
    document.getElementById("form-content").style.display = "none";
    document.getElementById("form-processing").style.display = "block";

    // Simulate processing time
    setTimeout(() => {
      // Generate random order number
      const orderNumber =
        "#EC-2025-" + Math.floor(10000 + Math.random() * 90000);
      document.getElementById("order-number").textContent = orderNumber;

      checkout(); // Call the checkout function from ../js/script.js

      // Hide processing state
      document.getElementById("form-processing").style.display = "none";
      document.getElementById("form-content").style.display = "block";

      // Show confirmation modal
      openConfirmationModal();
    }, 2000);
  });
});

function openConfirmationModal() {
  document.getElementById("confirmation-modal").style.display = "flex";
}

function closeConfirmationModal() {
  document.getElementById("confirmation-modal").style.display = "none";
  window.location.href = "home.html"; // Redirect to home after closing modal
}
