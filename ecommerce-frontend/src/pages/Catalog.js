import React from 'react';
import ProductCard from '../components/ProductCard';

const products = [
  { id: 1, name: "Product 1", price: 10.99, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Product 2", price: 19.99, image: "https://via.placeholder.com/150" },
];

function Catalog() {
  return (
    <div className="container mt-5">
      <h2>Product Catalog</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Catalog;