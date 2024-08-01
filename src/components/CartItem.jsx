import useAuth from "./auth";

export default function CartItem({
  imageItem,
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
      <img src={imageItem} alt={`${itemName}`} />
      <p>
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
