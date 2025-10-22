import React from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";
import DrinkCard from "../components/DrinkCard"; // Adjust path if needed

const HomePage = () => {
  // Mock data for featured drinks
  const featuredDrinks = [
    {
      id: "f1",
      name: "Espresso",
      description:
        "A bold, smooth shot to kickstart your day. Deep, rich, and packed with flavor.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrjyHlkViXf1t9FlpAnmlozT9DZSvPbFi-Lg&s",
      price: 3.5,
    },
    {
      id: "f2",
      name: "Matcha Latte",
      description:
        "Ceremonial grade matcha with high quality milk for a sweet and calming taste.",
      image:
        "https://www.acozykitchen.com/wp-content/uploads/2017/04/IcedMatchaLatte-1.jpg",
      price: 5.0,
    },
    {
      id: "f3",
      name: "Hot Chocolate",
      description: "Belgian pure chocolate mixed and made perfect for mornings",
      image:
        "https://assets.epicurious.com/photos/61eb09dfb37c8d2963dd7bde/1:1/w_2849,h_2849,c_limit/HotCocoaForOne_RECIPE_012022_086_VOG_final.jpg",
      price: 4.5,
    },
  ];

  // Dummy function for the button
  const handleOrderClick = (drink) => {
    alert(`Added ${drink.name} to cart!`);
    // In a real app, you'd call your useCart hook here
  };

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero_text fade-in">
          <h1>Welcome to Umber Coffee</h1>
          <p>
            Your daily dose of caffeine, comfort, and connection. Where every
            cup is brewed with heart and served with a smile.
          </p>
          <Link to="/drinks" className="btn">
            Explore Our Menu
          </Link>
        </div>
        <img
          src="https://zavida.com/cdn/shop/articles/be-your-own-barista-making-barista-coffee-at-home-393490_1600x.png?v=1715972054"
          alt="Barista making coffee"
        />
      </section>
      {/* About Section */}
      <section className="about">
        <div className="about_content">
          <h2>About Us</h2>
          <p>
            At <strong>Umber Coffee Shop</strong>, coffee isn't just a beverage
            — it's a ritual. Nestled in the heart of the city, our cozy café is
            a sanctuary for coffee lovers, remote workers, and friends alike. We
            carefully source our beans from sustainable farms, roasting each
            batch to highlight unique flavors and aromas. Every cup is brewed
            with passion and served with a warm smile.
          </p>
        </div>
        <img
          src="https://www.rockrobinsid.com/wp-content/uploads/2023/09/blog-img-012-4.jpg"
          alt="Cozy interior of Umber Coffee Shop"
          className="about_img"
        />
      </section>
      {/* Highlight Section */}
      <section className="featured-drinks" id="menu">
        <h2>Featured Drinks</h2>
        <p>Discover our most-loved beverages, crafted to perfection:</p>
        <div className="featured-drinks-grid">
          {featuredDrinks.map((drink) => (
            <DrinkCard
              key={drink.id}
              drink={drink}
              onOrderClick={() => handleOrderClick(drink)}
            />
          ))}
        </div>
      </section>
      {/* Atmosphere and Experience */}
      <section className="experience">
        <h2>The Umber Experience</h2>
        <p>
          Whether you're dropping by for a morning pick-me-up or settling in for
          a long study session, Umber Coffee welcomes you with a warm ambiance
          and friendly faces. Enjoy free Wi-Fi, soft lighting, and cozy corners
          perfect for reading, working, or catching up with friends.
        </p>
        <p>
          We also host monthly acoustic nights, art displays from local artists,
          and coffee tasting events. Stay connected with us for updates and
          community happenings!
        </p>
      </section>
      {/* Operating Hours and Contact Info */}
      <section className="details" id="contact">
        <h2>Visit Us</h2>
        <p>
          <strong>Address:</strong> 123 Brew Street, Cabuyao City, Laguna,
          Philippines
        </p>
        <p>
          <strong>Opening Hours:</strong>
        </p>
        <ul>
          <li>Monday - Friday: 7:00 AM – 9:00 PM</li>
          <li>Saturday - Sunday: 8:00 AM – 10:00 PM</li>
        </ul>
        <p>
          <strong>Contact:</strong> (02) 1234-5678 | hello@Umbercoffeeshop.com
        </p>
      </section>
      {/* Map and Review */}
      <section className="information">
        <div className="information_container location">
          <h2>Find Us</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15462.833625361867!2d121.1200795!3d14.2524515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd627c10169735%3A0x884adf95ff0dc375!2sUniversity%20of%20Perpetual%20Help%20System%20Laguna%2C%20Cabuyao%20Campus!5e0!3m2!1sen!2sph!4v1693276312044!5m2!1sen!2sph"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className="information_container review">
          <h2>Customer Review</h2>
          <blockquote>
            "Absolutely love this place! The coffee is divine, and the
            atmosphere is so cozy. My go-to spot every morning. Plus, their cold
            brew is unmatched!"
            <cite>- Anna R.</cite>
          </blockquote>
          <blockquote>
            "Perfect for remote work! The staff is friendly, and the vibe is
            always relaxing. Umber Coffee has become my second office."
            <cite>- Miguel D.</cite>
          </blockquote>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
