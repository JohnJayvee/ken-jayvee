import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logoSVG from "./logo-transparent.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import toHome from "../images/back-to-home.png";
import { useUser } from "../Context/UserContext.jsx";
import { API_ENDPOINTS } from "../BaseUrl.jsx";
const LoginForm = () => {
  const navigate = useNavigate();
  const [fieldErrors, setFieldErrors] = useState({});
  const { setUser } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      navigate("/home", { replace: true }); // Redirect to dashboard if token exists
    }
  }, [navigate]);

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
    setLoginError("");
    setPasswordError("");
    setGeneralError("");
    setFieldErrors({});

    try {
      const response = await axios.post(
        API_ENDPOINTS.LOGIN_USERS,
        {
          login: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.token) {
        if (formData.rememberMe) {
          localStorage.setItem("token", response.data.token);
        } else {
          sessionStorage.setItem("token", response.data.token);
        }
        setIsLoggedIn(true); // Update login status
        setUser({
          id: response.data.user.id || null,
          name: response.data.user.name || "Guest",
          imageUrl: response.data.user.image || "https://bit.ly/dan-abramov",
          email: response.data.user.email || null,
          username: response.data.user.username || null,
          token: response.data.token || null,
        });

        response.data.user.id;
        navigate("/home"); // Redirect to the home page after login
      }
    } catch (error) {
      if (error.response) {
        const errors = error.response.data.errors;
        if (errors) {
          if (errors.login) {
            setLoginError(errors.login[0]);
          }
          if (errors.password) {
            setPasswordError(errors.password[0]);
          }
        } else {
          setGeneralError(
            error.response.data.message ||
            "Something went wrong. Please try again."
          );
        }
      } else {
        setGeneralError("Network error. Please try again later.");
      }
    }
  };

  return (
    <>
      <span>
        <Link to={"/"} className="text-dark link-underline-light">
          <img
            className="m-md-3"
            src={toHome}
            alt="back to home button"
            style={{ height: "3rem" }}
          />
          <span className="h3 fw-bolder ">Home</span>
        </Link>
      </span>
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="text-center mb-2">
                  <img src={logoSVG} alt="Logo" style={{ maxWidth: "150px" }} />
                </div>
                <h3 className="text-center mb-4">Login</h3>
                {generalError && (
                  <div className="text-center text-danger mb-3">
                    {generalError}
                  </div>
                )}
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
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
                    {loginError && (
                      <div className="text-danger">{loginError}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
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
                        <FontAwesomeIcon
                          icon={passwordVisible ? faEyeSlash : faEye}
                        />
                      </button>
                    </div>
                    {passwordError && (
                      <div className="text-danger">{passwordError}</div>
                    )}
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleRememberMeChange}
                    />

                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember Me
                    </label>
                  </div>
                  <button type="submit" className="btn btn-dark w-100">
                    Login
                  </button>
                  <div className="text-sm mt-2">
                    <p className="h6">
                      New to Pawgo Shop?{" "}
                      <Link
                        className="text-danger link-underline-light"
                        to="/register"
                      >
                        Sign Up
                      </Link>{" "}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
