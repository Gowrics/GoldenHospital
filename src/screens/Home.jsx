import React from "react";
import { Link, Outlet } from "react-router-dom";
import DeptBox from "../component/DeptBox";
import ArrayData from "../ArrayData"; // Ensure this import is correct
import InvoiceElement from "../component/InvoiceElement";
import SimpleForm from "../component/bootform";

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="container-fluid">
        <div className="container-fluid profile">
          <center>
            <h1>Golden Hospital</h1>
          </center>
        </div>
        <div>
          <center>
            <h2>Departmental Services</h2>
            <div className="container">
              <div className="row">
                {ArrayData.map((dept, index) => (
                  <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                    <DeptBox
                      deptName={dept.deptName}
                      details={dept.deptDetails}
                    />
                  </div>
                ))}
              </div>
            </div>
          </center>
          <Outlet /> {/* Render nested routes here */}
        </div>
      </div>

      <InvoiceElement />
    </div>
  );
};

export default Home;
