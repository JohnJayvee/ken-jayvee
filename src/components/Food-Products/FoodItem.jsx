import { useContext } from "react";
import CartContext from "../../store/CartContext";
import Button from "../UI/Button";

export default function FoodItem({ foods }) {
  const cartCtx = useContext(CartContext);
  function handleAddFoodToCart() {
    cartCtx.addItem(foods);
  }
  return (
    <li className="food-item">
      <div className="item-card">
        <img src={foods.images[0]} alt={foods.category.name} />
        <div>
          <h3>{foods.title}</h3>

          <p className="food-item-description">
            {foods.description.substring(0, 60)}
          </p>
        </div>

        <div className="food-item-actions d-flex justify-content-around">
          <dt className="food-item-price">₱{foods.price}</dt>
          <Button className="btn-outline-light" onClick={handleAddFoodToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </li>
  );
}
