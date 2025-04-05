import React, { useState } from 'react';
import { FaTrash, FaPlus, FaMinus, FaArrowLeft, FaCreditCard } from 'react-icons/fa';
import { HiShoppingBag } from 'react-icons/hi';
import './css/Cart.css';

function Cart() {
  // Sample cart data
  const [cartItems, setCartItems] = useState([
    { 
      id: 1, 
      name: "Wireless Headphones", 
      price: 99.99, 
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      quantity: 1,
      inStock: true
    },
    { 
      id: 2, 
      name: "Running Shoes", 
      price: 79.99, 
      image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
      quantity: 2,
      inStock: true
    },
    // Add more items...
  ]);

  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'shipping', 'payment', 'confirmation'
  const [shippingData, setShippingData] = useState({
    name: '',
    address: '',
    city: '',
    zip: ''
  });

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingFee + tax;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setCheckoutStep('shipping');
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setCheckoutStep('payment');
  };

  const handlePaymentSubmit = () => {
    // In a real app, process payment here
    setCheckoutStep('confirmation');
  };

  if (checkoutStep === 'shipping') {
    return (
      <div className="checkout-container">
        <div className="checkout-header">
          <button onClick={() => setCheckoutStep('cart')} className="back-button">
            <FaArrowLeft /> Back to Cart
          </button>
          <h2>Shipping Information</h2>
        </div>

        <form onSubmit={handleShippingSubmit} className="shipping-form">
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              value={shippingData.name}
              onChange={(e) => setShippingData({...shippingData, name: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input 
              type="text" 
              value={shippingData.address}
              onChange={(e) => setShippingData({...shippingData, address: e.target.value})}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input 
                type="text" 
                value={shippingData.city}
                onChange={(e) => setShippingData({...shippingData, city: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>ZIP Code</label>
              <input 
                type="text" 
                value={shippingData.zip}
                onChange={(e) => setShippingData({...shippingData, zip: e.target.value})}
                required
              />
            </div>
          </div>

          <button type="submit" className="continue-button">
            Continue to Payment
          </button>
        </form>
      </div>
    );
  }

  if (checkoutStep === 'payment') {
    return (
      <div className="checkout-container">
        <div className="checkout-header">
          <button onClick={() => setCheckoutStep('shipping')} className="back-button">
            <FaArrowLeft /> Back to Shipping
          </button>
          <h2>Payment Method</h2>
        </div>

        <div className="payment-methods">
          <div className="payment-card active">
            <FaCreditCard />
            <span>Credit/Debit Card</span>
          </div>
          <div className="payment-card">
            <HiShoppingBag />
            <span>PayPal</span>
          </div>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>${shippingFee.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax:</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button onClick={handlePaymentSubmit} className="pay-now-button">
            Pay Now
          </button>
        </div>
      </div>
    );
  }

  if (checkoutStep === 'confirmation') {
    return (
      <div className="confirmation-container">
        <div className="confirmation-icon">
          <div className="circle">
            <FaCreditCard />
          </div>
        </div>
        <h2>Order Confirmed!</h2>
        <p>Your payment has been processed successfully.</p>
        <div className="order-details">
          <p>Order #: {Math.floor(Math.random() * 1000000)}</p>
          <p>Estimated delivery: {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toDateString()}</p>
        </div>
        <button className="continue-shopping-button">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <HiShoppingBag size={48} />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items yet</p>
          <button className="browse-products-button">
            Browse Products
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <span className="item-price">${item.price.toFixed(2)}</span>
                  {!item.inStock && <span className="out-of-stock">Out of Stock</span>}
                </div>
                <div className="item-quantity">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <FaMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <FaPlus />
                  </button>
                </div>
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="remove-item"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
            </div>
            <div className="summary-row">
              <span>Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button onClick={handleCheckout} className="checkout-button">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;