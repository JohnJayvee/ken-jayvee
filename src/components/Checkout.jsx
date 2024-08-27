import { useContext, useEffect, useState } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Modal from "./UI/Modal";
import Input from "./UI/InputBlock";
import Button from "./UI/Button";
import { useUser } from "../Context/UserContext";
import axios from "axios";
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
  const [formData, setFormData] = useState({
    firstName: user ? user.name : "", // Set to empty string if user is not defined
    lastName: user ? user.name : "", // Set to empty string if user is not defined
    email: "",
    cellphoneNumber: "",
    address: "",
    message: "",
    paymentMethod: "cash on delivery", // Default value is always "cash on delivery"
    user_id: user ? user.id : "",
    orders: cartCtx.items.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
      totalPrice: cartTotal,
    })),
  });

  //nasolve karin
  const cd = cartCtx.items;
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      orders: cartCtx.items.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        totalPrice: item.quantity * item.price, // Ensure correct total price per item
      })),
    }));
  }, [cd]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    // Check if orders array is empty
    if (formData.orders.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        orders: ["The orders field is required."],
      }));
      setIsSending(false);
      return;
    }
    try {
      const response = await axios.post(
        "http://white-emu-581912.hostingersite.com/api/order/create",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Success handling
      console.log("Order submitted successfully:", response.data);
      setFormData((prevData) => ({
        ...prevData,
        message: "",
      }));
      setErrors({}); // Clear errors on successful submission
      window.location.reload();
    } catch (error) {
      // Error handling
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
        console.log(formData);
      } else {
        console.error("Error submitting form:", error);
      }
    } finally {
      setIsSending(false);
    }
  };
  // Actions for the modal
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
          value={formData.email}
        />
        {errors.email && <p className="error-text">{errors.email[0]}</p>}
        <Input
          label="Contact Number"
          type="text"
          id="cellphoneNumber"
          name="cellphoneNumber"
          onChange={handleChange}
          value={formData.cellphoneNumber}
        />
        {errors.cellphoneNumber && (
          <p className="error-text">{errors.cellphoneNumber[0]}</p>
        )}
        <Input
          label="Address"
          type="text"
          id="address"
          name="address"
          onChange={handleChange}
          value={formData.address}
        />
        {errors.address && <p className="error-text">{errors.address[0]}</p>}
        <textarea
          className="w-50"
          label="message"
          id="message"
          name="message"
          placeholder="Note to seller"
          onChange={handleChange}
          value={formData.message}
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
        {errors.paymentMethod && (
          <p className="error-text">{errors.paymentMethod[0]}</p>
        )}
        {errors.orders && <p className="error-text">{errors.orders[0]}</p>}
        <div className="modal-actions">{actions}</div>
      </form>
    </Modal>
  );
}
