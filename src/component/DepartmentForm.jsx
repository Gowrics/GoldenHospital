import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { validateForm } from "./validateForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DepartmentForm = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    id: "",
    categoryName: "",
  });
  const [errors, setErrors] = useState({
    id: "",
    categoryName: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8003/Departments")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching departments:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    const error = validateForm(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const idError = validateForm("id", form.id);
    const categoryNameError = validateForm("categoryName", form.categoryName);

    if (!idError && !categoryNameError) {
      const newDepartment = { ...form };
      axios
        .post("http://192.168.91.201:8081/department/create", newDepartment)
        .then(() => {
          console.log("Department added successfully:", newDepartment);
          navigate("/departmentlist");
        })
        .catch((err) => console.error("Error adding department:", err));
      setForm({
        id: "",
        categoryName: "",
      });
      setErrors({
        id: "",
        categoryName: "",
      });
    } else {
      setErrors({
        id: idError,
        categoryName: categoryNameError,
      });
      console.log("Form has errors:", errors);
    }
  };

  return (
    <div className="container formimag mt-5">
      <form className="p-5 DocterForm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="id" className="form-label">
            Department ID
          </label>
          <input
            type="number"
            className={`form-control ${errors.id ? "is-invalid" : ""}`}
            id="id"
            name="id"
            value={form.id}
            onChange={handleChange}
          />
          {errors.id && <div className="invalid-feedback">{errors.id}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="categoryName" className="form-label">
            Department Name
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.categoryName ? "is-invalid" : ""
            }`}
            id="categoryName"
            name="categoryName"
            value={form.categoryName}
            onChange={handleChange}
          />
          {errors.categoryName && (
            <div className="invalid-feedback">{errors.categoryName}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DepartmentForm;
