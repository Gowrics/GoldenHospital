import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { validateForm } from "./validateForm";
import img from "../assets/imgbg.avif";

const FormComponent = () => {
  const [form, setForm] = useState({
    doctorName: "",
    doctorId: "",
    doctorType: "",
    doctorLicense: "",
    profileImage: null,
    signImage: null,
  });

  const [errors, setErrors] = useState({
    doctorName: "",
    doctorId: "",
    doctorType: "",
    doctorLicense: "",
    profileImage: "",
    signImage: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage" || name === "signImage") {
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
    const doctorNameError = validateForm("doctorName", form.doctorName);
    const doctorIdError = validateForm("doctorId", form.doctorId);
    const doctorTypeError = validateForm("doctorType", form.doctorType);
    const doctorLicenseError = validateForm(
      "doctorLicense",
      form.doctorLicense
    );
    const profileImageError = validateForm("profileImage", form.profileImage);
    const signImageError = validateForm("signImage", form.signImage);

    if (
      !doctorNameError &&
      !doctorIdError &&
      !doctorTypeError &&
      !doctorLicenseError &&
      !profileImageError &&
      !signImageError
    ) {
      console.log("Form submitted successfully:", form);
      setForm({
        doctorName: "",
        doctorId: "",
        doctorType: "",
        doctorLicense: "",
        profileImage: null,
        signImage: null,
      });
      setErrors({
        doctorName: "",
        doctorId: "",
        doctorType: "",
        doctorLicense: "",
        profileImage: "",
        signImage: "",
      });
    } else {
      setErrors({
        doctorName: doctorNameError,
        doctorId: doctorIdError,
        doctorType: doctorTypeError,
        doctorLicense: doctorLicenseError,
        profileImage: profileImageError,
        signImage: signImageError,
      });
      console.log("Form has errors:", errors);
    }
  };

  return (
    <div className="container formimag mt-5">
      <form className=" p-5 DocterForm" onSubmit={handleSubmit}>
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
          <label htmlFor="doctorId" className="form-label">
            Doctor ID
          </label>
          <input
            type="number"
            className={`form-control ${errors.doctorId ? "is-invalid" : ""}`}
            id="doctorId"
            name="doctorId"
            value={form.doctorId}
            onChange={handleChange}
          />
          {errors.doctorId && (
            <div className="invalid-feedback">{errors.doctorId}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="doctorType" className="form-label">
            Department Type
          </label>
          <select
            className={`form-control ${errors.doctorType ? "is-invalid" : ""}`}
            id="doctorType"
            name="doctorType"
            value={form.doctorType}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            <option value="Dental">Dental Department</option>
            <option value="Dermotology">Dermotology Department</option>
          </select>
          {errors.doctorType && (
            <div className="invalid-feedback">{errors.doctorType}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="doctorLicense" className="form-label">
            Doctor License Number
          </label>
          <input
            type="number"
            className={`form-control ${
              errors.doctorLicense ? "is-invalid" : ""
            }`}
            id="doctorLicense"
            name="doctorLicense"
            value={form.doctorLicense}
            onChange={handleChange}
          />
          {errors.doctorLicense && (
            <div className="invalid-feedback">{errors.doctorLicense}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="profileImage" className="form-label">
            Profile Image
          </label>
          <input
            type="file"
            className={`form-control ${
              errors.profileImage ? "is-invalid" : ""
            }`}
            id="profileImage"
            name="profileImage"
            onChange={handleChange}
          />
          {errors.profileImage && (
            <div className="invalid-feedback">{errors.profileImage}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="signImage" className="form-label">
            Sign Image
          </label>
          <input
            type="file"
            className={`form-control ${errors.signImage ? "is-invalid" : ""}`}
            id="signImage"
            name="signImage"
            onChange={handleChange}
          />
          {errors.signImage && (
            <div className="invalid-feedback">{errors.signImage}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <img src="" />
    </div>
  );
};

export default FormComponent;
