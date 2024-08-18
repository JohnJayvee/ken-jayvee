// import { useEffect, useState, useRef } from "react";
import FoodItem from "../components/Food-Products/FoodItem";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { API_ENDPOINTS } from "../BaseUrl";
import Error from "../components/Error";
import useHttp from "../components/Hooks/useHttp";
// import axios from "axios";
const requestConfig = {};
export default function Shop() {
  // const [loadedItem, setLoadedItem] = useState([]);
  // const initialized = useRef(false);
  // const userProgressCtx = useContext(UserProgressContext);

  // useEffect(() => {
  //   if (!initialized.current) {
  //     initialized.current = true;
  //     axios
  //       .get(API_ENDPOINTS.FETCH_PRODUCTS, {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       })
  //       .then((response) => {
  //         console.log("API Response:", response);
  //         // Ensure the response data has a Products array
  //         if (response.data.success && Array.isArray(response.data.products)) {
  //           setLoadedItem(response.data.products);
  //         } else {
  //           console.error("Unexpected response format:", response.data);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching the products:", error);
  //       });
  //   }
  // }, []);
  // to avoid infinit loop in recreating a new object everytime  function run and finishes OR its only creating the OBJECT ONCE.
  const {
    // destructuring from the custom Http Hookf to get hold of the data that's eventually returned
    data: loadedItem, // set the alias loadedMeals already for the Data fetched
    isLoading,
    error,
  } = useHttp(API_ENDPOINTS.FETCH_PRODUCTS, requestConfig, []);

  if (isLoading) {
    return <p>Fetching meals...</p>;
  }

  // if (error) {
  //   return <Error title="Failed to fetch Meals" message={error} />; //since I'm setting the error state to the error message(useHttp.jsx).
  // }

  return (
    <>
      <Header />
      <p className="h1 text-center">Shop</p>
      <div className="container-fluid">
        <ul className="row h-50" id="items">
          {loadedItem.map((items) => (
            <div className="col col-lg-3 col-md-4 my-2 justify-content-sm-center">
              <FoodItem key={items.id} foods={items} />
            </div>
          ))}
        </ul>
      </div>

      <Footer />
    </>
  );
}
