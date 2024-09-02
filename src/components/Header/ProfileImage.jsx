import { useEffect, useRef, useState } from "react";
import { API_ENDPOINTS } from "../../BaseUrl";
import Button from "../UI/Button";
import axios from "axios";
import DropdownProfile from "./DropdownProfile";
import useAuth from "../auth";
import { useUser } from "../../Context/UserContext";

export default function ProfileImage() {
  const [array, setArray] = useState([]);
  const [loadedProfile, setLoadedProfile] = useState(false);
  const initialized = useRef(false);
  const { user } = useUser();

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

  const isLoggedIn = useAuth();
  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <Button
        className="btn btn-outline-light dropdown-toggle p-0"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onClick={() => setLoadedProfile((prev) => !prev)}
      >
        <div className="dropdown-center custom-profile overflow-hidden">
          <img
            src={
              `${API_ENDPOINTS.FETCH_IMAGE}/${user.imageUrl}` ||
              "https://bit.ly/dan-abramov"
            }
            alt={`${user.name}`}
          />
        </div>
      </Button>
      {loadedProfile && <DropdownProfile />}
    </>
  );
}
