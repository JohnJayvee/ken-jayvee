import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Button from "../components/UI/Button";
import Input from "../components/UI/InputBlock";
import { Link } from "react-router-dom";
import logoSVG from './logo-transparent.png';
import { useState, useEffect } from "react";
import axios from 'axios'; 
import { faCode, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      login: '',
      password: '',
      rememberMe: false,
      showPassword: false
    });
    const [loginError, setLoginError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  
    useEffect(() => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
        navigate('/home', { replace: true }); // Redirect to dashboard if token exists
      }
    }, [navigate]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoginError('');
      setPasswordError('');
      setGeneralError('');
  
      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/api/login/',
          formData,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`,
            },
          }
        );
  
        console.log('Login successful', response);
  
        if (response.data.token) {
          // Store token based on rememberMe flag
          if (formData.rememberMe) {
            localStorage.setItem('token', response.data.token);
          } else {
            sessionStorage.setItem('token', response.data.token);
          }
          setIsLoggedIn(true); // Update login status
          navigate('/home', { replace: true }); // Redirect to home page
        }
      } catch (error) {
        console.error('Login error', error);
        console.log(error.response);
  
        if (error.response) {
          const errors = error.response.data.errors;
          if (errors) {
            if (errors.email) {
              setLoginError(errors.email[0]);
            }
            if (errors.password) {
              setPasswordError(errors.password[0]);
            }
          } else { 
            setGeneralError(error.response.data.message || 'Something went wrong. Please try again.');
          }
        } else {
          setGeneralError('Network error. Please try again later.');
        }
      }
    };
  
    //! Redirect to home if already logged in
    if (isLoggedIn) {
      return null; // Or any loading indicator while redirecting
    }
  
    
    return (
      <>
       <Header />
    
      <div className='row bg-dark text-white py-5'> 
      <div className="col-md-4 d-flex align-items-md-center justify-content-md-center justify-content-sm-center">
       <p className="h2 " >
              Log In
            </p>
            </div>
        <div className="col-md-4">
        <div className="">
         {generalError && <p className='text-danger bs-danger'>{generalError}</p>}
         </div>
          <div className='d-flex justify-content-end'>
            
         
        
            
           
            <form className='row' onSubmit={handleSubmit}>
          
              <div className="col-md">
                <Input
                  id='email'
                  name='login'
                  autoComplete='email'
                  value={formData.login}
                  onChange={(e) => setFormData({ ...formData, login: e.target.value })}
                  label='Username or Email' />
                       {loginError && <p className=' text-sm '>{loginError}</p>}
              </div>
             
         
              <div className="row">
              <div className="col-md-9">
                  <Input
                    id='password'
                    name='password'
                    type={formData.showPassword ? 'text' : 'password'}
                    autoComplete='current-password'
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    label='Password'
                  />  
                  </div>
                 
                <div className="col-md-auto d-flex align-items-md-center pt-5">
                <span
                  onClick={() => setFormData({ ...formData, showPassword: !formData.showPassword })}
                >
                  {formData.showPassword ? <FontAwesomeIcon icon={faEyeSlash} className='btn btn-outline-light fa-l' /> : <FontAwesomeIcon icon={faEye} className='btn btn-outline-light fa-l' />} 
                </span>
                </div>
                </div>
               
                 
                  <div className="row justify-content-md-start">
                {passwordError && <p className='text-danger'>{passwordError}</p>}
             
              <div className='col-md-auto'>
               
                  <input
                  
                    id='remember-me'
                    name='rememberMe'
                    type='checkbox'
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                    className="m-1"
                  />
                  <label htmlFor="remember-me"> Remember me</label>
                </div>
                </div>
                <div className='text-sm'>
                <p className="">New to Pawgo Shop? <Link className="text-danger link-underline-dark" to='/register'>Sign Up</Link> </p>
                  {/* <a href='#' className=''>
                    Forgot your password?
                  </a> */}
                </div>
              <div className="row col-md-11  ">
                <Button className='btn-warning'>Login</Button>
              </div>
            </form>
            
            </div>
            </div>
            <div className="col col-md-4 d-flex justify-content-md-start justify-content-sm-center align-items-md-center">
         <img src={logoSVG} style={{height:"15rem"}} alt="logo"/> 
         {/* <h2 className="d-flex align-items-center">PAWGO SHOP</h2> */}
         </div>
      
          </div>
          <Footer className='stick-bottom'/>
      </>
    );
  };

  // ken code
//     function handleSubmit(event){
//         event.preventDefault();

//         // buil-in feature browser offer FormData onject
//         const fd = new FormData(event.target);
//         const customerData = Object.fromEntries(fd.entries()); // passing form data ENTRIES will RETURN then an object { email: test@example.com } a key : value pairs 
//         // also extract entered by the user into object e.g {full-name : 'ken mark amandoron'}
//     }
//     return(
//         <>
//         <Header />
//         <div className="form-signup bg-dark">
//             <div className="container row mx-auto">
       
//         <form className="col col-md-6 py-5 text-light " onSubmit={handleSubmit}>
//             <p className="h2 text-light">Log In</p>
        
//             <Input type="email" name='login' id='email'  label='Email or Username'/> 
//             <Input type="password" name='password' id='password'  label='Password'/> 
        
//         <div className="d-grid col-md-6">
//             <Button className="btn-warning" type="submit"> Login </Button>
//             </div>
//             <p className="">New to Pawgo Shop? <Link className="text-danger link-underline-dark" to='/register'>Sign Up</Link> </p>
  

        
//         </form>
//         <div className="col col-md-6 d-flex justify-content-center">
//         <img src={logoSVG} style={{height:"20rem"}} />
//         </div>
//         </div>
//         </div>
//         <Footer />
//         </>
//     )
// }