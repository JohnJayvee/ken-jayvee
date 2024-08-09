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
          // Ensure the response data has a feedbacks array
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
      <p className="text-center text-lg font-bold">USER FEEDBACK</p>
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center">
          {array.slice(0, 3).map((feedbackItem) => (
            <div key={feedbackItem.id} className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <img
                className="rounded-circle w-25"
                src={`${API_ENDPOINTS.FETCH_IMAGE}/${feedbackItem.image}`}
                alt={feedbackItem.name}
              />
              <p className="h3 font-semibold">{feedbackItem.name}</p>
              <h2 className="h4">{feedbackItem.feedback}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
