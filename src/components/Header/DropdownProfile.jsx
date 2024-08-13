import React, { useEffect, useRef, useState } from "react";
import Button from "../UI/Button";
import { API_ENDPOINTS } from "../../BaseUrl";
import axios from "axios";

export default function DropdownProfile() {
  const [array, setArray] = useState([]);
  const initialized = useRef(false);
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
    <div className="d-flex custom-dropdown">
      <ul className="d-flex-col">
        <p>HELLO</p>
        {array.slice(0, -2).map((dropItem) => {
          <p className="h3">{dropItem.email}</p>;
        })}

        <Button
          className="btn-danger"
          onClick={() => {
            alert("logout");
          }}
        >
          Logout
        </Button>
      </ul>
    </div>
  );
}
