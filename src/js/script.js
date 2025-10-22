// Mobile Menu Toggle
function toggleMobileMenu() {
  const nav = document.getElementById("nav-menu");
  nav.classList.toggle("active");
}

// Authentication Functions
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn === "true";
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("rememberMe");
  window.location.href = "index.html"; // Redirect to the login page
}

// Update navigation based on login status
function updateNavigation() {
  const isLoggedIn = checkLoginStatus();
  const navMenu = document.getElementById("nav-menu");
  const loginLogoutItem = document.getElementById("login-logout-link");

  if (loginLogoutItem) {
    if (isLoggedIn) {
      const currentUser = localStorage.getItem("currentUser");
      loginLogoutItem.innerHTML = `<a href="#" onclick="logout()">Logout</a>`;
    } else {
      loginLogoutItem.innerHTML = `<a href="index.html">Login</a>`;
    }
  }
}

// Order Modal Logic (from drinks.html)
let currentProduct = {}; // To store details of the product being ordered
function openOrderModal(button) {
  // Check if user is logged in
  if (!checkLoginStatus()) {
    alert("Please login to add items to cart");
    window.location.href = "index.html";
    return;
  }

  const drinkName = button.dataset.name;
  const drinkPrice = parseFloat(button.dataset.price);
  const drinkImage = button.dataset.image;
  currentProduct = {
    name: drinkName,
    price: drinkPrice,
    image: drinkImage,
  };
  document.getElementById("order-drink-name").textContent = drinkName;
  document.getElementById("order-qty").value = 1; // Reset quantity
  document.getElementById("order-notes").value = ""; // Clear notes
  document.getElementById("order-modal").style.display = "flex";
}
function closeOrderModal() {
  document.getElementById("order-modal").style.display = "none";
}

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  updateNavigation(); // Call updateNavigation on DOMContentLoaded

  // Order form handling
  const orderForm = document.querySelector(".order-modal form");
  if (orderForm) {
    orderForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const quantity = parseInt(document.getElementById("order-qty").value);
      addItemToCart(
        currentProduct.name,
        currentProduct.price,
        quantity,
        currentProduct.image
      );
      alert("Item added to cart!");
      closeOrderModal();
    });
  }

  // Cart Logic Initialization (only if on cart.html)
  if (document.querySelector(".cart-items-container")) {
    updateCartDisplay();
  }

  // Contact Form Validation
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;
      if (!name || !email || !message) {
        alert("Please fill in all fields");
        return;
      }
      alert("Thank you for your message!");
      contactForm.reset();
    });
  }

  // Attach event listeners to "Order" buttons on drinks.html
  document.querySelectorAll(".order-btn").forEach((button) => {
    button.addEventListener("click", () => openOrderModal(button));
  });

  // Update cart count on page load
  updateCartCount();
});

// Cart Logic
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || []; // Initialize from localStorage
function saveCartItems() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
function addItemToCart(name, price, quantity, image) {
  // Check if user is logged in
  if (!checkLoginStatus()) {
    alert("Please login to add items to cart");
    window.location.href = "index.html";
    return;
  }

  const existingItem = cartItems.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({ name, price, quantity, image });
  }
  saveCartItems();
  updateCartCount();
  console.log("Cart Items:", cartItems);
}
function updateCartDisplay() {
  const cartContainer = document.querySelector(".cart-items-container");
  if (!cartContainer) return;
  cartContainer.innerHTML = "";
  let total = 0;
  if (cartItems.length === 0) {
    cartContainer.innerHTML =
      '<p style="text-align: center; color: var(--secondary-color);">Your cart is empty.</p>';
  } else {
    cartItems.forEach((item, index) => {
      total += item.price * item.quantity;
      const cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add("cart-item");
      cartItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <p class="item-name">${item.name}</p>
                    <p class="item-price">$${item.price.toFixed(2)}</p>
                </div>
                <div class="quantity">
                    <button class="decrease" data-index="${index}">-</button>
                    <span class="quantity-count">${item.quantity}</span>
                    <button class="increase" data-index="${index}">+</button>
                </div>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
      cartContainer.appendChild(cartItemDiv);
    });
  }
  const cartTotalElement = document.getElementById("cart-total");
  if (cartTotalElement) {
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
  }

  const checkoutTotalElement = document.getElementById("checkout-total");
  if (checkoutTotalElement) {
    checkoutTotalElement.textContent = `$${total.toFixed(2)}`;
  }

  saveCartItems();
  updateCartCount();
  // Attach event listeners after elements are created
  document.querySelectorAll(".increase").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cartItems[index].quantity++;
      updateCartDisplay();
    });
  });
  document.querySelectorAll(".decrease").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
      } else {
        cartItems.splice(index, 1);
      }
      updateCartDisplay();
    });
  });
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cartItems.splice(index, 1);
      updateCartDisplay();
    });
  });
}

// View Cart function (from drinks.html)
function viewCart() {
  // Check if user is logged in
  if (!checkLoginStatus()) {
    alert("Please login to view your cart");
    window.location.href = "index.html";
    return;
  }
  window.location.href = "cart.html";
}

// Update cart count in navigation bar
function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
  }
}

// Checkout process
function checkout() {
  // Check if user is logged in
  if (!checkLoginStatus()) {
    alert("Please login to checkout");
    window.location.href = "index.html";
    return;
  }

  cartItems = [];
  saveCartItems();
  updateCartCount();
}
