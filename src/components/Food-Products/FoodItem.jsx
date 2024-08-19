import { useContext } from "react";
import CartContext from "../../store/CartContext";
import Button from "../UI/Button";
import { API_ENDPOINTS } from "../../BaseUrl";

export default function FoodItem({ foods }) {
  const cartCtx = useContext(CartContext);
  function handleAddFoodToCart() {
    cartCtx.addItem(foods);
  }
  return (
    <li className="food-item">
      <div className="">
        <div className="item-card ">
          <img
            className="rounded object-fit-lg-contain object-fit-md-contain mt-md-2 object-fit-sm-contain h-auto p-lg-2 p-md-2"
            key={foods.id}
            src={`${API_ENDPOINTS.FETCH_IMAGE}/${foods.image}`}
            alt={foods.name}
          />
          <div>
            <h3>{foods.name}</h3>

            <p className="food-item-description">
              {`- ${foods.description.substring(0, 60)} -`}
            </p>
          </div>

          <div className="food-item-actions row g-2 mx-3">
            <dt className="food-item-price">₱{foods.price}</dt>
            <Button className="btn-outline-light" onClick={handleAddFoodToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
}
