
import React, { useState } from 'react';
import './Register.css';
import { MdEmail } from "react-icons/md";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './Register.php'

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Registration successful');
        setError('');
      } else {
        setError(data.message);
        setSuccess('');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className='loginwrapper'>
      <div className='formwrapper'>
        <div className='box'>
          <form onSubmit={handleSubmit} action='Register.php' method='post'>
            <h1>Create Account</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <FaUser className='icons' />
            </div>
            <div className="input-box">
              <input
                type="email"
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <MdEmail className='icons' />
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
            {success && <p className="success">{success}</p>}
            <button type='submit'>Sign up</button>
            <div className="register">
              <p>Have an account? <Link to="/Login">Log in</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
