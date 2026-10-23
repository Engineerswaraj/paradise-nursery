import React, { useState } from 'react';
import ProductList from './ProductList.jsx';
import AboutUs from './AboutUs.jsx';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  // Plants page (with navbar and cart)
  if (showProductList) {
    return <ProductList onHomeClick={() => setShowProductList(false)} />;
  }

  // Landing page
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Welcome To Paradise Nursery</h1>
        <p>Where Green Meets Serenity</p>
        <button
          className="get-started-button"
          onClick={() => setShowProductList(true)}
        >
          Get Started
        </button>
      </div>
      <AboutUs />
    </div>
  );
}

export default App;
