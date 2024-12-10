import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { validateForm } from "./validateForm";
import axios from "axios";
import img from "../assets/imgbg.avif";
import { useNavigate } from "react-router-dom";

const FormComponent = () => {
  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    docterName: "",
    docterId: "",
    departmentType: "",
    licenseNum: "",
    profileImg: null,
    signImg: null,
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
    docterName: "",
    docterId: "",
    departmentType: "",
    licenseNum: "",
    profileImg: "",
    signImg: "",
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
    const docterNameError = validateForm("docterName", form.docterName);
    const docterIdError = validateForm("docterId", form.docterId);
    const departmentTypeError = validateForm(
      "departmentType",
      form.departmentType
    );
    const licenseNumError = validateForm("licenseNum", form.licenseNum);
    const profileImgError = validateForm("profileImg", form.profileImg);
    const signImgError = validateForm("signImg", form.signImg);

    if (
      !docterNameError &&
      !docterIdError &&
      !departmentTypeError &&
      !licenseNumError &&
      !profileImgError &&
      !signImgError
    ) {
      const newUser = { ...form };
      axios.post("http://localhost:8003/Docters", newUser).then((res) => {
        console.log(res);
        navigate("/");
      });
      console.log("Form submitted successfully:", newUser);
      setForm({
        docterName: "",
        docterId: "",
        departmentType: "",
        licenseNum: "",
        profileImg: null,
        signImg: null,
      });
      setErrors({
        docterName: "",
        docterId: "",
        departmentType: "",
        licenseNum: "",
        profileImg: null,
        signImg: null,
      });
    } else {
      setErrors({
        docterName: docterNameError,
        docterId: docterIdError,
        departmentType: departmentTypeError,
        licenseNum: licenseNumError,
        profileImg: profileImgError,
        signImg: signImgError,
      });
      console.log("Form has errors:", errors);
    }
  };

  return (
    <div className="container formimag mt-5">
      <form className=" p-5 DocterForm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="docterName" className="form-label">
            docter Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.docterName ? "is-invalid" : ""}`}
            id="docterName"
            name="docterName"
            value={form.docterName}
            onChange={handleChange}
          />
          {errors.docterName && (
            <div className="invalid-feedback">{errors.docterName}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="docterId" className="form-label">
            docter ID
          </label>
          <input
            type="number"
            className={`form-control ${errors.docterId ? "is-invalid" : ""}`}
            id="docterId"
            name="docterId"
            value={form.docterId}
            onChange={handleChange}
          />
          {errors.docterId && (
            <div className="invalid-feedback">{errors.docterId}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="departmentType" className="form-label">
            Department Type
          </label>
          <select
            className={`form-control ${
              errors.departmentType ? "is-invalid" : ""
            }`}
            id="departmentType"
            name="departmentType"
            value={form.departmentType}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            {data.map((item) => (
              <option key={item.id} value={item.departmentType}>
                {item.departmentType}
              </option>
            ))}

            {/* <option value="">Select Department</option>
            <option value="Dental">Dental Department</option>
            <option value="Dermotology">Dermotology Department</option> */}
          </select>
          {errors.departmentType && (
            <div className="invalid-feedback">{errors.departmentType}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="licenseNum" className="form-label">
            docter License Number
          </label>
          <input
            type="number"
            className={`form-control ${errors.licenseNum ? "is-invalid" : ""}`}
            id="licenseNum"
            name="licenseNum"
            value={form.licenseNum}
            onChange={handleChange}
          />
          {errors.licenseNum && (
            <div className="invalid-feedback">{errors.licenseNum}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="profileImg" className="form-label">
            Profile Image
          </label>
          <input
            type="file"
            className={`form-control ${errors.profileImg ? "is-invalid" : ""}`}
            id="profileImg"
            name="profileImg"
            onChange={handleChange}
          />
          {errors.profileImg && (
            <div className="invalid-feedback">{errors.profileImg}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="signImg" className="form-label">
            Sign Image
          </label>
          <input
            type="file"
            className={`form-control ${errors.signImg ? "is-invalid" : ""}`}
            id="signImg"
            name="signImg"
            onChange={handleChange}
          />
          {errors.signImg && (
            <div className="invalid-feedback">{errors.signImg}</div>
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
