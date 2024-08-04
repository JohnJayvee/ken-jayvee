import { useContext } from "react";
import CartContext from "../../store/CartContext";
import Button from "../UI/Button";

export default function FoodItem({ items }) {
  const cartCtx = useContext(CartContext);
  function handleAddFoodToCart() {
    cartCtx.addItem(foods);
  }
  return (
    <li className="food-item">
      <div className="item-card">
        <img src={items.image} alt={items.name} />
        <div>
          <h3>{items.name}</h3>

          <p className="food-item-description">
            {foods.description.substring(0, 60)}
          </p>
        </div>

        <div className="food-item-actions d-flex justify-content-around">
          <dt className="food-item-price">₱{items.price}</dt>
          <Button className="btn-outline-light" onClick={handleAddFoodToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </li>
  );
}
