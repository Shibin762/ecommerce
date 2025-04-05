import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import './Header.css';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(5); // Replace with actual cart count
  const navigate = useNavigate();

  // Categories with dropdown items
  const categories = [
    {
      name: 'Electronics',
      subcategories: ['Phones', 'Laptops', 'Headphones']
    },
    {
      name: 'Fashion',
      subcategories: ['Men', 'Women', 'Kids']
    },
    {
      name: 'Home & Garden',
      subcategories: ['Furniture', 'Decor', 'Kitchen']
    }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">ShopEase</Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            {categories.map((category, index) => (
              <li key={index} className="nav-item dropdown">
                <span>
                  {category.name} <FaChevronDown className="dropdown-icon" />
                </span>
                <div className="dropdown-menu">
                  {category.subcategories.map((sub, subIndex) => (
                    <Link 
                      key={subIndex} 
                      to={`/category/${category.name.toLowerCase()}/${sub.toLowerCase()}`}
                      className="dropdown-item"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearch} className="desktop-search">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>

        {/* Icons */}
        <div className="header-icons">
          <Link to="/account" className="icon-link">
            <FaUser />
            <span>Account</span>
          </Link>
          <Link to="/cart" className="icon-link cart-link">
            <FaShoppingCart />
            {cartItemsCount > 0 && (
              <span className="cart-badge">{cartItemsCount}</span>
            )}
            <span>Cart</span>
          </Link>
          <button 
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          {/* Search Bar - Mobile */}
          <form onSubmit={handleSearch} className="mobile-search">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>

          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {categories.map((category, index) => (
                <li key={index} className="mobile-nav-item">
                  <details>
                    <summary>
                      {category.name} <FaChevronDown className="dropdown-icon" />
                    </summary>
                    <div className="mobile-dropdown-menu">
                      {category.subcategories.map((sub, subIndex) => (
                        <Link 
                          key={subIndex} 
                          to={`/category/${category.name.toLowerCase()}/${sub.toLowerCase()}`}
                          className="mobile-dropdown-item"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  </details>
                </li>
              ))}
              <li className="mobile-nav-item">
                <Link to="/account" onClick={() => setIsMobileMenuOpen(false)}>
                  My Account
                </Link>
              </li>
              <li className="mobile-nav-item">
                <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;