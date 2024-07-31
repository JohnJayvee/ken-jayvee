import React, { useState } from "react";
import axios from "axios";
import Input from "../UI/InputBlock";
import Button from "../UI/Button";

const FeedbackJ = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        alert("Message sent successfully!");
        console.log(response);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const apiErrors = error.response.data.errors || {};
        setErrors(apiErrors);
        alert("Validation error. Please check the fields.");
        console.log(error.response);
      } else {
        alert("Failed to send message.");
      }
    }
  };

  return (
    <div className="container mx-auto mt-20 px-4">
      <div className="border-l-8 border-blue-700 pl-5 mb-5">
        <h6 className="text-blue-700 text-md uppercase">Contact Us</h6>
        <h1 className="text-3xl lg:text-4xl uppercase font-bold mb-5">
          Feel free to leave a message
        </h1>
      </div>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-8/12 px-4 mb-8">
          <div className="bg-stone-50 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              Get in Touch
            </h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <Input
                    className={`form-control w-full p-3 border rounded-lg focus:outline-none ${
                      errors.name
                        ? "border-red-500"
                        : formData.name
                        ? "border-green-500"
                        : "border-blue-300"
                    }`}
                    name="name"
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={(e) => (e.target.placeholder = "")}
                    onBlur={(e) => (e.target.placeholder = "Enter your name")}
                    label="Name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name[0]}
                    </p>
                  )}
                </div>

                <div className="w-full md:w-1/2 px-2 mb-4">
                  <Input
                    className={`form-control w-full p-3 border rounded-lg focus:outline-none ${
                      errors.email
                        ? "border-red-500"
                        : formData.email
                        ? "border-green-500"
                        : "border-blue-300"
                    }`}
                    name="email"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={(e) => (e.target.placeholder = "")}
                    onBlur={(e) =>
                      (e.target.placeholder = "Enter email address")
                    }
                    placeholder="Email"
                    label="Email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email[0]}
                    </p>
                  )}
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <Input
                    className={`form-control w-full p-3 border rounded-lg focus:outline-none ${
                      errors.username
                        ? "border-red-500"
                        : formData.username
                        ? "border-green-500"
                        : "border-blue-300"
                    }`}
                    name="username"
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange}
                    onFocus={(e) => (e.target.placeholder = "")}
                    onBlur={(e) => (e.target.placeholder = "Enter your name")}
                    label="username"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.username[0]}
                    </p>
                  )}
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <Input
                    className={`form-control w-full p-3 border rounded-lg focus:outline-none ${
                      errors.password
                        ? "border-red-500"
                        : formData.password
                        ? "border-green-500"
                        : "border-blue-300"
                    }`}
                    name="password"
                    id="password"
                    type="text"
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={(e) => (e.target.placeholder = "")}
                    onBlur={(e) => (e.target.placeholder = "Enter your name")}
                    label="password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password[0]}
                    </p>
                  )}
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <Input
                    className={`form-control w-full p-3 border rounded-lg focus:outline-none ${
                      errors.password_confirmation
                        ? "border-red-500"
                        : formData.name
                        ? "border-green-500"
                        : "border-blue-300"
                    }`}
                    name="password_confirmation"
                    id="password_confirmation"
                    type="text"
                    value={formData.password_confirmation}
                    onChange={handleInputChange}
                    onFocus={(e) => (e.target.placeholder = "")}
                    onBlur={(e) => (e.target.placeholder = "Enter your name")}
                    label="password confirmation"
                  />
                  {errors.password_confirmation && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password_confirmation[0]}
                    </p>
                  )}
                </div>
                {/*                 
                <div className="w-full px-2 mb-4">
                  <textarea
                    className={`form-control w-full h-40 p-3 border rounded-lg focus:outline-none resize-none ${
                      errors.message
                        ? "border-red-500"
                        : formData.message
                        ? "border-green-500"
                        : "border-blue-300"
                    }`}
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    // onFocus={(e) => (e.target.placeholder = '')}
                    // onBlur={(e) => (e.target.placeholder = 'Enter Message')}
                    placeholder="Enter Message"
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.message[0]}
                    </p>
                  )}
                </div> */}
                <div className="w-full px-2">
                  <Button className="btn btn-primary bg-blue-700 text-white px-6 py-3 rounded-lg focus:outline-none hover:bg-pink-800">
                    Send Message
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full lg:w-4/12 px-4 mb-8">
          <div className="bg-stone-50 rounded-lg shadow-lg p-6">
            <div className="space-y-6">
              <div className="media contact-info flex items-start space-x-4">
                <span className="contact-info__icon text-2xl text-blue-700">
                  <i className="ti-home"></i>
                </span>
                <div className="media-body">
                  <h3 className="text-xl font-semibold text-blue-700">
                    Buttonwood, California.
                  </h3>
                  <p className="text-gray-600">Rosemead, CA 91770</p>
                </div>
              </div>
              <div className="media contact-info flex items-start space-x-4">
                <span className="contact-info__icon text-2xl text-blue-700">
                  <i className="ti-tablet"></i>
                </span>
                <div className="media-body">
                  <h3 className="text-xl font-semibold text-blue-700">
                    +1 253 565 2365
                  </h3>
                  <p className="text-gray-600">Mon to Fri 9am to 6pm</p>
                </div>
              </div>
              <div className="media contact-info flex items-start space-x-4">
                <span className="contact-info__icon text-2xl text-blue-700">
                  <i className="ti-email"></i>
                </span>
                <div className="media-body">
                  <h3 className="text-xl font-semibold text-blue-700">
                    support@colorlib.com
                  </h3>
                  <p className="text-gray-600">Send us your query anytime!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Divider */}
      <hr className="my-12 border-gray-300" />
    </div>
  );
};

export default FeedbackJ;
