import React, { useState } from 'react';
import './register.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();
  const [image, setImage] = useState('');
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    password: '',
    cpassword: '',
    gender: '',
    image: '', // State to store selected image
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
      setFormData({ ...formData, image: reader.result }); // Set image data to formData
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/auth/signup', formData);
    console.log(res.data);
    if (res.data) {
      localStorage.setItem('chat-user', JSON.stringify(res.data));
      setAuthUser(res.data);
      navigate('/chat');
    } else {
      // Handle error
      console.error('Registration failed');
    }
    // Reset form fields after submission
    setFormData({
      fullname: '',
      username: '',
      password: '',
      cpassword: '',
      gender: '',
      image: '',
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
                name='cpassword'
                placeholder='Confirm Password'
                value={formData.cpassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className='register-content'>
              {/* Dropdown for gender selection */}
              <select
                id='mySelect'
                name='gender'
                value={formData.gender}
                onChange={handleChange}
                required style={{}}
              >
                <option value=''>Select Gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select>
            </div>
            {/* Other input fields */}
            <div className='register-content'>
            <label for="files" class="btn">Select Image</label>
              <input
                id='files'
                type='file'
                className='image'
                onChange={handleImage} // Call handleImage on file change
                required
              />
            </div>
            {/* Display selected image */}
            {image && (
              <div className='register-content'>
                <img src={image} alt='Selected' style={{ maxWidth: '100px' }} />
              </div>
            )}
            <button id='Regbutton' type='submit' className='registerButton'>
              Register
            </button>
          </form>
          <p style={{ fontSize: 12, color: 'black' }}>
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
