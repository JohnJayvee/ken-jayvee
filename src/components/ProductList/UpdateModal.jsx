import { useContext } from "react";
import UserProgressContext from "../../store/UserProgressContext";
import Modal from "../UI/Modal";

const UpdateModal = () => {
  const userProgressCtx = useContext(UserProgressContext);
  return (
    <>
      <Modal
        className="modal"
        open={userProgressCtx.progress === "order"}
        onClose={userProgressCtx.progress === "order" ? handleCloseCart : null}
      >
        <div className="form">
          <h2>Update Form</h2>
        </div>
      </Modal>
    </>
  );
};

export default UpdateModal;
