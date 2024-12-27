import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import ModalShow from "../component/Modal";

const DoctersList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [editDoctor, setEditDoctor] = useState(null);

  useEffect(() => {
    axios
      // .get("http://192.168.91.201:8081/doctor/getAll")
      .get("http://localhost:8003/Docters")

      .then((res) => {
        console.log(res.data); // Log the response data
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch((err) => console.log("Error fetching data:", err));
  }, []);

  const handleEdit = (id) => {
    axios
      // .get(`http://192.168.91.201:8081/doctor/get/${id}`)
      .get("http://localhost:8003/Docters")

      .then((res) => {
        console.log(res.data); // Log the response data
        setEditDoctor(res.data);
        console.log(editDoctor);
        handleShow(); // Open the modal
      })
      .catch((err) => console.log("Error fetching data:", err));
  };

  const handleSave = () => {
    if (editDoctor) {
      axios
        .put(
          `http://192.168.91.201:8081/doctor/update/${editDoctor.deptCode}`,
          editDoctor
        )
        .then((res) => {
          console.log("Updated doctor:", res.data);
          const updatedData = data.map((item) =>
            item.deptCode === editDoctor.deptCode ? editDoctor : item
          );
          setData(updatedData);
          setFilteredData(updatedData);
          handleClose(); // Close the modal
        })
        .catch((err) => console.error("Error updating doctor:", err));
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = data.filter(
      (doctor) =>
        doctor.doctorName.toLowerCase().includes(query) ||
        doctor.deptCode.toString().includes(query) || // use deptCode instead of doctorId
        doctor.deptType.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };
  const handleDelete = (deptCode) => {
    // Use deptCode instead of id
    const confirmDelete = window.confirm(
      "Would you like to delete this doctor?"
    );
    if (confirmDelete) {
      console.log("Attempting to delete doctor with deptCode:", deptCode);
      axios
        .delete(`http://192.168.91.201:8081/doctor/delete/${deptCode}`)
        .then((res) => {
          console.log("Deleted doctor:", res.data);
          const newData = data.filter((item) => item.deptCode !== deptCode); // Filter by deptCode
          setData(newData);
          setFilteredData(newData);
        })
        .catch((err) => console.error("Error deleting doctor:", err));
    }
  };

  return (
    <div className="container mt-5">
      <h2>Doctors List</h2>
      <input
        type="text"
        className="form-control w-50"
        placeholder="Search by doctor name, department, or ID"
        onChange={handleSearchChange}
      />
      <br />
      <Link className="btn btn-primary" to="/form">
        Add Doctor
      </Link>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">Doctor ID</th>
            <th scope="col">Doctor Name</th>
            <th scope="col">License No</th>
            <th scope="col">Department Type</th>
            <th scope="col">Profile Image</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <tr key={item.deptCode}>
                <td>{item.deptCode}</td>
                <td>{item.doctorName}</td>
                <td>{item.licenseNo}</td>
                <td>{item.deptType}</td>
                <td>
                  {item.imagePath ? (
                    <img
                      src={item.imagePath}
                      alt={item.doctorName}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <p>No Image Available</p>
                  )}
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleEdit(item.deptCode)}
                  >
                    Edit
                  </Button>
                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => handleDelete(item.deptCode)} // Delete by deptCode
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No doctors found</td>
            </tr>
          )}
        </tbody>
      </table>
      <ModalShow
        show={show}
        handleClose={handleClose}
        editDoctor={editDoctor}
        setEditDoctor={setEditDoctor}
        handleSave={handleSave}
      />
    </div>
  );
};

export default DoctersList;
