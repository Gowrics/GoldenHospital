import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { validateForm } from "./validateForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormComponent = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    doctorName: "",
    deptCode: 0,
    deptType: "",
    licenseNo: 0,
    imagePath: "",
    signPath: "",
  });
  const [errors, setErrors] = useState({
    doctorName: "",
    deptCode: "",
    deptType: "",
    licenseNo: "",
    imagePath: "",
    signPath: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://192.168.91.201:8081/department/getAll")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log("Error fetching data:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "imagePath" || name === "signPath") {
      const file = files[0]; // Get the selected file
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        console.log("image url", imageUrl);
        setForm({
          ...form,
          [name]: imageUrl, // Store the file object in the state
        });
      }

      const error = validateForm(name, file);
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

  console.log("imagssde", form.imagePath);
  const handleSubmit = (e) => {
    e.preventDefault();

    const docterNameError = validateForm("doctorName", form.doctorName);
    const deptCodeError = validateForm("docterId", form.deptCode);
    const departmentTypeError = validateForm("deptType", form.deptType);
    const licenseNumError = validateForm("licenseNo", form.licenseNo);
    const profileImgError = validateForm("imagePath", form.imagePath);
    const signImgError = validateForm("signPath", form.signPath);

    const newErrors = {
      doctorName: docterNameError,
      deptCode: deptCodeError,
      deptType: departmentTypeError,
      licenseNo: licenseNumError,
      profileImg: profileImgError,
      signPath: signImgError,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
      const newUser = { ...form };

      axios
        .post("http://192.168.91.201:8081/doctor/create", newUser)
        .then((res) => {
          console.log("Form submitted successfully:", res.data);
          alert("Form Submitted Successfully..");
          navigate("/");
        });
    } else {
      console.log("Form has errors:", newErrors);
    }
  };

  return (
    <div className="container formimag mt-5">
      <form className="p-5 DocterForm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="doctorName" className="form-label">
            Doctor Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.doctorName ? "is-invalid" : ""}`}
            id="doctorName"
            name="doctorName"
            value={form.doctorName}
            onChange={handleChange}
          />
          {errors.doctorName && (
            <div className="invalid-feedback">{errors.doctorName}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="deptCode" className="form-label">
            Depat Code
          </label>
          <input
            type="number"
            className={`form-control ${errors.deptCode ? "is-invalid" : ""}`}
            id="deptCode"
            name="deptCode"
            value={form.deptCode}
            onChange={handleChange}
          />
          {errors.deptCode && (
            <div className="invalid-feedback">{errors.deptCode}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="deptType" className="form-label">
            Department Type
          </label>
          <select
            className={`form-control ${errors.deptType ? "is-invalid" : ""}`}
            id="deptType"
            name="deptType"
            value={form.deptType}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            {data.map((item) => (
              <option key={item.id} value={item.categoryName}>
                {item.categoryName}
              </option>
            ))}
          </select>
          {errors.deptType && (
            <div className="invalid-feedback">{errors.deptType}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="licenseNo" className="form-label">
            Doctor License Number
          </label>
          <input
            type="number"
            className={`form-control ${errors.licenseNo ? "is-invalid" : ""}`}
            id="licenseNo"
            name="licenseNo"
            value={form.licenseNo}
            onChange={handleChange}
          />
          {errors.licenseNo && (
            <div className="invalid-feedback">{errors.licenseNo}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="imagePath" className="form-label">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            className={`form-control ${errors.imagePath ? "is-invalid" : ""}`}
            id="imagePath"
            name="imagePath"
            onChange={handleChange}
          />
          {errors.imagePath && (
            <div className="invalid-feedback">{errors.imagePath}</div>
          )}{" "}
          {form.imagePath && (
            <div>
              <h3>Profile Image Preview:</h3>
              <img
                src={form.imagePath}
                alt="Profile Image Preview"
                style={{ width: "200px", height: "auto" }}
              />
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="signPath" className="form-label">
            Sign Image
          </label>
          <input
            type="file"
            accept="image/*"
            className={`form-control ${errors.signPath ? "is-invalid" : ""}`}
            id="signPath"
            name="signPath"
            onChange={handleChange}
          />
          {errors.signPath && (
            <div className="invalid-feedback">{errors.signPath}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
