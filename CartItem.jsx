import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Cost of one kind of plant = price x quantity
  const calculateItemTotal = (item) => item.cost * item.quantity;

  // Cost of everything in the cart
  const calculateTotalAmount = () =>
    cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Going below 1 removes the item
      dispatch(removeItem(item.name));
    }
  };

  const handleDelete = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    alert('Checkout: Coming Soon!');
  };

  return (
    <div className="cart-container">
      <h2 className="cart-total">Total Cart Amount: ${calculateTotalAmount()}</h2>

      {cartItems.length === 0 && <p className="cart-empty">Your cart is empty. Add some plants!</p>}

      <div>
        {cartItems.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Unit price: ${item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-qty-button" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-qty-value">{item.quantity}</span>
                <button className="cart-qty-button" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateItemTotal(item)}</div>
            </div>
            <button className="cart-delete-button" onClick={() => handleDelete(item)}>Delete</button>
          </div>
        ))}
      </div>

      <div className="cart-actions">
        <button className="continue-button" onClick={onContinueShopping}>Continue Shopping</button>
        <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
}

export default CartItem;
