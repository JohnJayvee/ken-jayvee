import carouselImg1 from "./1.png";
import carouselImg2 from "./2.png";
import carouselImg3 from "./3.png";
import { Link } from "react-router-dom";

export default function CarouselOne() {
  return (
    <section className="container mb-5" id="CarouselOne">
      <div
        id="myCarousel"
        className="carousel slide mb-6"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="0"
            className=""
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
            className="active"
            aria-current="true"
          ></button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
            className=""
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item">
            <img
              src={carouselImg2}
              className="img-fluid d-block h-25"
              alt="..."
            />
            <div className="container">
              <div className="carousel-caption text-start">
                <h1>Pawsitive Healthy Foods</h1>
                <p className="opacity-75">
                  Advanced Care for Your Furry Family Members
                </p>
                {/* <p><Link className="btn btn-lg btn-dark" to="/service">Book Now</Link></p> */}
              </div>
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src={carouselImg1}
              className="img-fluid d-block h-25"
              alt="..."
            />
            <div className="container">
              <div className="carousel-caption">
                <h1>Pawsitively Perfect Treats</h1>
                <p>Treating Pets’ as a Family</p>
                {/* <p><Link className="btn btn-lg btn-dark" to="/service">Book Now</Link></p> */}
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={carouselImg3}
              className="img-fluid d-block h-25"
              alt="..."
            />{" "}
            <div className="container">
              <div className="carousel-caption text-end">
                <h1 className="text-light">
                  {" "}
                  Find What is Best for your Furbabies
                </h1>
                <p className="text-light">
                  Loving Owners, Enriching Pets’ Lives
                </p>
                {/* <p><Link className="btn btn-lg btn-dark" to="/service">Book Now</Link></p> */}
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
}
