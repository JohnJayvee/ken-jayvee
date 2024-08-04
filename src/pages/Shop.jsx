import { useEffect, useState, useRef } from "react";
import FoodItem from "../components/Food-Products/FoodItem";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import axios from "axios";

export default function Shop() {
  const [loadedItem, setloadedItem] = useState([]);
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
          if (response.data.success && Array.isArray(response.data.products)) {
            setloadedItem(response.data.products);
          } else {
            console.error("Unexpected response format:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching the team members:", error);
        });
    }
  }, []);

  // const [loadedFoods, setLoadedFoods] = useState([]);

  // useEffect(() => {
  //   fetch("http://kodegoapi.test/api/products")
  //     .then((resFood) => resFood.json())
  //     .then((foodData) => {
  //       setLoadedFoods(foodData);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  return (
    <>
      <Header />
      <p className="h1 text-center">Shop</p>
      <ul id="foods">
        {loadedItem.map((items) => (
          <FoodItem key={foods.id} items={items} />
        ))}
      </ul>
      <Footer />
    </>
  );
}
