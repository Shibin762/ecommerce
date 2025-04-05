import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes, FaFilter, FaStar, FaRegStar, FaShoppingCart } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import ProductCard from '../components/ProductCard';
import './css/Search.css';

function Search() {
  // Sample product data (replace with API call)
  const [products, setProducts] = useState([
    { id: 1, name: "Wireless Headphones", price: 99.99, category: "Electronics", rating: 4.5, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", inStock: true },
    { id: 2, name: "Running Shoes", price: 79.99, category: "Sports", rating: 4.2, image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d", inStock: true },
    // Add 10+ more products...
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState('relevance');
  const [activeTab, setActiveTab] = useState('all');

  // Available categories
  const categories = [...new Set(products.map(p => p.category))];

  // Filter and sort products
  useEffect(() => {
    let results = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesTab = activeTab === 'all' || 
                        (activeTab === 'in-stock' && product.inStock) || 
                        (activeTab === 'sale' && product.onSale);
      
      return matchesSearch && matchesPrice && matchesCategory && matchesTab;
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
      case 'newest':
        results.sort((a, b) => b.id - a.id); // Assuming higher ID = newer
        break;
      default:
        // Relevance (best matches first)
        results.sort((a, b) => {
          const aMatch = a.name.toLowerCase().indexOf(searchTerm.toLowerCase());
          const bMatch = b.name.toLowerCase().indexOf(searchTerm.toLowerCase());
          return aMatch - bMatch;
        });
    }

    setFilteredProducts(results);
  }, [searchTerm, priceRange, selectedCategories, sortOption, activeTab, products]);

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setPriceRange([0, 200]);
    setSelectedCategories([]);
    setSortOption('relevance');
    setActiveTab('all');
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= Math.floor(rating) 
          ? <FaStar key={i} className="star filled" /> 
          : <FaRegStar key={i} className="star" />
      );
    }
    return stars;
  };

  return (
    <div className="search-container">
      {/* Search Header */}
      <div className="search-header">
        <h1>Search Products</h1>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="clear-search"
              onClick={() => setSearchTerm('')}
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      {/* Quick Tabs */}
      <div className="quick-tabs">
        <button 
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Products
        </button>
        <button 
          className={`tab ${activeTab === 'in-stock' ? 'active' : ''}`}
          onClick={() => setActiveTab('in-stock')}
        >
          In Stock
        </button>
        <button 
          className={`tab ${activeTab === 'sale' ? 'active' : ''}`}
          onClick={() => setActiveTab('sale')}
        >
          On Sale
        </button>
      </div>

      {/* Main Content */}
      <div className="search-main">
        {/* Filters Sidebar */}
        <div className={`filters-sidebar ${showFilters ? 'visible' : ''}`}>
          <div className="sidebar-header">
            <h3>Filters</h3>
            <button 
              className="close-filters"
              onClick={() => setShowFilters(false)}
            >
              <FaTimes />
            </button>
          </div>

          <div className="filter-section">
            <h4>Price Range</h4>
            <div className="price-range-values">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="price-slider"
            />
          </div>

          <div className="filter-section">
            <h4>
              <BiCategory /> Categories
            </h4>
            <div className="category-filters">
              {categories.map(category => (
                <label key={category} className="category-option">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>

          <button 
            className="clear-filters"
            onClick={clearFilters}
          >
            Clear All Filters
          </button>
        </div>

        {/* Products Section */}
        <div className="products-section">
          {/* Results Header */}
          <div className="results-header">
            <div className="results-count">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
            </div>
            
            <div className="sort-options">
              <span>Sort by:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>

            <button 
              className="mobile-filter-button"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <div className="product-card" key={product.id}>
                  <ProductCard product={product} />
                  <div className="product-meta">
                    <div className="product-rating">
                      {renderStars(product.rating)}
                      <span>({product.rating.toFixed(1)})</span>
                    </div>
                    <button className="add-to-cart">
                      <FaShoppingCart /> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No products found</h3>
              <p>Try adjusting your search or filters</p>
              <button 
                className="reset-button"
                onClick={clearFilters}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;