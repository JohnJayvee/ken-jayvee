import { Link } from "react-router-dom";
import "./Footer.css";
import logoIcon from "./logo-transparent.png";

export default function Footer() {
  return (
    <footer className="container custom-footer py-3 position-relative overflow-hidden pb-0 pt-6 pt-lg-8">
      <div className="d-flex  align-items-center py-3 border-top">
        <p className="col-md-4 mb-0 text-body-secondary">
          © 2024 Kodego Students, Ken & Jayvee
        </p>

        <a
          href="/"
          className="col-md-4 d-flex  justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <img src={logoIcon} alt="" style={{ height: "4rem" }} />
        </a>

        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item">
            <Link to="/home" className="nav-link px-2 text-body-secondary">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/shop" className="nav-link px-2 text-body-secondary">
              Shop
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/aboutUs" className="nav-link px-2 text-body-secondary">
              About
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
