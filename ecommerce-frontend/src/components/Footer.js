import React from 'react';
import './Footer.css';
function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      <div className="container">
        <p>&copy; 2025 E-Commerce Store. All Rights Reserved.</p>
        <div className="social-icons">
          <a href="#" className="text-white mx-2"><i className="fab fa-facebook"></i></a>
          <a href="#" className="text-white mx-2"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-white mx-2"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;