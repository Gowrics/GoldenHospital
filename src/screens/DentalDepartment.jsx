import React from "react";
import FormComponent from "../component/FormComponent";
import bgimg from "../assets/imgbg.avif";

const DentalDepartment = () => {
  return (
    <div>
      <center>
        <h2 className="bg-info"> Departmental Services</h2>
      </center>
      <div className="row">
        <div className="col p-5">
          <img className="formimg" src={bgimg} />
        </div>
        <div className="col">
          <FormComponent />
        </div>
      </div>
    </div>
  );
};

export default DentalDepartment;
