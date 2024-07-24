
import React, { useState } from 'react';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
    
        console.log('Login successful');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className='loginwrapper'>
      <div className='formwrapper'>
        <div className='box'>
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <FaUser className='icons' />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FaLock className='icons' />
            </div>
            {error && <p className="error">{error}</p>}
            <div className="remember-forgot">
              <label><input type="checkbox" /> Remember Me</label>
              <a href="#">Forgot password?</a>
            </div>
            <div className='button1'>
              <button type='submit'>Log in</button>
            </div>
            <div className="register">
              <p>Don't have an account? <Link to="/Register">Register Here</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
