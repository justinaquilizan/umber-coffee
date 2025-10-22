import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import { toast } from "react-toastify";
import "../styles/contact.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    icon: "",
    title: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error on change
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Please enter your name";
      toast.error("Please enter your name");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
      toast.error("Please enter a valid email address");
    }
    if (!formData.message.trim()) {
      errors.message = "Please enter your message";
      toast.error("Please enter your message");
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setModalContent({
        icon: "✓",
        title: "Message Sent!",
        message:
          "Thank you for contacting us. We've received your message and will get back to you as soon as possible.",
      });
      setIsModalOpen(true);
      setFormData({ name: "", email: "", message: "" }); // Reset form
    }, 2000);
  };

  const closeContactModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <section className="page-header">
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you! Send us a message and we'll get back to
          you as soon as possible.
        </p>
      </section>

      <div className="contact-form">
        <form id="contactForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {formErrors.name && (
              <div className="error-message">{formErrors.name}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
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

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required></textarea>
            {formErrors.message && (
              <div className="error-message">{formErrors.message}</div>
            )}
          </div>

          <button
            type="submit"
            className="form-submit-btn"
            disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      {/* Contact Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeContactModal}
        title={modalContent.title}>
        <div className="modal-icon">{modalContent.icon}</div>
        <h2>{modalContent.title}</h2>
        <p>{modalContent.message}</p>
        <div className="modal-actions">
          <Link to="/" className="button">
            Back to Home
          </Link>
          <button onClick={closeContactModal} className="button secondary">
            Send Another Message
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ContactPage;
