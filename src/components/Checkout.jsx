import { useContext, useState } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Modal from "./UI/Modal";
import Input from "./UI/InputBlock";
import Button from "./UI/Button";
import { useUser } from "../Context/UserContext";
import axios from "axios";

// define outside to avoid infinite loops of recreating an object

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const { user } = useUser();
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState({}); // state for validation errors
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  // cartCtx.addItem(foods);
  const [formData, setFormData] = useState({
    firstName: user.name,
    lastName: user.name,
    email: "",
    cellphoneNumber: "",
    address: "",
    message: " " || null,
    paymentMethod: "cash on delivery" || " ", // Default to "Cash on Delivery"
    user_id: user.id,
    orders: cartCtx.items.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
      totalPrice: item.quantity * item.price,
    })),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        " http://white-emu-581912.hostingersite.com/api/order/create",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Order submitted successfully:", response.data);
      setFormData({ message: "" });
      setErrors({}); // Clear errors on successful submission
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Validation errors
        setErrors(error.response.data.errors);
        console.log(formData);

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
        </Modal>;
      } else {
        console.error("Error submitting form:", error);
      }
    } finally {
      setIsSending(false);
    }
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
  return (
    <Modal open={userProgressCtx.progress === "checkout"}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p className="h2">Total Amount: ₱{cartTotal}</p>
        <Input
          label="Email"
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
        />
        <Input
          label="Contact Number"
          type="text"
          id="cellphoneNumber"
          name="cellphoneNumber"
          onChange={handleChange}
        />
        <Input
          label="Address"
          type="text"
          id="address"
          name="address"
          onChange={handleChange}
        />
        <textarea
          className="w-50"
          label="message"
          type="text"
          id="message"
          name="message"
          placeholder="Note to seller"
          onChange={handleChange}
        ></textarea>
        <div className="control-row">
          <label className="h5">
            Payment method
            <select
              name="paymentMethod"
              id="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option value="cash on delivery">Cash on Delivery</option>
              <option value="Gcash">Gcash</option>
            </select>
          </label>
        </div>
        <div className="modal-actions">{actions}</div>
      </form>
    </Modal>
  );
}
