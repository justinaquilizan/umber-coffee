import React, { useState } from "react";
import DrinkCard from "../components/DrinkCard";
import Modal from "../components/Modal";
import { useCart } from "../context/useCart";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/drinks.css";

const drinksData = [
  {
    name: "House Blend Espresso",
    price: 3.5,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description:
      "Rich, full-bodied espresso with notes of dark chocolate and caramel.",
  },
  {
    name: "Vanilla Latte",
    price: 4.75,
    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Smooth espresso, steamed milk, and house-made vanilla syrup.",
  },
  {
    name: "Umber Grey Tea",
    price: 3.25,
    image:
      "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description:
      "Premium Ceylon black tea infused with bergamot oil and cornflower petals.",
  },
  {
    name: "Cappuccino",
    price: 4.5,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Cappuccino_at_Sightglass_Coffee.jpg/960px-Cappuccino_at_Sightglass_Coffee.jpg",
    description:
      "Espresso with equal parts steamed milk and foam for a rich, creamy texture.",
  },
  {
    name: "Spanish Latte",
    price: 5.0,
    image:
      "https://www.nestleprofessional.in/sites/default/files/2024-09/Spanish-Latte-756x471.jpg",
    description:
      "Espresso with steamed milk and a dash of sweetened condensed milk for extra richness.",
  },
  {
    name: "Hot Chocolate",
    price: 4.0,
    image:
      "https://assets.epicurious.com/photos/61eb09dfb37c8d2963dd7bde/1:1/w_2849,h_2849,c_limit/HotCocoaForOne_RECIPE_012022_086_VOG_final.jpg",
    description:
      "Rich chocolate blend, steamed milk, and topped with whipped cream.",
  },
];

const DrinksPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const openOrderModal = (drink) => {
    if (!isLoggedIn) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }
    setSelectedDrink(drink);
    setQuantity(1);
    setNotes("");
    setIsModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsModalOpen(false);
    setSelectedDrink(null);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (selectedDrink) {
      addToCart({ ...selectedDrink, quantity });
      toast.success(`Added ${quantity} x ${selectedDrink.name} to cart!`);
      closeOrderModal();
    }
  };

  return (
    <div className="container">
      {/* Page Header */}
      <section className="page-header">
        <h1>Our Menu</h1>
        <p>
          Discover our curated selection of premium coffees, teas, pastries, and
          breakfast favorites.
        </p>
      </section>

      {/* Menu Grid */}
      <section className="highlight" id="menu">
        <h2>Drinks & Bites</h2>
        <div className="highlight_drinks">
          {drinksData.map((drink) => (
            <DrinkCard
              key={drink.name}
              drink={drink}
              onOrderClick={openOrderModal}
            />
          ))}
        </div>
      </section>

      {/* Order Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeOrderModal}
        title={`Order ${selectedDrink?.name || ""}`}>
        <form onSubmit={handleAddToCart}>
          <label htmlFor="order-qty">Quantity:</label>
          <input
            type="number"
            id="order-qty"
            name="qty"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            required
          />
          <br />
          <br />
          <label htmlFor="order-notes">Notes:</label>
          <textarea
            id="order-notes"
            name="notes"
            rows="2"
            placeholder="Any special requests?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}></textarea>
          <br />
          <br />
          <button type="submit" className="order-modal-submit">
            Place Order
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default DrinksPage;
