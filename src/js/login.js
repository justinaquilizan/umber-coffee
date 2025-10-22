document.addEventListener("DOMContentLoaded", function () {
  // Check if user is already logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    // Redirect to home page if already logged in
    window.location.href = "home.html";
  }

  // Initialize demo account in localStorage if it doesn't exist
  if (!localStorage.getItem("userAccount")) {
    const demoAccount = {
      username: "admin",
      password: "coffee123", // In a real app, this should be hashed
    };
    localStorage.setItem("userAccount", JSON.stringify(demoAccount));
  }

  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const rememberMeCheckbox = document.getElementById("remember-me");
  const usernameError = document.getElementById("username-error");
  const passwordError = document.getElementById("password-error");
  const loginError = document.getElementById("login-error");
  const loginBtn = document.querySelector(".login-btn");

  // Form submission
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset error messages
    usernameError.style.display = "none";
    passwordError.style.display = "none";
    loginError.style.display = "none";

    // Validate form
    let isValid = true;

    if (usernameInput.value.trim() === "") {
      usernameError.style.display = "block";
      isValid = false;
    }

    if (passwordInput.value.trim() === "") {
      passwordError.style.display = "block";
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Disable button during login attempt
    loginBtn.disabled = true;
    loginBtn.textContent = "Logging in...";

    // Simulate login process
    setTimeout(function () {
      // Get stored account
      const storedAccount = JSON.parse(localStorage.getItem("userAccount"));

      // Check credentials
      if (
        usernameInput.value === storedAccount.username &&
        passwordInput.value === storedAccount.password
      ) {
        // Successful login
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", usernameInput.value);

        // Remember me functionality
        if (rememberMeCheckbox.checked) {
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("rememberMe");
        }

        // Debug: Log that login was successful
        console.log("Login successful! Redirecting to home.html...");

        // Redirect to home page
        window.location.href = "home.html";
      } else {
        // Failed login
        loginError.style.display = "block";
        loginBtn.disabled = false;
        loginBtn.textContent = "Login";

        // Debug: Log that login failed
        console.log("Login failed. Invalid credentials.");
      }
    }, 1000);
  });

  // Real-time validation feedback
  usernameInput.addEventListener("blur", function () {
    if (this.value.trim() === "") {
      usernameError.style.display = "block";
    } else {
      usernameError.style.display = "none";
    }
  });

  passwordInput.addEventListener("blur", function () {
    if (this.value.trim() === "") {
      passwordError.style.display = "block";
    } else {
      passwordError.style.display = "none";
    }
  });

  // Forgot password link
  document
    .querySelector(".forgot-password")
    .addEventListener("click", function (e) {
      e.preventDefault();
      alert("Password reset functionality would be implemented here.");
    });
});
