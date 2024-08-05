import { useEffect, useState, useRef } from "react";
import FoodItem from "../components/Food-Products/FoodItem";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import axios from "axios";

export default function Shop() {
  const [loadedItem, setLoadedItem] = useState([]);
  const initialized = useRef(false);
  // const userProgressCtx = useContext(UserProgressContext);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      axios
        .get("http://white-emu-581912.hostingersite.com/api/products", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("API Response:", response);
          // Ensure the response data has a Products array
          if (response.data.success && Array.isArray(response.data.products)) {
            setLoadedItem(response.data.products);
          } else {
            console.error("Unexpected response format:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching the products:", error);
        });
    }
  }, []);

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
