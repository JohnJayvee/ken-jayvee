import { useState, useRef, useEffect } from "react";
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
          // Ensure the response data has a feedback array
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
      <p className="h2 text-center text-lg font-bold">USER FEEDBACK</p>
      <div className="container">
        <div className="row text-center">
          {array.slice(0, 10).map((feedbackItem) => (
            <div key={feedbackItem.id} className="row g-3 col-md-6 p-0 m-0">
              <img
                className="rounded-circle col-md-4 w-25  align-self-md-center"
                src={`${API_ENDPOINTS.FETCH_IMAGE}/${feedbackItem.image}`}
                alt={feedbackItem.name}
                style={{ height: "6rem" }}
              />
              <p className="h5 font-semibold col-md-4 align-self-md-center">
                {feedbackItem.name}
              </p>
              <h2 className="h6 col-md-4 align-self-md-center">{`--${feedbackItem.feedback}--`}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
