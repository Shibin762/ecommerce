import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';
// Import other pages...

function App() {
  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          {/* Add other routes */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;