import "../assets/styles.css";
import { Outlet, Link } from "react-router-dom";
import logo from "../assets/logo.avif";
import { FaUserDoctor } from "react-icons/fa6";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-info p-3 justify-content-center ">
        <div className="container-fluid">
          <Link className="nav-brand" to="/">
            <FaUserDoctor style={{ fontSize: "50px", color: "blue" }} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav ">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/invoiceelement">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/service">
                  Service
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/docterlist">
                  Docters Blog
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/newinvoice">
                  Invoice
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/invoicelist">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};
export default Navbar;
