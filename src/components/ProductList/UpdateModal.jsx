import { useContext, useEffect } from "react";
import UserProgressContext from "../../store/UserProgressContext";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import Input from "../UI/InputBlock";
import axios from "axios";
import { useUser } from "../../Context/UserContext";
import CartContext from "../../store/CartContext";
import { API_ENDPOINTS } from "../../BaseUrl";

const UpdateModal = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const user = useUser();
  const { orderData } = userProgressCtx;

  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault(); // Ensure this is called

    try {
      const response = await axios.put(
        `http://white-emu-581912.hostingersite.com/api/order/update/${id}`,
        orderData,
        config
      );
      console.log(response.data.order);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    userProgressCtx.setOrderData((orderData) => ({
      ...orderData,
      [name]: value,
    }));
  };

  function handleCloseOrder() {
    userProgressCtx.hideUpdateOrder();
  }

  return (
    <>
      <Modal
        className="order-update"
        open={userProgressCtx.progress === "updateOrder"}
        onClose={
          userProgressCtx.progress === "updateOrder" ? handleCloseOrder : null
        }
      >
        <form onSubmit={(e) => handleUpdate(e, orderData?.id)}>
          <div className="form">
            <h2 className="text-dark">{`Update Your Order`}</h2>

            <div className="container-fluid row">
              <div className="left-modal col col-md-6">
                <Input
                  label="Email"
                  type="email"
                  id="email"
                  name="email"
                  value={orderData?.email || ""}
                  onChange={handleOnChange}
                />
                <Input
                  label="Contact Number"
                  type="text"
                  id="cellphoneNumber"
                  name="cellphoneNumber"
                  value={orderData?.cellphoneNumber || ""}
                  onChange={handleOnChange}
                />
                <Input
                  label="Message"
                  type="text"
                  id="message"
                  name="message"
                  value={orderData?.message || ""}
                  onChange={handleOnChange}
                />
                <Input
                  label="Quantity"
                  type="text"
                  id="quantity"
                  name="quantity"
                  value={orderData?.quantity || ""}
                  onChange={handleOnChange}
                />
                <p className="h3">{`Total Price: ${orderData?.totalPrice}`}</p>
              </div>
              <div className="right-modal col col-md-6 row">
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    className="rounded-5"
                    src={`${API_ENDPOINTS.FETCH_IMAGE}/${orderData?.image}`}
                    alt={orderData?.productName}
                    style={{ height: "175px" }}
                  />
                </div>
                <div>
                  <h4 className="text-dark text-center">{`${orderData?.productName}`}</h4>
                </div>
              </div>
            </div>
          </div>

          <Button
            className="btn-danger"
            type="button"
            onClick={handleCloseOrder}
          >
            Close
          </Button>
          <Button className="btn-dark mx-3" type="submit">
            Update Order
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default UpdateModal;
