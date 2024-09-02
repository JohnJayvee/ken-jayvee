import React, { useState } from "react";
import FoodItem from "../components/Food-Products/FoodItem";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { API_ENDPOINTS } from "../BaseUrl";
import Error from "../components/Error";
import useHttp from "../components/Hooks/useHttp";

const requestConfig = {};

const ITEMS_PER_PAGE = 8;

export default function Shop() {
  const {
    data: loadedItem,
    isLoading,
    error,
  } = useHttp(API_ENDPOINTS.FETCH_PRODUCTS, requestConfig, []);

  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return <p className="h2 text-center">Fetching products...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch Products" message={error} />;
  }

  if (!loadedItem || !loadedItem.products) {
    return <p className="text-center">No products available</p>;
  }

  const totalPages = Math.ceil(loadedItem.products.length / ITEMS_PER_PAGE);

  const paginatedProducts = loadedItem.products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header />
      <main className="container my-4">
        <h1 className="text-center mb-4">Shop</h1>

        <p className="h3 text-center mb-2">{`Total Products: ${loadedItem.totalProducts}`}</p>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 justify-content-sm-center justify-content-xs-center">
          <div className="d-flex  col-md-auto flex-wrap">
            {paginatedProducts.map((item) => (
              <div
                className="col d-flex rounded m-3 justify-content-sm-center justify-content-center"
                key={item.id}
              >
                <FoodItem foods={item} />
              </div>
            ))}
          </div>
        </div>

        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index + 1} className="page-item">
                  <button
                    onClick={() => handlePageChange(index + 1)}
                    className={`page-link  ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
