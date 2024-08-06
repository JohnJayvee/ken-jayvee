import React, { useState } from "react";
import axios from "axios";
import Input from "../UI/InputBlock";
import Button from "../UI/Button";
import contactImage from "./contact_pet.png";

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
        "http://kodegoapi.test/api/user/register",
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
    <div className="container">
      <div className="text-center mt-5">
        <h6 className="h1">Contact Us</h6>
      </div>
      <div className="row d-flex justify-content-md-center">
        <div className="col-md-4">
          <div className="border border-black rounded p-md-5">
            <h2 className="h2">Get in Touch</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="">
                <div className="px-2 mb-4">
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

                <div className="w-full px-2 mb-4">
                  <h3>Leave a Message : </h3>
                  <textarea
                    className={`form-control w-full h-40 p-3 border rounded-lg focus:outline-none resize-none ${
                      errors.message ? "border-red-500" : formData.message
                    }`}
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    // onFocus={(e) => (e.target.placeholder = '')}
                    // onBlur={(e) => (e.target.placeholder = 'Enter Message')}
                    placeholder="Enter Message"
                    required
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.message[0]}
                    </p>
                  )}
                </div>
                <div className="container">
                  <Button className="btn btn-dark w-100 mb-2" type="submit">
                    Send Message
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Divider */}
      <hr className="border-gray-300" />
    </div>
  );
};

export default FeedbackJ;
