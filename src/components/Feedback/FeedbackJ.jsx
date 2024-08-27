import React, { useState } from "react";
import axios from "axios";
import Button from "../UI/Button";
import { useUser } from "../../Context/UserContext";

const FeedbackJ = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    user_id: user ? user.id : "",
    feedback: "",
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
        "http://white-emu-581912.hostingersite.com/api/feedback/create",
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
        setFormData({ message: "" });
        setErrors({});
        window.location.reload();
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
                <div className="w-full px-2 mb-4">
                  <h3>Leave a Message : </h3>
                  <textarea
                    className={`form-control w-full h-40 p-3 border rounded-lg focus:outline-none resize-none ${
                      errors.message ? "border-red-500" : formData.message
                    }`}
                    name="feedback"
                    id="feedback"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter Feedback"
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
    </div>
  );
};

export default FeedbackJ;
