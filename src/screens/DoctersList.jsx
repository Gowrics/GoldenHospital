import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DoctersList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8003/Docters")
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch((err) => console.log("err"));
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    console.log(searchQuery);
    const filtered = data.filter(
      (docter) =>
        docter.docterName.toLowerCase().includes(query) ||
        docter.docterId.includes(query) ||
        docter.departmentType.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Would you like to delete..?");
    if (confirmDelete) {
      console.log("Attempting to delete the user ", id);
      axios
        .delete(`http://localhost:8003/Docters/${id}`)
        .then((res) => {
          console.log("deleted :", res.data);

          const newData = data.filter((item) => item.id !== id);
          setData(newData);
          setFilteredData(newData);
        })
        .catch((err) => console.error("error deleting error", err));
    }
  };

  return (
    <div className="container mt-5">
      <h2>Docters List</h2>
      <input
        type="text"
        className="form-control w-50"
        placeholder="search by docter name,department,id"
        onChange={handleSearchChange}
      />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Docter ID</th>
            <th scope="col">Docter Name</th>
            <th scope="col">Docter License</th>
            <th scope="col">Department Type</th>
            <th scope="col">Profile Image</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.docterId}</td>
                <td>{item.docterName}</td>
                <td>{item.licenseNum}</td>
                <td>{item.departmentType}</td>
                <td>
                  <img
                    src={item.profileImage}
                    alt={`${item.docterName}'s profile`}
                    width="50"
                  />
                </td>
                <td>
                  <Link className="btn btn-primary" to="/form">
                    Add
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}> No user found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DoctersList;
