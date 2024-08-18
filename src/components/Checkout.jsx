import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Modal from "./UI/Modal";
import Input from "./UI/InputBlock";
import Button from "./UI/Button";
import axios from "axios";
import useHttp from "./Hooks/useHttp";
import { API_ENDPOINTS } from "../BaseUrl";

// define outside to avoid infinite loops of recreating an objects
const requestConfig = {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
};
export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
  } = useHttp(API_ENDPOINTS.POST_PRODUCTS, requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleSubmit = async (e) => {
    const fd = new FormData(e.target);
    const customerData = Object.fromEntries(fd.entries()); // passing form data ENTRIES will RETURN then an object { email: test@example.com } a key : value pairs

    sendRequest(
      JSON.stringify({
        order: {
          order: {
            items: cartCtx,
            customer: customerData,
          },
        },
      })
    );
  };
  console.log(data);

  let actions = (
    <>
      <Button
        className="btn-outline-danger"
        type="button"
        onClick={() => userProgressCtx.hideCheckout()}
      >
        Close
      </Button>
      <Button className="btn-dark mx-3">Submit Order</Button>
    </>
  );
  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p className="h2">total Amount{` : ₱${cartTotal}`}</p>

        {/*input fullName OR be set dynamically from user login e.g{user.name}*/}
        <Input label="First Name" type="text" id="firstName" />
        <Input label="Last Name" type="text" id="lastName" />
        <Input label="Email" type="email" id="email" />
        <Input label="Address" type="text" id="street" />
        <div className="control-row">
          <label className="h5 mt-2 ">
            Payment method
            <select name="payment-method">
              <option value="cash">Cash</option>
              <option value="online payment">
                Online payment (not available)
              </option>
            </select>
          </label>
        </div>
        <ul className="checkout-button ">
          <p className="modal-actions">{actions}</p>
        </ul>
      </form>
    </Modal>
  );
}

//////////////////////////////////////////////////////////////////////////////////////
// BEFORE : using AXIOS
// try {
// const response = await axios.post(
//   "http://white-emu-581912.hostingersite.com/api/order/create",
//   formData,
//   {
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       order: {
//         order: {
//           items: cartCtx,
//           customer: customerData,
//         },
//       },
//     }),
//   }
// );
//     if (response.status === 200 || response.status === 201) {
//       alert("Place Order Successfully!");
//       console.log(response);
//       setFormData({ firstName: "",
//           lastName: "",
//           email: "",
//           address: "",
//           paymentMethod: "" });
//       setErrors({});
//     } else {
//       alert("Failed to submit order.");
//     }
//   }
//   catch (error) {
//     if (error.response && error.response.status === 422) {
//       const apiErrors = error.response.data.errors || {};
//       setErrors(apiErrors);
//       alert("Validation error. Please check the fields.");
//       console.log(error.response);
//     } else {
//       alert("Failed to submit order.");
//     }
//   }
// };

//  function handleSubmit(event){
//     event.preventDefault();
// const fd = new FormData(e.target);
// const customerData = Object.fromEntries(fd.entries()); // passing form data ENTRIES will RETURN then an object { email: test@example.com } a key : value pairs
//     // buil-in feature browser offer FormData onject
//     const fd = new FormData(event.target);
//     const customerData = Object.fromEntries(fd.entries()); // passing form data ENTRIES will RETURN then an object { email: test@example.com } a key : value pairs
//     // also extract entered by the user into object e.g {full-name : 'ken mark amandoron'}

//     fetch('localhost/sample/db.php', { // will hit the backend and data can be extracted and stored
//         method : 'POST',
//         headers: {
//             'Content-Type' : 'application/json'
//         },
//         body : JSON.stringify({ // all the data that should be submitted
//             order: {
//                 items: cartCtx.items,  // the CART DATA that should be submitted
//                 customer: customerData // convert USER ENTRIES from form inputs to JSON object
//             }
//         })
//     });
