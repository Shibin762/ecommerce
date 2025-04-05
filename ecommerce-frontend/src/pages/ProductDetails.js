import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  // Fetch product details by ID (static for Task 1)
  const product = { id: 1, name: "Product 1", price: 10.99, description: "Lorem ipsum..." };

  return (
    <div className="container mt-5">
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      <button className="btn btn-primary">Add to Cart</button>
    </div>
  );
}
export default ProductDetails;