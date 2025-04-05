import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar, FaShoppingCart, FaHeart, FaRegHeart, FaChevronLeft } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import './css/ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Sample product data (replace with API call)
  const product = {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    description: "Experience crystal-clear sound with our noise-cancelling wireless headphones. Featuring 30-hour battery life and premium comfort.",
    rating: 4.7,
    reviewCount: 128,
    colors: ["Black", "Silver", "Blue"],
    sizes: ["S", "M", "L"],
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Bluetooth 5.0",
      "Built-in microphone"
    ],
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb"
    ],
    inStock: true
  };

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log({
      productId: product.id,
      color: selectedColor,
      size: selectedSize,
      quantity
    });
    navigate('/cart');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="star half-filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="star" />);
      }
    }
    
    return stars;
  };

  return (
    <div className="product-details-container">
      <button onClick={() => navigate(-1)} className="back-button">
        <FaChevronLeft /> Back to Products
      </button>

      <div className="product-main">
        {/* Image Gallery */}
        <div className="product-gallery">
          <div className="main-image-container">
            <img 
              src={product.images[currentImageIndex]} 
              alt={product.name} 
              className="main-image"
            />
            <button className="nav-button prev" onClick={prevImage}>
              <IoIosArrowBack />
            </button>
            <button className="nav-button next" onClick={nextImage}>
              <IoIosArrowForward />
            </button>
          </div>
          
          <div className="thumbnail-container">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          
          <div className="product-rating">
            <div className="stars">
              {renderStars()}
              <span>{product.rating.toFixed(1)}</span>
            </div>
            <span className="review-count">({product.reviewCount} reviews)</span>
          </div>

          <div className="product-price">
            ${product.price.toFixed(2)}
            {product.price > 99 && (
              <span className="free-shipping">FREE Shipping</span>
            )}
          </div>

          <div className="product-description">
            <p>{product.description}</p>
          </div>

          {!product.inStock && (
            <div className="out-of-stock-badge">Out of Stock</div>
          )}

          {/* Color Selection */}
          <div className="product-option">
            <h3>Color:</h3>
            <div className="color-options">
              {product.colors.map(color => (
                <button
                  key={color}
                  className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="product-option">
            <h3>Size:</h3>
            <div className="size-options">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="product-option">
            <h3>Quantity:</h3>
            <div className="quantity-selector">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
            </div>
          </div>

          {/* Features */}
          <div className="product-features">
            <h3>Features:</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="product-actions">
            <button 
              className="add-to-cart-button"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <FaShoppingCart /> Add to Cart
            </button>
            <button 
              className="wishlist-button"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              {isFavorite ? <FaHeart className="favorite" /> : <FaRegHeart />}
              Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="product-tabs">
        <div className="tab active">Description</div>
        <div className="tab">Specifications</div>
        <div className="tab">Reviews ({product.reviewCount})</div>
      </div>

      <div className="tab-content">
        <h2>Product Details</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.</p>
        <h3>Technical Specifications</h3>
        <ul>
          <li><strong>Weight:</strong> 0.5 lbs</li>
          <li><strong>Dimensions:</strong> 7.5 x 5.3 x 1.2 inches</li>
          <li><strong>Material:</strong> Premium plastic and metal</li>
        </ul>
      </div>
    </div>
  );
}

export default ProductDetails;