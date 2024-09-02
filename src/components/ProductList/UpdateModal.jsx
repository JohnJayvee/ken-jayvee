import { useContext } from "react";
import UserProgressContext from "../../store/UserProgressContext";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import Input from "../UI/InputBlock";

const UpdateModal = () => {
  const userProgressCtx = useContext(UserProgressContext);

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
        <form>
          <div className="form">
            <h2 className="text-dark">Update Your Order</h2>
          </div>
          <Input
            label="Email"
            type="email"
            id="email"
            name="email"
            // value={formData.email}
          />
          {}

          <Input
            label="Contact Number"
            type="text"
            id="cellphoneNumber"
            name="cellphoneNumber"
            // value={formData.cellphoneNumber}
          />
          {}

          <Input
            label="Address"
            type="text"
            id="address"
            name="address"
            // value={formData.address}
          />
          {}
          <Button
            className="btn-danger"
            type="button"
            onClick={() => userProgressCtx.hideUpdateOrder()}
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
