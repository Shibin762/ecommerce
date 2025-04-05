import React from 'react';
import { Link } from 'react-router-dom';
import './css/Home.css';

// Mock category data
const categories = [
  { id: 1, name: "Electronics", count: 42, image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03" },
  { id: 2, name: "Fashion", count: 68, image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f" },
  { id: 3, name: "Home & Garden", count: 35, image: "https://images.unsplash.com/photo-1513694203232-719a280e022f" },
];

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="container">
          <h1 className="hero-title">Discover Amazing Products</h1>
          <p className="hero-subtitle">
            Shop the latest trends in electronics, fashion, and more with our exclusive collections.
          </p>
          <div className="cta-buttons">
            <Link to="/catalog" className="cta-button cta-primary">Shop Now</Link>
            <Link to="/login" className="cta-button cta-secondary">Sign In</Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="featured-categories">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="category-grid">
            {categories.map((category) => (
              <div key={category.id} className="category-card">
                <img src={category.image} alt={category.name} className="category-img" />
                <div className="category-info">
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-count">{category.count} items</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;