import { createContext, useState } from "react";

const UserProgressContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
  showFeedback: () => {},
  hideFeedback: () => {},
  showUpdateOrder: () => {},
  hideUpdateOrder: () => {},
  orderData: null, // state for order data
  setOrderData: () => {}, // method to set order data
});

export function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");
  const [orderData, setOrderData] = useState(null);

  function showCart() {
    setUserProgress("cart");
  }

  function hideCart() {
    setUserProgress("");
  }

  function showCheckout() {
    setUserProgress("checkout");
  }
  function hideCheckout() {
    setUserProgress("");
  }
  function showFeedback() {
    setUserProgress("feedback");
  }
  function hideFeedback() {
    setUserProgress("");
  }
  function showUpdateOrder() {
    setUserProgress("updateOrder");
  }
  function hideUpdateOrder() {
    setUserProgress("");
  }

  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
    showFeedback,
    hideFeedback,
    showUpdateOrder,
    hideUpdateOrder,
    orderData,
    setOrderData, //order state
  };
  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}
export default UserProgressContext;
