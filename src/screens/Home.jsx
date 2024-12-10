import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import FormComponent from "../component/FormComponent";

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="container-fluid">
        <div className="container-fluid profile">
          <center>
            {" "}
            <h1> Golden Hospital</h1>
          </center>
        </div>
        <div>
          <center>
            <h2 className="bg-info"> Departmental Services</h2>
            <div className="row p-5 justify-content-center">
              <div className="col-sm-4 me-5 border">
                <h1 className="p-5">Dental Care</h1>
                <p>
                  We have more doctors for your dental illness. We are here for
                  your better treatment
                </p>
                <Link to="dental">
                  {" "}
                  {/* Note: Adjusted to "dental" */}
                  <i>
                    <FaLongArrowAltRight
                      className="text-info"
                      style={{ fontSize: "40px", color: "blue" }}
                    />
                  </i>
                </Link>
              </div>
              <div className="col-sm-4 me-5 border">
                <h1 className="p-5">Dermotology Care</h1>
                <p>
                  We have more doctors for your dermatology issues. We are here
                  for your better treatment
                </p>
                <Link to="dental">
                  {/* Note: Adjusted to "dermotology" */}
                  <i>
                    <FaLongArrowAltRight
                      className="text-info"
                      style={{ fontSize: "40px", color: "blue" }}
                    />
                  </i>
                </Link>
              </div>
            </div>
          </center>
          <Outlet /> {/* Render nested routes here */}
        </div>
      </div>
    </div>
  );
};

export default Home;
