import React, { useState } from 'react';
import './ProductCard.css';
function Cart() {
  const [items, setItems] = useState([
    { id: 1, name: "Product 1", price: 10.99, quantity: 1 }
  ]);

  const updateQuantity = (id, newQuantity) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <input 
            type="number" 
            value={item.quantity} 
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))} 
          />
        </div>
      ))}
    </div>
  );
}