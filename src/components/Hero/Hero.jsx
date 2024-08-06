import Button from "../UI/Button";
import Hero1 from "./hero1.png";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container-fluid ">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <img src={Hero1} alt="Hero Image" className="img-fluid" />
        </div>
        <div className="col-lg-6">
          <div className="ms-3">
            <h1 className="display-3 fw-bold text-body-emphasis">
              What you have here?
            </h1>
            <p className="lead">Buy Your Fur Babys' Its Favorites </p>
            <div className="d-sm-flex">
              <Link to="/shop">
                <Button type="button" className="btn-dark btn-lg px-4">
                  See Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
