import { useContext } from "react";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartContext from "../store/CartContext";
import CartItem from "./CartItem";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            itemName={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
            image={item.image}
          />
        ))}
      </ul>
      <p className="cart-total">{`₱${cartTotal}`}</p>
      <div className="modal-actions">
        <Button className="btn-outline-danger" onClick={handleCloseCart}>
          Close
        </Button>
        {/* check if there is an item on a cart to show or display the checkout button */}
        {cartCtx.items.length > 0 && (
          <Button
            className="btn-dark"
            onClick={() => {
              userProgressCtx.showCheckout();
            }}
          >
            Checkout
          </Button>
        )}
      </div>
    </Modal>
  );
}
