import Button from "../components/UI/Button";
import Input from "../components/UI/InputBlock";
import { Link } from "react-router-dom";
import logoSVG from "./logo-transparent.png";
import { useState } from "react";

export default function Register() {
  const [generalError, setGeneralError] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    setGeneralError("");

    // buil-in feature browser offer FormData onject
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries()); // passing form data ENTRIES will RETURN then an object { email: test@example.com } a key : value pairs
    // also extract entered by the user into object e.g {full-name : 'ken mark amandoron'}
  }

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
                <form className="text-dark " onSubmit={handleSubmit}>
                  <Input
                    type="text"
                    name="first-name"
                    id="first-name"
                    label="First name"
                  />
                  <Input
                    type="text"
                    name="last-name"
                    id="last-name"
                    label="Last name"
                  />
                  <Input
                    type="text"
                    name="contact-number"
                    id="contact-number"
                    label="Contact number"
                  />
                  <Input
                    type="text"
                    name="user-name"
                    id="user-name"
                    label="Username"
                  />
                  <Input type="email" name="email" id="email" label="Email" />
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    label="Password"
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
