import { createContext, useReducer } from "react";

// Create CartContext with default values
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

// Cart reducer to manage state based on actions
function cartReducer(state, action) {
  if (action.type === "INCREASE_ITEM") {
    // Find index of the existing item in the cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    // Create a new array to avoid direct state mutation
    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      // Item exists, increment its quantity
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      // Update the item in the new array
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // New item, set its quantity to 1
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    // Return updated state
    return { ...state, items: updatedItems };
  }

  if (action.type === "DECREASE_ITEM") {
    // Find index of the existing item in the cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    // Create a new array to avoid direct state mutation
    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      if (existingItem.quantity === 1) {
        // Remove item from the cart if quantity is 1
        updatedItems.splice(existingCartItemIndex, 1);
      } else {
        // Decrement quantity if more than 1
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
        // Update the item in the new array
        updatedItems[existingCartItemIndex] = updatedItem;
      }
    }
    // Return updated state
    return { ...state, items: updatedItems };
  }

  // Return unchanged state if action type does not match
  return state;
}

// CartContextProvider to provide the cart state and functions to children
export function CartContextProvider({ children }) {
  // Use useReducer to manage the cart state
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  // Function to add an item to the cart
  function addItem(item) {
    dispatchCartAction({ type: "INCREASE_ITEM", item });
  }

  // Function to remove an item from the cart
  function removeItem(id) {
    dispatchCartAction({ type: "DECREASE_ITEM", id });
  }

  // Context value containing cart items and functions
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
  };

  // Provide the cart context to children components
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
