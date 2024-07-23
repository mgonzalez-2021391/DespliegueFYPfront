import React, { useState } from 'react';
import './Register.css';
import placeholderImage from '../../assets/Register.png';
import { useRegister } from '../../shared/hooks/useRegister';

export default function Register() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const { register, isLoading } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(name, surname, username, email, password, phone);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-content">
          <h1 className="register-title">Find your Pet</h1>
          <p className="welcome-text">Join us today !!!</p>
          <h2 className="register-subtitle">Register</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <div className="input-wrapper">
                <PawPrintIcon className="input-icon green-icon" />
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="surname">Surname</label>
              <div className="input-wrapper">
                <PawPrintIcon className="input-icon green-icon" />
                <input
                  type="text"
                  id="surname"
                  placeholder="Enter your surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <div className="input-wrapper">
                <PawPrintIcon className="input-icon green-icon" />
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <PawPrintIcon className="input-icon green-icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <BoneIcon className="input-icon green-icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="phone">Phone</label>
              <div className="input-wrapper">
                <PawPrintIcon className="input-icon green-icon" />
                <input
                  type="text"
                  id="phone"
                  placeholder="Enter your phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  pattern="\d{8}"
                  title="Phone number must be 8 digits"
                  required
                />
              </div>
            </div>
            <button type="submit" className="register-button" disabled={isLoading}>
              {isLoading ? 'Registering...' : 'REGISTER'}
            </button>
          </form>
          <p className="login-link">Already have an account? <a href="/">Log in</a></p>
        </div>
        <div className="register-image">
          <img src={placeholderImage} alt="Register" className="placeholder-image" />
        </div>
      </div>
    </div>
  );
}

function BoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z" />
    </svg>
  );
}

function PawPrintIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="4" r="2" />
      <circle cx="18" cy="8" r="2" />
      <circle cx="20" cy="16" r="2" />
      <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
    </svg>
  );
}
