import logoSVG from "./logo-transparent.png";
import cartIcon from "./Untitled_design-removebg-preview.png";
import "./Header.css";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import { useContext } from "react";
import CartContext from "../../store/CartContext";
import UserProgressContext from "../../store/UserProgressContext";
import myOrderIcon from "./place-holder.png";
import ProfileImage from "./ProfileImage";
import useAuth from "../auth";

function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalItems, item) => {
    return totalItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  const isLoggedIn = useAuth(true); // Pass true to skip redirection

  return (
    <header className="navbar navbar-expand-md custom-navbar border-bottom">
      <div className="container-fluid p-0">
        <div className="col col-md-2 col-sm row d-flex justify-content-sm-between">
          <div className="col-md-10 col-sm-6 col-6">
            <Link
              to="/"
              className="d-flex link-body-emphasis text-decoration-none "
            >
              <img src={logoSVG} style={{ height: "3rem" }} />
              <p className="h2 text-warning-emphasis">PawGo</p>
            </Link>
          </div>
          <div className="col-sm-6 col-6 d-flex justify-content-end">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-expanded="false"
            >
              <span className="navbar-toggler-icon "></span>
            </button>
          </div>
        </div>

        <div className="col-lg-6 ">
          <div className="navbar-collapse collapse" id="navbarCollapse">
            <ul className="navbar-nav col-3 col-md-6 mb-2 mb-md-0 me-3 custom-navbar-nav  ">
              <li>
                <Link to="/home" className="nav-link px-2 ">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="nav-link px-2">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/aboutUs" className="nav-link px-2">
                  About
                </Link>
              </li>
              <Button
                className="btn btn-light dropdown-toggle text-start"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Feedback
              </Button>
              <div className="dropdown">
                <ul className="dropdown-menu ">
                  <li>
                    <Link to="/feedback" className="dropdown-item">
                      Give Feedback
                    </Link>
                  </li>
                  <li>
                    <Link to="/userfeedback" className="dropdown-item">
                      Customer's Feedback
                    </Link>
                  </li>
                </ul>
              </div>
            </ul>
            <div className="col-md-6 row">
              <div className="col-md-6 d-flex align-items-md-center justify-content-center">
                <Button
                  onClick={handleShowCart}
                  className="nav-link px-1 link-secondary"
                >
                  <img src={cartIcon} style={{ height: "2rem" }} />
                  {totalCartItems === 0 ? (
                    <span></span>
                  ) : (
                    <span className="bg-danger rounded-circle text-light p-md-1">
                      {totalCartItems}
                    </span>
                  )}
                </Button>
                <Button className="nav-link px-1 link-secondary position-relative">
                  <Link to="/productList" className="dropdown-item ">
                    <img src={myOrderIcon} style={{ height: "4rem" }} />
                    <span className="position-absolute top-100 start-50 translate-middle badge rounded-pill bg-warning">
                      My Orders
                    </span>
                  </Link>
                </Button>
              </div>
              <ul className="nav col-md-6 col-md-auto mb-2 mb-md-0 me-md-0">
                {!isLoggedIn && (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className="nav-link px-2 link-secondary"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        className="nav-link px-2 link-secondary"
                      >
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
                {isLoggedIn && (
                  <li className="">
                    <ProfileImage />
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
