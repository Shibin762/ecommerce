import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPhone, FaAddressCard } from 'react-icons/fa';
import './css/Register.css';

function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be 8+ characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Registration data:', formData);
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  if (success) {
    return (
      <div className="registration-success">
        <div className="success-animation">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>
        <h2>Registration Successful!</h2>
        <p>Redirecting to login page...</p>
      </div>
    );
  }

  return (
    <div className="registration-container">
      <div className="registration-card">
        <div className="registration-header">
          <h2>Create Account</h2>
          <p>Join our community today</p>
        </div>

        <form onSubmit={handleSubmit} className="registration-form">
          <div className={`input-group ${errors.name ? 'error' : ''}`}>
            <span className="input-icon"><FaUser /></span>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className={`input-group ${errors.email ? 'error' : ''}`}>
            <span className="input-icon"><FaEnvelope /></span>
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className={`input-group ${errors.phone ? 'error' : ''}`}>
            <span className="input-icon"><FaPhone /></span>
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="password-row">
            <div className={`input-group ${errors.password ? 'error' : ''}`}>
              <span className="input-icon"><FaLock /></span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className={`input-group ${errors.confirmPassword ? 'error' : ''}`}>
              <span className="input-icon"><FaLock /></span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          </div>

          <div className={`input-group ${errors.address ? 'error' : ''}`}>
            <span className="input-icon"><FaAddressCard /></span>
            <input
              type="text"
              placeholder="Address (Optional)"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>

          <div className="terms-agreement">
            <label>
              <input type="checkbox" required /> 
              I agree to the <Link to="/terms">Terms & Conditions</Link>
            </label>
          </div>

          <button 
            type="submit" 
            className="register-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Register Now'}
            {isSubmitting && <span className="spinner"></span>}
          </button>
        </form>

        <div className="login-redirect">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export default Registration;