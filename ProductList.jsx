import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';
import CartItem from './CartItem.jsx';
import './ProductList.css';

// Makes a simple leaf picture so thumbnails always load.
// You can replace any plant's `image` with a real photo URL.
const leaf = (emoji, color) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="${color}"/><text x="100" y="120" font-size="90" text-anchor="middle">${emoji}</text></svg>`
  );

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: leaf('🌿', '#cfe8c9'), description: 'Produces oxygen at night.', cost: 15 },
      { name: 'Spider Plant', image: leaf('🍃', '#d8efd0'), description: 'Filters formaldehyde and xylene.', cost: 12 },
      { name: 'Peace Lily', image: leaf('🌼', '#e3f1d6'), description: 'Removes mold spores and toxins.', cost: 18 },
      { name: 'Boston Fern', image: leaf('🌱', '#c8e6c0'), description: 'Adds humidity to dry air.', cost: 20 },
      { name: 'Rubber Plant', image: leaf('🪴', '#d3ebc8'), description: 'Absorbs airborne chemicals.', cost: 17 },
      { name: 'Aloe Vera', image: leaf('🌵', '#dcefc9'), description: 'Purifies air and soothes burns.', cost: 14 },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: leaf('💜', '#e4d9f0'), description: 'Calming scent that aids sleep.', cost: 20 },
      { name: 'Jasmine', image: leaf('🤍', '#f1f1e4'), description: 'Sweet floral fragrance.', cost: 18 },
      { name: 'Rosemary', image: leaf('🌿', '#d5e8cf'), description: 'Fresh herbal scent, great for cooking.', cost: 15 },
      { name: 'Mint', image: leaf('🍃', '#cdeacb'), description: 'Refreshing aroma, repels pests.', cost: 12 },
      { name: 'Lemon Balm', image: leaf('🍋', '#f3f0c8'), description: 'Citrus scent that reduces stress.', cost: 14 },
      { name: 'Hyacinth', image: leaf('🌸', '#f4dbe6'), description: 'Strong, sweet spring fragrance.', cost: 22 },
    ],
  },
  {
    category: 'Low Light Plants',
    plants: [
      { name: 'ZZ Plant', image: leaf('🌿', '#c9dfcf'), description: 'Thrives in very low light.', cost: 25 },
      { name: 'Pothos', image: leaf('🍃', '#cfe5c4'), description: 'Easy trailing vine for shade.', cost: 10 },
      { name: 'Chinese Evergreen', image: leaf('🌱', '#d2e8d5'), description: 'Tolerates dim rooms with ease.', cost: 19 },
      { name: 'Cast Iron Plant', image: leaf('🪴', '#c4dccb'), description: 'Nearly indestructible in shade.', cost: 21 },
      { name: 'Parlor Palm', image: leaf('🌴', '#cde6c1'), description: 'Elegant palm for low light.', cost: 23 },
      { name: 'Prayer Plant', image: leaf('🍀', '#d6ecc9'), description: 'Leaves fold up at night.', cost: 16 },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  // Total number of items in the cart (for the cart icon)
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // A plant is "added" if it is already in the cart
  const isAdded = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div className="product-page">
      {/* Navbar (shown on both the plants page and the cart page) */}
      <nav className="navbar">
        <div className="navbar-brand" onClick={onHomeClick}>
          <span className="logo">🌿</span>
          <span>Paradise Nursery</span>
        </div>
        <div className="navbar-links">
          <a href="#home" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>Home</a>
          <a href="#plants" onClick={(e) => { e.preventDefault(); setShowCart(false); }}>Plants</a>
          <a
            href="#cart"
            className="cart-link"
            onClick={(e) => { e.preventDefault(); setShowCart(true); }}
          >
            <span className="cart-icon" aria-label="Shopping cart">🛒</span>
            <span className="cart-count">{totalQuantity}</span>
          </a>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-grid-wrapper">
          {plantsArray.map((group) => (
            <section key={group.category}>
              <h2 className="category-title">{group.category}</h2>
              <div className="product-grid">
                {group.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <h3 className="product-name">{plant.name}</h3>
                    <p className="product-desc">{plant.description}</p>
                    <p className="product-price">${plant.cost}</p>
                    <button
                      className="add-button"
                      disabled={isAdded(plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {isAdded(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
