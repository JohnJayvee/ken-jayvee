import Modal from "../UI/Modal";
import UserProgressContext from "../../store/UserProgressContext";
import Button from "../UI/Button";
import { useContext } from "react";
import Input from "../UI/InputBlock";

export default function FeedbackForm() {
  const userProgressCtx = useContext(UserProgressContext);
  function handleCloseFeedback() {
    userProgressCtx.hideFeedback();
  }

  return (
    <Modal
      className="feedback"
      open={userProgressCtx.progress === "feedback"}
      onClose={userProgressCtx.progress === "cart" ? handleCloseFeedback : null}
    >
      <form>
        <Input type="hidden" label="Feedback" />
        <textarea name="feedback" id="feedback" rows={4} cols={60} />
        <ul className="checkout-button ">
          <Button
            className="btn-outline-danger"
            type="button"
            onClick={() => userProgressCtx.hideFeedback()}
          >
            Close
          </Button>
          <Button className="btn-dark mx-3" type="submit">
            Submit
          </Button>
        </ul>
      </form>
    </Modal>
  );
}
