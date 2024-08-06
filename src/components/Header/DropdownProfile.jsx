import React from "react";
import Button from "../UI/Button";
import { Link } from "react-router-dom";

export default function DropdownProfile() {
  return (
    <div className="d-flex custom-dropdown">
      <ul className="d-flex-col">
        <p>Profile</p>

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

// {/* <div className="dropdown">
// <ul className="dropdown-menu ">
//   <Button className="nav-link px-1 link-secondary">
//     {" "}
//     {/* Drop down user profile including UserName, Avatar, Email & Logout */}
//     <Link to="/profile">
//       {" "}
//       <img src={userIcon} style={{ height: "2rem" }} />
//     </Link>
//   </Button>
// </ul>
// </div> */}
