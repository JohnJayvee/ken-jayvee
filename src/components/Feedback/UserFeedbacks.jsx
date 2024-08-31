import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../BaseUrl";

const ITEMS_PER_PAGE = 10;

export default function UserFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
          if (response.data.success && Array.isArray(response.data.feedbacks)) {
            setFeedbacks(response.data.feedbacks);
          } else {
            console.error("Unexpected response format:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching the user feedbacks:", error);
        });
    }
  }, []);

  const totalPages = Math.ceil(feedbacks.length / ITEMS_PER_PAGE);

  const paginatedFeedbacks = feedbacks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <p className="h2 text-center text-lg font-bold">USER FEEDBACK</p>
      <div className="container">
        <div className="row">
          {paginatedFeedbacks.map((feedbackItem) => (
            <div key={feedbackItem.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card h-100">
                <img
                  className="card-img-top rounded-circle mx-auto mt-3"
                  src={`${API_ENDPOINTS.FETCH_IMAGE}/${feedbackItem.image}`}
                  alt={feedbackItem.name}
                  style={{ height: "6rem", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{feedbackItem.name}</h5>
                  <p className="card-text">{feedbackItem.feedback}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
