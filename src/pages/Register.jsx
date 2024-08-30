import Button from "../components/UI/Button";
import Input from "../components/UI/InputBlock";
import { Link } from "react-router-dom";
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
    image: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setGeneralError("");
    setIsSending(true);

    try {
      const response = await axios.post(
        "http://white-emu-581912.hostingersite.com/api/user/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("User Registered Successfully", response.data);
      setFormData((prevData) => ({ ...prevData, message: "" }));
    } catch (error) {
      // Error handling
      if (error.response && error.response.status === 422) {
        setGeneralError(error.response.data.errors);
        console.log(formData);
      } else {
        console.error("Error submitting registration form:", error);
        console.log(formData);
      }
    } finally {
      alert("Registration Successful, Proceed to Login");
      redirect("./Login.jsx");
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
                  className="text-dark "
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                >
                  <Input type="text" name="name" id="name" label="Fullname" />

                  <Input type="text" name="email" id="email" label="Email" />
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    label="Username"
                    onChange={handleChange}
                  />
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    label="Password"
                    onChange={handleChange}
                  />

                  <Input
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    label="Confirm Password"
                    onChange={handleChange}
                  />

                  <Input
                    type="file"
                    name="image"
                    id="image"
                    label="Profile Image"
                    onChange={handleChange}
                  />

                  <Button className="btn-dark w-100" type="submit">
                    {" "}
                    Register{" "}
                  </Button>
                  <div className="text-sm mt-2 ">
                    <p className="h6">
                      Have an account?{" "}
                      <Link
                        className="text-danger link-underline-light"
                        to="/login"
                      >
                        Login
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
}
