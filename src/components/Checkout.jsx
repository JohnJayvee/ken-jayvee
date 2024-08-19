import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Modal from "./UI/Modal";
import Input from "./UI/InputBlock";
import Button from "./UI/Button";
import useHttp from "./Hooks/useHttp";
import { API_ENDPOINTS } from "../BaseUrl";
import Error from "./Error";

// define outside to avoid infinite loops of recreating an object
const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending, // alias for sending pre-loader
    error,
    sendRequest,
  } = useHttp(API_ENDPOINTS.POST_PRODUCTS, requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const fd = new FormData(e.target);
    const customerData = Object.fromEntries(fd.entries());

    const orderData = {
      order: {
        items: cartCtx.items, // Updated to access items from cartCtx
        customer: customerData,
      },
    };

    // Send the order data using the custom hook
    sendRequest(JSON.stringify(orderData));
  };

  let actions = (
    <>
      <Button
        className="btn-danger"
        type="button"
        onClick={() => userProgressCtx.hideCheckout()}
      >
        Close
      </Button>
      <Button className="btn-dark mx-3" type="submit">
        Submit Order
      </Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={userProgressCtx.progress === "checkout"}>
        <p className="h2">Success!</p>
        <p className="h3 text-dark">Order was submitted successfully</p>
        <div className="modal-actions">
          <Button
            className="btn-dark"
            onClick={() => userProgressCtx.hideCheckout()}
          >
            Okay
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p className="h2">Total Amount: ₱{cartTotal}</p>
        <Input label="First Name" type="text" id="firstName" name="firstName" />
        <Input label="Last Name" type="text" id="lastName" name="lastName" />
        <Input label="Email" type="email" id="email" name="email" />
        <Input label="Address" type="text" id="address" name="address" />
        <div className="control-row">
          <label className="h5">
            Payment method
            <select name="paymentMethod" id="paymentMethod">
              <option value="cash" id="paymentMethod">
                Cash
              </option>
              <option value="cash" id="paymentMethod">
                Online Payment
              </option>
            </select>
          </label>
        </div>
        {error && <Error title="Failed to Submit Order" message={error} />}
        <div className="modal-actions">{actions}</div>
      </form>
    </Modal>
  );
}
