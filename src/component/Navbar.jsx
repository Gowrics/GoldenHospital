import "../assets/styles.css";
import { Outlet, Link } from "react-router-dom";
import logo from "../assets/logo.avif";
import { FaUserDoctor } from "react-icons/fa6";
import { useState } from "react";
import Calendar from "react-calendar";

const Navbar = () => {
  const [date, setDate] = useState(new Date());
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
                <Link className="nav-link" to="/">
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
                <Link className="nav-link" to="/">
                  Contact Us
                </Link>
              </li>
            </ul>
            <div style={{ marginLeft: "100px" }}>
              <ul class="navbar-nav d-flex flex-row me-1">
                <li class="nav-item me-3 me-lg-0">
                  <a class="nav-link mx-1 text-white" href="/dbtable">
                    <i class="fas fa-table"></i>
                  </a>
                </li>

                <li class="nav-item me-3 me-lg-0">
                  <a class="nav-link mx-1 text-white" href="/calender">
                    <i className="fas fa-calendar-alt"></i>
                  </a>
                </li>
                <li class="nav-item me-3 me-lg-0">
                  <a class="nav-link mx-1 text-white" href="#">
                    <i class="fas fa-image"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div id="myModal" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  className="btn btn-default"
                  data-bs-dismiss="modal"
                >
                  &times;
                </button>
                <h4 class="modal-title">Modal Header</h4>
              </div>
              <div class="modal-body">
                <Calendar onChange={setDate} value={date} />
                {date.length > 0 ? (
                  <p className="text-center">
                    <span className="bold">Start:</span>{" "}
                    {date[0].toDateString()}
                    &nbsp;|&nbsp;
                    <span className="bold">End:</span> {date[1].toDateString()}
                  </p>
                ) : (
                  <p className="text-center">
                    <span className="bold">Default sdselected date:</span>{" "}
                    {date.toDateString()}
                  </p>
                )}
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};
export default Navbar;
