import { useContext, useState } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Modal from "./UI/Modal";
import Input from "./UI/InputBlock";
import Button from "./UI/Button";
import { API_ENDPOINTS } from "../BaseUrl";
import { useUser } from "../Context/UserContext";
import axios from "axios";

// define outside to avoid infinite loops of recreating an object

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const { user } = useUser();
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState({}); // state for validation errors
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cellphoneNumber: "",
    address: "",
    paymentMethod: "",
    user_id: "",
    order_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const fd = new FormData(e.target);
    // const customerData = Object.fromEntries(fd.entries());

    try {
      const response = await axios.post(
        `http://white-emu-581912.hostingersite.com/api/order/create/${user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(user.id);
      console.log("Order submitted successfully:", response.data);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        cellphoneNumber: "",
        address: "",
        user_id: "",
        order_id: [{ product_id: "", quantity: 1, totalPrice: "" }],
        message: null,
      });
      setErrors({}); // Clear errors on successful submission
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Validation errors
        setErrors(error.response.data.errors);

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
          label="First Name"
          type="text"
          id="firstName"
          name="firstName"
          onChange={handleChange}
        />
        <Input
          label="Last Name"
          type="text"
          id="lastName"
          name="lastName"
          onChange={handleChange}
        />
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
        <div className="control-row">
          <label className="h5">
            Payment method
            <select
              name="paymentMethod"
              id="paymentMethod"
              onChange={handleChange}
            >
              <option value="cash">Cash</option>
              <option value="online payment">Online Payment</option>
            </select>
          </label>
        </div>
        {/* {errors && (
          <Error title="Failed to Submit Order" message={errors.error} /> 
        )}*/}
        <div className="modal-actions">{actions}</div>
      </form>
    </Modal>
  );
}
