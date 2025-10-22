import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useCart } from "../context/useCart";

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const { cartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <nav>
        <h3>Umber Coffee</h3>
        <ul id="nav-menu" className={isMobileMenuOpen ? "active" : ""}>
          <li className="nav_link">
            <NavLink to="/" onClick={toggleMobileMenu}>
              Home
            </NavLink>
          </li>
          <li className="nav_link">
            <NavLink to="/drinks" onClick={toggleMobileMenu}>
              Our Drinks
            </NavLink>
          </li>
          <li className="nav_link">
            <NavLink to="/contact" onClick={toggleMobileMenu}>
              Contact
            </NavLink>
          </li>
          <li className="nav_link">
            <NavLink to="/cart" id="cart-icon" onClick={toggleMobileMenu}>
              🛒{" "}
              <span id="cart-count" className="cart-count">
                {cartCount}
              </span>
            </NavLink>
          </li>
          <li className="nav_link" id="login-logout-link">
            {isLoggedIn ? (
              <Link
                to="#"
                onClick={() => {
                  logout();
                  toggleMobileMenu();
                }}>
                Logout
              </Link>
            ) : (
              <NavLink to="/login" onClick={toggleMobileMenu}>
                Login
              </NavLink>
            )}
          </li>
        </ul>
        <div className="mobile-toggle" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
