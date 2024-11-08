
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient'
  });
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/register', formData);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#D0F0C0] to-[#90EE90]">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-center text-3xl font-bold text-[#006400] mb-6">
          Register for our Healthcare App
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-[#008000] font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-[#90EE90] rounded-md focus:outline-none focus:ring focus:ring-[#90EE90]"
              required
              />
          </div>
          <div>
            <label htmlFor="email" className="block text-[#008000] font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-[#90EE90] rounded-md focus:outline-none focus:ring focus:ring-[#90EE90]"
              required
              />
          </div>
          <div>
            <label htmlFor="password" className="block text-[#008000] font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-[#90EE90] rounded-md focus:outline-none focus:ring focus:ring-[#90EE90]"
              required
              />
          </div>
          <div>
            <label htmlFor="role" className="block text-[#008000] font-medium mb-2">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#90EE90] rounded-md focus:outline-none focus:ring focus:ring-[#90EE90]"
              >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#90EE90] text-white rounded-md hover:bg-[#7CFC00] transition-colors duration-300"
            >
            Register
          </button>
        </form>
        <div className="text-center mt-4 text-[#008000]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#006400] font-medium hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
 