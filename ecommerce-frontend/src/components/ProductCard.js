import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
function ProductCard({ product }) {
  return (
    <div className="card h-100">
      <img src={product.image || "https://via.placeholder.com/150"} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">${product.price.toFixed(2)}</p>
        <Link to={`/product/${product.id}`} className="btn btn-primary">View Details</Link>
      </div>
    </div>
  );
}

export default ProductCard;