import { useContext } from "react";
import Modal from "./UI/Modal";
import Input from "./UI/InputBlock";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Checkout(){
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, item)=>
        totalPrice + item.quantity * item.price
     , 0);

     function handleSubmit(event){
        event.preventDefault();

        // buil-in feature browser offer FormData onject
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries()); // passing form data ENTRIES will RETURN then an object { email: test@example.com } a key : value pairs 
        // also extract entered by the user into object e.g {full-name : 'ken mark amandoron'}

        fetch('localhost/sample/db.php', { // will hit the backend and data can be extracted and stored
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({ // all the data that should be submitted
                order: {
                    items: cartCtx.items,  // the CART DATA that should be submitted
                    customer: customerData // convert USER ENTRIES from form inputs to JSON object 
                }
            })
        });

     }
    return <Modal open={userProgressCtx.progress === 'checkout'}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p className="h2">total Amount{` : ₱${cartTotal}`}</p>

            {/*input fullName OR be set dynamically from user login e.g{user.name}*/}
            <Input label='Full Name' type='text' id='full-name'/> 
           <Input label='Email' type='email' id='email'/>
           <Input label='Address' type='text' id='street'/>
           <div className="control-row">
            <label className="h5 mt-2 ">
      Payment method 
      <select name="payment-method">
        <option value="cash">Cash</option>
        <option value="online payment">Online payment (not available)</option>
      </select>
    </label>
           </div>
           <ul className="checkout-button ">
            <Button className='btn-outline-danger' type='button' onClick={()=>userProgressCtx.hideCheckout()} >
                Close</Button>
            <Button className='btn-dark mx-3' >
                Submit Order</Button>
           </ul>
        </form>
    </Modal>
}