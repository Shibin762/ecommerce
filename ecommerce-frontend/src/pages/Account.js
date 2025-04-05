import React, { useState } from 'react';
import { FaUser, FaHistory, FaSignOutAlt, FaEdit, FaLock, FaMapMarkerAlt, FaBell } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';
import './css/Account.css';

function Account() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001'
  });

  // Sample order history
  const orders = [
    {
      id: '#ORD-78945',
      date: '2023-05-15',
      status: 'Delivered',
      items: 2,
      total: 179.98,
      products: [
        { name: 'Wireless Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e' },
        { name: 'Phone Case', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb' }
      ]
    },
    // Add more orders...
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add API call to save data in a real app
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'orders':
        return (
          <div className="orders-section">
            <h2>Order History</h2>
            {orders.length > 0 ? (
              <div className="orders-list">
                {orders.map((order, index) => (
                  <div key={index} className="order-card">
                    <div className="order-header">
                      <div>
                        <span className="order-id">Order {order.id}</span>
                        <span className="order-date">{order.date}</span>
                      </div>
                      <div className={`order-status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </div>
                    </div>
                    
                    <div className="order-products">
                      {order.products.map((product, i) => (
                        <div key={i} className="product-item">
                          <img src={product.image} alt={product.name} />
                          <span>{product.name}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="order-footer">
                      <div className="order-total">
                        <span>Total:</span>
                        <span>${order.total.toFixed(2)}</span>
                      </div>
                      <button className="view-order-button">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-orders">
                <p>You haven't placed any orders yet</p>
                <button className="shop-now-button">Shop Now</button>
              </div>
            )}
          </div>
        );
      
      case 'addresses':
        return (
          <div className="addresses-section">
            <h2>Saved Addresses</h2>
            <div className="address-cards">
              <div className="address-card">
                <div className="address-header">
                  <FaMapMarkerAlt />
                  <h3>Primary Address</h3>
                </div>
                <p>{formData.address}</p>
                <div className="address-actions">
                  <button className="edit-button">
                    <FaEdit /> Edit
                  </button>
                  <button className="delete-button">
                    Delete
                  </button>
                </div>
              </div>
              
              <button className="add-address-button">
                + Add New Address
              </button>
            </div>
          </div>
        );
      
      case 'security':
        return (
          <div className="security-section">
            <h2>Security Settings</h2>
            <div className="security-card">
              <div className="security-item">
                <FaLock />
                <div>
                  <h3>Change Password</h3>
                  <p>Update your account password</p>
                </div>
                <button className="change-button">
                  Change
                </button>
              </div>
              
              <div className="security-item">
                <FaBell />
                <div>
                  <h3>Two-Factor Authentication</h3>
                  <p>Add an extra layer of security</p>
                </div>
                <button className="enable-button">
                  Enable
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'payments':
        return (
          <div className="payments-section">
            <h2>Payment Methods</h2>
            <div className="payment-cards">
              <div className="payment-card">
                <div className="payment-header">
                  <MdPayment />
                  <div>
                    <h3>VISA ending in 4242</h3>
                    <p>Expires 05/2025</p>
                  </div>
                </div>
                <button className="remove-button">
                  Remove
                </button>
              </div>
              
              <button className="add-payment-button">
                + Add Payment Method
              </button>
            </div>
          </div>
        );
      
      default: // Profile
        return (
          <div className="profile-section">
            <div className="profile-header">
              <h2>Profile Information</h2>
              {isEditing ? (
                <button onClick={handleSave} className="save-button">
                  Save Changes
                </button>
              ) : (
                <button onClick={() => setIsEditing(true)} className="edit-button">
                  <FaEdit /> Edit Profile
                </button>
              )}
            </div>
            
            <div className="profile-form">
              <div className="form-group">
                <label>Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{formData.name}</p>
                )}
              </div>
              
              <div className="form-group">
                <label>Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{formData.email}</p>
                )}
              </div>
              
              <div className="form-group">
                <label>Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{formData.phone}</p>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="account-container">
      <div className="account-sidebar">
        <div className="user-profile">
          <div className="avatar">
            {formData.name.charAt(0)}
          </div>
          <h3>{formData.name}</h3>
          <p>{formData.email}</p>
        </div>
        
        <nav className="account-menu">
          <button 
            className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FaUser /> Profile
          </button>
          
          <button 
            className={`menu-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <FaHistory /> Orders
          </button>
          
          <button 
            className={`menu-item ${activeTab === 'addresses' ? 'active' : ''}`}
            onClick={() => setActiveTab('addresses')}
          >
            <FaMapMarkerAlt /> Addresses
          </button>
          
          <button 
            className={`menu-item ${activeTab === 'payments' ? 'active' : ''}`}
            onClick={() => setActiveTab('payments')}
          >
            <MdPayment /> Payments
          </button>
          
          <button 
            className={`menu-item ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <FaLock /> Security
          </button>
          
          <button className="menu-item logout">
            <FaSignOutAlt /> Sign Out
          </button>
        </nav>
      </div>
      
      <div className="account-content">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default Account;