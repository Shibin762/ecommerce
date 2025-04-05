import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaStar, FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import './css/Catalog.css';

function Catalog() {
  // Sample product data
  const [products, setProducts] = useState([
    { id: 1, name: "Wireless Headphones", price: 99.99, category: "Electronics", rating: 4.5, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", isFavorite: false },
    { id: 2, name: "Running Shoes", price: 79.99, category: "Sports", rating: 4.2, image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d", isFavorite: false },
    // Add 10+ more products...
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState('default');

  // Available categories from products
  const categories = [...new Set(products.map(p => p.category))];

  // Filter and sort products
  useEffect(() => {
    let results = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      return matchesSearch && matchesPrice && matchesCategory;
    });

    // Sorting
    switch(sortOption) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sorting (newest first)
        results.sort((a, b) => b.id - a.id);
    }

    setFilteredProducts(results);
  }, [searchTerm, priceRange, selectedCategories, sortOption, products]);

  const toggleFavorite = (productId) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, isFavorite: !p.isFavorite } : p
    ));
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  return (
    <div className="catalog-container">
      {/* Search and Filter Bar */}
      <div className="catalog-controls">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="control-buttons">
          <button 
            className="filter-button"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filters
          </button>

          <select 
            className="sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Filters Panel (Collapsible) */}
      {showFilters && (
        <div className="filters-panel">
          <div className="filter-section">
            <h4>Price Range</h4>
            <div className="price-range">
              <span>${priceRange[0]}</span>
              <input 
                type="range" 
                min="0" 
                max="200" 
                value={priceRange[1]} 
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              />
              <span>${priceRange[1]}</span>
            </div>
          </div>

          <div className="filter-section">
            <h4>Categories</h4>
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-tag ${selectedCategories.includes(category) ? 'active' : ''}`}
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div className="product-card-wrapper" key={product.id}>
              <ProductCard product={product} />
              <button 
                className="favorite-button"
                onClick={() => toggleFavorite(product.id)}
              >
                {product.isFavorite ? <FaHeart className="favorite" /> : <FaRegHeart />}
              </button>
              <div className="product-actions">
                <button className="add-to-cart">
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <h3>No products found</h3>
            <p>Try adjusting your filters or search term</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Catalog;