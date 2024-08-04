import { useEffect, useState, useRef } from "react";
// import Button from "../UI/Button";
import axios from "axios";

// import UserProgressContext from "../../store/UserProgressContext";

const Feedback = () => {
  const [array, setArray] = useState([]);
  const initialized = useRef(false);
  // const userProgressCtx = useContext(UserProgressContext);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      axios
        .get("http://kodegoapi.test/api/users", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("API Response:", response);
          // Ensure the response data has a staffs array
          if (response.data.success && Array.isArray(response.data.feedback)) {
            setArray(response.data.feedback);
          } else {
            console.error("Unexpected response format:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching the team members:", error);
        });
    }
  }, []);
  // function HandleShowFeedback() {
  //   userProgressCtx.showFeedback();
  // }
  return (
    <>
      {/* <section className="h1 text-center my-5 position-relative ">
        <p>USER FEEDBACK</p>

        <Button className="btn-dark">Send Feedback</Button>
      </section> */}
    </>
  );
};

export default Feedback;
