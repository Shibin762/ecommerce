import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import './css/Search.css';
function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Mock search function (replace with API call in Task 2)
  const handleSearch = (e) => {
    e.preventDefault();
    const mockResults = [
      { id: 1, name: "Football", price: 25.99, image: "https://via.placeholder.com/150" },
      { id: 2, name: "Basketball", price: 32.99, image: "https://via.placeholder.com/150" },
    ].filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    setResults(mockResults);
  };

  return (
    <div className="container mt-5">
      <h2>Search Products</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search by product name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">Search</button>
        </div>
      </form>
      <div className="row">
        {results.length > 0 ? (
          results.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p>No products found. Try another search.</p>
        )}
      </div>
    </div>
  );
}

export default Search;