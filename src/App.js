import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [checkoutMessage, setCheckoutMessage] = useState('');

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCheckoutMessage('');
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(
        cartItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      setCartItems(cartItems.filter(item => item.id !== productId));
    } else {
      setCartItems(
        cartItems.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleCheckout = () => {

    console.log('Checkout data:', cartItems);
    

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem(
      'orders',
      JSON.stringify([
        ...orders,
        {
          date: new Date().toISOString(),
          items: cartItems,
          total: cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          )
        }
      ])
    );

    setCheckoutMessage('Order placed successfully! Thank you for your purchase.');
    setCartItems([]);
  };

  return (
    <div className="container">
      <header>
        <h1>Online Store</h1>
        <div className="cart-counter">
          {cartItems.reduce((total, item) => total + item.quantity, 0)} items
        </div>
      </header>

      <div className="main-content">
        <ProductList onAddToCart={addToCart} />
        <Cart
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onCheckout={handleCheckout}
        />
      </div>

      {checkoutMessage && (
        <div className="checkout-message">
          <p>{checkoutMessage}</p>
        </div>
      )}
    </div>
  );
}

export default App;