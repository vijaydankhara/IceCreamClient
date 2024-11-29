import React, { useState } from 'react';
import backgroundImage from '../assets/b.jpg'; 
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isRegister, setIsRegister] = useState(false); 
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNo: '',
  });
  const [errors, setErrors] = useState({});
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      gender: '',
      dateOfBirth: '',
      email: '',
      password: '',
      confirmPassword: '',
      mobileNo: '',
    });
    setErrors({});
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    // Validate form fields
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      let response;
      if (isRegister) {
        // User register API call
        response = await axios.post('http://localhost:1111/api/auth/register-user', {
          ...formData, 
          isAdmin: false
        });
        setPopupMessage('User registered successfully!');
      } else {
        // Login API call
        response = await axios.post('http://localhost:1111/api/auth/login', {
          email: formData.email,
          password: formData.password
        });
        
        // Store the token in localStorage or any other storage as needed
        const token = response.data.token;
        localStorage.setItem('authToken', token);
        console.log("Token ===>", token);

        setPopupMessage('User logged in successfully!');
        navigate('/DatabaseProduct'); 
      }
      setShowPopup(true);
      resetForm(); 
    } catch (error) {
      console.error('Error occurred:', error.response ? error.response.data : error.message);
      setPopupMessage(error.response?.data?.message || 'An error occurred. Please try again.');
      setShowPopup(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    const formErrors = {};
    if (isRegister) {
      if (!formData.firstName) formErrors.firstName = 'First Name is required';
      if (!formData.lastName) formErrors.lastName = 'Last Name is required';
      if (!formData.gender) formErrors.gender = 'Gender is required';
      if (!formData.dateOfBirth) formErrors.dateOfBirth = 'Date of Birth is required';
      if (!formData.mobileNo) formErrors.mobileNo = 'Mobile Number is required';
    }

    if (!formData.email || !validateEmail(formData.email)) {
      formErrors.email = 'Valid Email is required';
    }

    if (!formData.password) {
      formErrors.password = 'Password is required';
    }

    if (isRegister && formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }

    return formErrors;
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="container mx-auto p-4 bg-cover bg-center h-full" >
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6" style={{ border:"1px solid green" }}>
        <div className="flex items-center justify-center text-2xl mb-6" >
          <FaUser className="mr-2" />
          <h2>{isRegister ? 'User Registration' : 'Login'}</h2>
        </div>

        <form onSubmit={onSubmitForm}>
          {isRegister && (
            <>
              <div className="mb-4">
                <label className="block mb-2 text-sm text-gray-500">First Name <span className="text-red-500">*</span></label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded-full focus:outline-none focus:shadow-outline ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                  type="text"
                  required
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm text-gray-500">Last Name <span className="text-red-500">*</span></label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded-full focus:outline-none focus:shadow-outline ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                  type="text"
                  required
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm text-gray-500">Gender <span className="text-red-500">*</span></label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded-full focus:outline-none focus:shadow-outline ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm text-gray-500">Date of Birth <span className="text-red-500">*</span></label>
                <input
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded-full focus:outline-none focus:shadow-outline ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
                  type="date"
                  required
                />
                {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm text-gray-500">Mobile Number <span className="text-red-500">*</span></label>
                <input
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded-full focus:outline-none focus:shadow-outline ${errors.mobileNo ? 'border-red-500' : 'border-gray-300'}`}
                  type="tel"
                  required
                />
                {errors.mobileNo && <p className="text-red-500 text-xs mt-1">{errors.mobileNo}</p>}
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block mb-2 text-sm text-gray-500">Email <span className="text-red-500">*</span></label>
            <input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded-full focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              type="email"
              required
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm text-gray-500">Password <span className="text-red-500">*</span></label>
            <input
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded-full focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              type={passwordVisible ? 'text' : 'password'}
              required
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {isRegister && (
            <div className="mb-4">
              <label className="block mb-2 text-sm text-gray-500">Confirm Password <span className="text-red-500">*</span></label>
              <input
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded-full focus:outline-none focus:shadow-outline ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                type={passwordVisible ? 'text' : 'password'}
                required
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          )}

          <div className="mb-6 flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            >
              {isRegister ? 'Register' : 'Login'}
            </button>
            <button
              type="button"
              onClick={toggleForm}
              className="text-sm text-blue-500 hover:text-blue-700 focus:outline-none"
            >
              {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
            </button>
          </div>
        </form>

        {showPopup && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">{popupMessage}</h3>
              <button onClick={closePopup} className="mt-4 text-blue-500">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
