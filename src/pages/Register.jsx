import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Button from "../components/UI/Button";
import Input from "../components/UI/InputBlock";
import { Link } from "react-router-dom";
import logoSVG from './logo-transparent.png';


export default function Register(){
    function handleSubmit(event){
        event.preventDefault();

        // buil-in feature browser offer FormData onject
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries()); // passing form data ENTRIES will RETURN then an object { email: test@example.com } a key : value pairs 
        // also extract entered by the user into object e.g {full-name : 'ken mark amandoron'}
    }
    return(
        <>
        <Header />
        <div className="form-signup bg-dark">
            <div className="row mx-auto">
            <p className="h2 text-light">Sign up</p>
        <form className="col col-md-6 py-5 text-light " onSubmit={handleSubmit}>
            
        
            <Input type="text" name='first-name' id='first-name'  label='First name'/> 
            <Input type="text" name='last-name' id='last-name'  label='Last name'/> 
            <Input type="text" name='contact-number' id='contact-number'  label='Contact number'/> 
            <Input type="text" name='user-name' id='user-name'  label='Username'/> 
            <Input type="email" name='email' id='email'  label='Email'/> 
            <Input type="password" name='password' id='password'  label='Password'/> 
        
        <div className="d-grid col-md-6">
            <Button className="btn-warning " type="submit"> Register </Button>
            </div>
            <p className="">Have an account? <Link className="text-danger link-underline-dark" to='/login'>Login</Link> </p>
  

        
        </form>
        <div className="col col-md-6">
        <img src={logoSVG} style={{height:"20rem"}} />
        </div>
        </div>
        </div>
        <Footer/> 
        </>
    )
}