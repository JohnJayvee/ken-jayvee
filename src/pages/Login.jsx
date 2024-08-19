import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logoSVG from "./logo-transparent.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRememberMeChange = () => {
    setFormData({ ...formData, rememberMe: !formData.rememberMe });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setPasswordError('');
    setGeneralError('');

    try {
      const response = await axios.post(
        'http://white-emu-581912.hostingersite.com/api/login',
        {
          login: formData.email,
          password: formData.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.token) {
        if (formData.rememberMe) {
          localStorage.setItem('token', response.data.token);
        } else {
          sessionStorage.setItem('token', response.data.token);
        }
        navigate('/home'); // Redirect to the home page after login
      }
    } catch (error) {
      if (error.response) {
        const errors = error.response.data.errors;
        if (errors) {
          if (errors.email) {
            setLoginError(errors.email[0]);
          }
          if (errors.password) {
            setPasswordError(errors.password[0]);
          }
        } else {
          setGeneralError(
            error.response.data.message ||
            'Something went wrong. Please try again.'
          );
        }
      } else {
        setGeneralError('Network error. Please try again later.');
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="text-center mb-4">
                <img src={logoSVG} alt="Logo" style={{ maxWidth: '150px' }} />
              </div>
              <h3 className="text-center mb-4">Login</h3>
              {generalError && <div className="text-center text-danger mb-3">{generalError}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                  {loginError && <div className="text-danger">{loginError}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                    </button>
                  </div>
                  {passwordError && <div className="text-danger">{passwordError}</div>}
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleRememberMeChange}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
