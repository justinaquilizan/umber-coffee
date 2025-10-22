document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const submitButton = contactForm.querySelector('button[type="submit"]');

  // Form validation
  function validateForm() {
    let isValid = true;
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");

    // Reset previous errors
    name.classList.remove("error-field");
    email.classList.remove("error-field");
    message.classList.remove("error-field");
    nameError.style.display = "none";
    emailError.style.display = "none";
    messageError.style.display = "none";

    // Validate name
    if (name.value.trim() === "") {
      name.classList.add("error-field");
      nameError.style.display = "block";
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      email.classList.add("error-field");
      emailError.style.display = "block";
      isValid = false;
    }

    // Validate message
    if (message.value.trim() === "") {
      message.classList.add("error-field");
      messageError.style.display = "block";
      isValid = false;
    }

    return isValid;
  }

  // Form submission
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Disable button during submission
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    // Simulate form submission
    setTimeout(function () {
      // Re-enable the button
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";

      // Show success modal
      openContactModal(true);

      // Reset the form
      contactForm.reset();
    }, 2000);
  });

  // Real-time validation feedback
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  nameInput.addEventListener("blur", function () {
    if (this.value.trim() === "") {
      this.classList.add("error-field");
      document.getElementById("name-error").style.display = "block";
    } else {
      this.classList.remove("error-field");
      document.getElementById("name-error").style.display = "none";
    }
  });

  emailInput.addEventListener("blur", function () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.value)) {
      this.classList.add("error-field");
      document.getElementById("email-error").style.display = "block";
    } else {
      this.classList.remove("error-field");
      document.getElementById("email-error").style.display = "none";
    }
  });

  messageInput.addEventListener("blur", function () {
    if (this.value.trim() === "") {
      this.classList.add("error-field");
      document.getElementById("message-error").style.display = "block";
    } else {
      this.classList.remove("error-field");
      document.getElementById("message-error").style.display = "none";
    }
  });
});

// Mobile Menu Toggle
function toggleMobileMenu() {
  const nav = document.getElementById("nav-menu");
  nav.classList.toggle("active");
}

// Modal functions
function openContactModal(isSuccess) {
  const modal = document.getElementById("contact-modal");
  const modalIcon = document.getElementById("modal-icon");
  const modalTitle = document.getElementById("modal-title");
  const modalMessage = document.getElementById("modal-message");

  if (isSuccess) {
    modalIcon.innerHTML = '<div class="success-icon">✓</div>';
    modalTitle.textContent = "Message Sent!";
    modalMessage.textContent =
      "Thank you for contacting us. We've received your message and will get back to you as soon as possible.";
  } else {
    modalIcon.innerHTML = '<div class="error-icon">✕</div>';
    modalTitle.textContent = "Error!";
    modalMessage.textContent =
      "There was an error sending your message. Please try again later.";
  }

  modal.style.display = "flex";
}

function closeContactModal() {
  document.getElementById("contact-modal").style.display = "none";
}
