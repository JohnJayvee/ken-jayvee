import { useEffect, useRef, useState } from "react";
import {API_ENDPOINTS} from '../../BaseUrl'

export default function ProfileImage() {
  const [array, setArray] = useState([]);
  const initialized = useRef(false);



  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      axios
        .get(API_ENDPOINTS.USER_REGISTER, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("API Response:", response);
          // Ensure the response data has a staffs array
          if (response.data.success && Array.isArray(response.data.user)) {
            setArray(response.data.user);
          } else {
            console.error("Unexpected response format:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching the team members:", error);
        });
    }
  }, []);

  return (
    <>
      <Button
        className="nav-link px-1 link-secondary"
        onClick={() => setLoadedProfile((prev) => !prev)}
      >
        {" "}
        <img src={`${}`} style={{ height: "2rem" }} />{" "}
      </Button>
      {loadedProfile && <DropdownProfile />}
    </>
  );
}
