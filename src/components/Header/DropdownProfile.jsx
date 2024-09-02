import React, { useEffect, useRef, useState } from "react";
import Button from "../UI/Button";
import { API_ENDPOINTS } from "../../BaseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";

export default function DropdownProfile() {
  const [array, setArray] = useState([]);
  const initialized = useRef(false);
  const navigate = useNavigate();
  const { user, setUser } = useUser(); // Access user and setUser from context

  const handleLogout = () => {
    // Clear user data from context
    setUser(null);

    // Determine if the token is stored in localStorage or sessionStorage
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    // Remove token from the appropriate storage
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    } else {
      sessionStorage.removeItem("token");
    }

    // Remove user data from localStorage if it's there
    localStorage.removeItem("user");

    // Redirect to login page
    navigate("/login", { replace: true });
  };
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      axios
        .get(API_ENDPOINTS.FETCH_USER, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("API Response Dropdown profile:", response);
          // Ensure the response data has a staffs array
          if (response.data.success && Array.isArray(response.data.users)) {
            setArray(response.data.users);
          } else {
            console.error("Unexpected response format:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching the  dropdown profile:", error);
        });
    }
  }, []);
  return (
    <div className="dropdown-menu custom-dropdown d-flex position-absolute top-20 end-0">
      <ul className="d-flex-reverse ">
        <img
          className="rounded-5"
          src={
            `${API_ENDPOINTS.FETCH_IMAGE}/${user.imageUrl}` ||
            "https://bit.ly/dan-abramov"
          }
          alt={`${user.name}`}
          style={{
            display: " inline-block",
            width: "65px",
            height: "65px",
            borderRadius: "50%",
          }}
        />
        <p className="h4">{user.username}</p>
        <p className="h6">{user.email}</p>

        <Button
          className="btn-danger"
          onClick={() => {
            handleLogout();
            alert("logout");
          }}
        >
          Logout
        </Button>
      </ul>
    </div>
  );
}
