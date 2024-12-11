import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const InvoiceList = () => {
  const [invoice, setInvoice] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8003/Invoice")
      .then((res) => {
        setInvoice(res.data);
      })
      .catch((err) => console.log("err"));
  }, []);

  return (
    <div className="container">
      <h2>Invoice Details</h2>
      <div className="row">
        <div className="col-sm-9">
          <input
            type="text"
            placeholder="search by date,id"
            className="form-control w-50"
            // onChange={handleSearchChange}
          />
        </div>
        <div className="col">
          <Link className="btn btn-primary" to="/invoice">
            Add
          </Link>
        </div>
      </div>
      <table className="table mt-5 border table-striped">
        <thead>
          <tr>
            <th scope="col">Invoice Date</th>
            <th scope="col">Item Description</th>
            <th scope="col">Item Rate Amount</th>
            <th scope="col">Item Quantity</th>
            <th scope="col">Item Discount</th>
            <th scope="col"> Item Net Amount</th>
            <th scope="col"> Cash Amount</th>
            <th scope="col"> Card Amount</th>
            <th scope="col"> Credit Amount</th>
            <th scope="col"> Action</th>
          </tr>
        </thead>
        <tbody>
          {invoice.map((item) => (
            <tr key={item.id} className="justify-content-center">
              <td className="text-center align-middle">{item.invoiceDate}</td>
              <td className="text-center align-middle">
                {item.itemDescription}
              </td>
              <td className="text-center align-middle">{item.itemRate}</td>
              <td className="text-center align-middle">{item.itemQuantity}</td>
              <td className="text-center align-middle">{item.itemDiscount}</td>
              <td className="text-center align-middle">{item.itemNetAmount}</td>
              <td className="text-center align-middle">{item.cashAmount}</td>
              <td className="text-center align-middle">{item.cardamount}</td>
              <td className="text-center align-middle">{item.creditamount}</td>
              <td>
                <Link className="btn btn-primary">Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;
