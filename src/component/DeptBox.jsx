import React from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

const DeptBox = ({ deptName, details }) => {
  return (
    <div className="border p-4">
      <h1>{deptName}</h1>
      <p>{details}</p>
      <Link to="dental">
        <i>
          <FaLongArrowAltRight
            className="text-info"
            style={{ fontSize: "40px", color: "blue" }}
          />
        </i>
      </Link>
    </div>
  );
};

export default DeptBox;
