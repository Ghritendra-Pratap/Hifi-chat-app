import React, { useState } from 'react';
import './register.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '', // State to store selected gender
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted:', formData);
    // Reset form fields after submission
    setFormData({
      fullname: '',
      username: '',
      password: '',
      confirmPassword: '',
      gender: '',
    });
  };

  return (
    <div className='register'>
      <div className='wrapper'>
        <h2 className='register-header'>Register </h2>
        <div className='register-contents'>
          <form onSubmit={handleSubmit}>
            <div className='register-content'>
              <input
                type='text'
                name='fullname'
                placeholder='Full Name'
                value={formData.fullname}
                onChange={handleChange}
                required
              />
            </div>
            <div className='register-content'>
              <input
                type='text'
                name='username'
                placeholder='Username'
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className='register-content'>
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className='register-content'>
              <input
                type='password'
                name='confirmPassword'
                placeholder='Confirm Password'
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className='register-content'>
              {/* Dropdown for gender selection */}
              <select
                name='gender'
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value=''>Select Gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
              </select>
            </div>
            <button type='submit' className='registerButton'>
              Register
            </button>
          </form>
          <p style={{ fontSize: 12 }}>
            Already have an account{' '}
            <span className='signup-nav' style={{ color: 'blue', fontWeight: 900, cursor: 'pointer' }}>
              <Link to='/'>Login here</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
