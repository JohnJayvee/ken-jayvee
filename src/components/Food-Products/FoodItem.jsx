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
    <li className="food-item list-group-item">
      <div className="item-card row" aria-hidden="true">
        <div className="col-md">
          <img
            className="rounded mt-2 "
            key={foods.id}
            src={`${API_ENDPOINTS.FETCH_IMAGE}/${foods.image}`}
            alt={foods.name}
          />
        </div>
        <div className="col-md-auto">
          <h3>{foods.name}</h3>

          <p className="food-item-description m-0">
            {`- ${foods.description.substring(0, 60)} -`}
          </p>
        </div>

        <div className="row g-sm-1 d-flex justify-content-md-center ">
          <dt className="food-item-price col-md-7 col-sm m-sm-1">
            ₱{foods.price}
          </dt>
          <Button
            className="btn-outline-light col-md-7 col-sm p-0 "
            onClick={handleAddFoodToCart}
            aria-disabled="true"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </li>
  );
}
