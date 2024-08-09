import { useState, useRef } from "react";
import { useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../BaseUrl";

export default function UserFeedbacks() {
  const [array, setArray] = useState([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      axios
        .get(API_ENDPOINTS.FETCH_FEEDBACKS, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("API Response:", response);
          // Ensure the response data has a staffs array
          if (response.data.success && Array.isArray(response.data.feedbacks)) {
            setArray(response.data.feedbacks);
          } else {
            console.error("Unexpected response format:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching the user feedbacks:", error);
        });
    }
  }, []);
  return (
    <>
      <p className="h1 text-lg-center">USER FEEDBACK</p>
      <div className="container">
        <div className={`d-flex text-center mx-5`}>
          {array.slice(0, 3).map((feedbackItem) => (
            <div className={`col-lg my-5 g-5`}>
              {/* key={feedbackItem.id} */}
              <p className="h3">{feedbackItem.name}</p>
              <h2 className="fw-normal">{feedbackItem.feedback}</h2>
              {/* <p>{data.feedback.id}</p>  SAMPLE GET for feedback description*/}
              {/* <p>"{feedbackItem.id}"</p> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
