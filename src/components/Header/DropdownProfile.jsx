import React from "react";

export default function DropdownProfile() {
  return (
    <div className="d-flex custom-dropdown">
      <ul className="d-flex-col g-4">
        <li>Profile</li>
        <li>Logout</li>
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
