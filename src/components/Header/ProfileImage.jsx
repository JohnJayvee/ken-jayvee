import { useEffect, useRef, useState } from "react";
import { API_ENDPOINTS } from "../../BaseUrl";
import Button from "../UI/Button";
import axios from "axios";
import DropdownProfile from "./DropdownProfile";

export default function ProfileImage() {
  const [array, setArray] = useState([]);
  const [loadedProfile, setLoadedProfile] = useState(false);
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
          console.log("API Response:", response);
          // Ensure the response data has a staffs array
          if (response.data.success && Array.isArray(response.data.users)) {
            setArray(response.data.users);
          } else {
            console.error("Unexpected response format:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching the  user:", error);
        });
    }
  }, []);

  return (
    <>
      <Button
        className="nav-link px-1 link-secondary"
        onClick={() => setLoadedProfile((prev) => !prev)}
      >
        {array.slice(1, 1).map((profileItem) => {
          {
            <img
              key={profileItem.id}
              src={`http://white-emu-581912.hostingersite.com/${profileItem.image}`}
              style={{ height: "2rem" }}
            />;
          }
        })}{" "}
      </Button>
      {loadedProfile && <DropdownProfile />}
    </>
  );
}
