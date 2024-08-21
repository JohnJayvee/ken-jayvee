import { API_ENDPOINTS } from "../BaseUrl";
import useAuth from "./auth";

export default function CartItem({
  image,
  itemName,
  quantity,
  price,
  onIncrease,
  onDecrease,
}) {
  const isLoggedIn = useAuth();
  if (!isLoggedIn) {
    return null;
  }
  return (
    <li className="cart-item">
      <img
        className="rounded object-fit-lg-contain border"
        src={`${API_ENDPOINTS.FETCH_IMAGE}/${image}`}
        alt={`${itemName}`}
      />
      <p className="h4">
        {itemName} - {quantity} x {`₱${price}`}
      </p>
      <div className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span> {quantity}</span>
        <button onClick={onIncrease}>+</button>
      </div>
    </li>
  );
}
