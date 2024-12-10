import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DepartmentList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8003/Departments")
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
        docter.departmentType.toLowerCase().includes(query) ||
        docter.id.includes(query)
    );
    setFilteredData(filtered);
  };
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Would you like to delete..?");
    if (confirmDelete) {
      console.log("Attempting to delete the user ", id);
      axios
        .delete(`http://localhost:8003/Departments/${id}`)
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
      <h2>Department List</h2>
      <input
        type="text"
        className="form-control w-50"
        placeholder="search by department id ,name"
        onChange={handleSearchChange}
      />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Department ID</th>
            <th scope="col">Department Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.departmentType}</td>
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

      {/* add docter */}
    </div>
  );
};

export default DepartmentList;
