import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const user = {
        username: username,
        password: password
      };
      const res = await axios.post('http://127.0.0.1:5000/api/auth/login', user);
      if (res.data) {
        localStorage.setItem('chat-user', JSON.stringify(res.data));
        setAuthUser(res.data);
        navigate('/chat');
      } else {
        setError('Invalid username or password. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError('An error occurred while logging in. Please try again later.');
    }
  };

  return (
    <div className='login'>
      <div className='wrapper'>
        <h2 className='login-header'>LOGIN </h2>
        <div className='login-contents'>
          <div className='login-content'>
            <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className='login-content'>
            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type='submit' className='loginButton' onClick={handleLogin}>
            Login
          </button>
          {error && <p className='error-message'>{error}</p>}
          <p style={{ fontSize: 12 }}>
            Don't have an account?{' '}
            <span className='signup-nav' style={{ color: 'blue', fontWeight: 900, cursor: 'pointer' }}>
              <Link to='register'>Register here</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
