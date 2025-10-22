import React from "react";

const DrinkCard = ({ drink, onOrderClick }) => {
  return (
    <div className="drink">
      <img src={drink.image} alt={drink.name} />
      <h3>{drink.name}</h3>
      <p>{drink.description}</p>
      <span className="menu-item-price">${drink.price.toFixed(2)}</span>
      <button className="order-btn" onClick={() => onOrderClick(drink)}>
        Order
      </button>
    </div>
  );
};

export default DrinkCard;
