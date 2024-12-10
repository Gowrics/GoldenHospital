import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { validateForm } from "./validateForm";
import axios from "axios";
import img from "../assets/imgbg.avif";
import { useNavigate } from "react-router-dom";

const DepartmentForm = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    id: "",
    departmentType: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8003/Departments")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log("err"));
  }, []);

  const [errors, setErrors] = useState({
    id: "",
    departmentType: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImg" || name === "signImg") {
      setForm({
        ...form,
        [name]: files[0],
      });
      const error = validateForm(name, files[0]);
      setErrors({ ...errors, [name]: error });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
      const error = validateForm(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const docterIdError = validateForm("docterId", form.docterId);
    const departmentTypeError = validateForm(
      "departmentType",
      form.departmentType
    );

    if (!docterIdError && !departmentTypeError) {
      const newUser = { ...form };
      axios.post("http://localhost:8003/Departments", newUser).then((res) => {
        console.log(res);
        navigate("/departmentlist");
      });
      console.log("Form submitted successfully:", newUser);
      setForm({
        id: "",
        departmentType: "",
      });
      setErrors({
        id: "",
        departmentType: "",
      });
    } else {
      setErrors({
        id: docterIdError,
        departmentType: departmentTypeError,
      });
      console.log("Form has errors:", errors);
    }
  };

  return (
    <div>
      <div className="container formimag mt-5">
        <form className=" p-5 DocterForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="DepartmentId" className="form-label">
              Department Id
            </label>
            <input
              type="number"
              className={`form-control ${errors.docterId ? "is-invalid" : ""}`}
              id="id"
              name="id"
              value={form.id}
              onChange={handleChange}
            />
            {errors.docterName && (
              <div className="invalid-feedback">{errors.docterId}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="departmentName" className="form-label">
              department Name
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.docterName ? "is-invalid" : ""
              }`}
              id="departmentType"
              name="departmentType"
              value={form.departmentType}
              onChange={handleChange}
            />
            {errors.docterId && (
              <div className="invalid-feedback">{errors.docterName}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DepartmentForm;
