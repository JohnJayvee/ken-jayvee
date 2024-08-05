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
        src={`https://white-emu-581912.hostingersite.com/storage/${image}`}
        alt={`${itemName}`}
      />
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
