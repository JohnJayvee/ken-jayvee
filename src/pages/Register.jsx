import Button from "../components/UI/Button";
import Input from "../components/UI/InputBlock";
import { Link, redirect } from "react-router-dom";
import logoSVG from "./logo-transparent.png";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [generalError, setGeneralError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
    image: null, // Use null to handle file input
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevData) => ({
        ...prevData,
        image: files[0], // Assign the uploaded file to the image field
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setGeneralError("");
    setIsSending(true);

    // Prepare form data with file upload
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "http://white-emu-581912.hostingersite.com/api/user/register",
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("User Registered Successfully", response.data);
      window.location.replace("/login");
      setFormData({
        name: "",
        email: "",
        username: "",
        password: "",
        password_confirmation: "",
        image: null,
      });
    } catch (error) {
      // Error handling
      if (error.response && error.response.status === 422) {
        setGeneralError(error.response.data.errors);
      } else {
        console.error("Error submitting registration form:", error);
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-12 col-md-12 col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="text-center mb-2">
                  <img src={logoSVG} alt="Logo" style={{ maxWidth: "150px" }} />
                </div>
                <p className="text-center h3 text-dark">Sign up</p>
                {generalError && (
                  <div className="text-center text-danger mb-3">
                    {generalError}
                  </div>
                )}
                <form
                  className="text-dark"
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                >
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    label="Fullname"
                    onChange={handleChange}
                    value={formData.name}
                  />
                  <Input
                    type="text"
                    name="email"
                    id="email"
                    label="Email"
                    onChange={handleChange}
                    value={formData.email}
                  />
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    label="Username"
                    onChange={handleChange}
                    value={formData.username}
                  />
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    label="Password"
                    onChange={handleChange}
                    value={formData.password}
                  />
                  <Input
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    label="Confirm Password"
                    onChange={handleChange}
                    value={formData.password_confirmation}
                  />
                  <Input
                    type="file"
                    name="image"
                    id="image"
                    label="Profile Image"
                    onChange={handleChange}
                  />
                  <Button
                    className="btn-dark w-100"
                    type="submit"
                    disabled={isSending}
                  >
                    {isSending ? "Registering..." : "Register"}
                  </Button>
                  <div className="text-sm mt-2">
                    <p className="h6">
                      Have an account?{" "}
                      <Link
                        className="text-danger link-underline-light"
                        to="/login"
                      >
                        Login
                      </Link>
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
}
