import React from "react";
import { useEffect, useState } from "react";
import DateObject from "react-date-object";
import axios from "axios";
import { Link } from "react-router-dom";
var date = new DateObject();
const BillGenerate = () => {
  // Table fetch details
  const [invoice, setInvoice] = useState([]);
  const [payment, setPayment] = useState([]);
  useEffect(() => {
    fetchInvoices();
    fetchPayment();
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const fetchInvoices = () => {
    axios
      .get("http://localhost:8003/Invoice")
      .then((res) => {
        setInvoice(res.data);
      })
      .catch((err) => console.log("err"));
  };
  //   const fetchPayment = () => {
  //     axios
  //       .get("http://localhost:8003/Payment")
  //       .then((res) => {
  //         setPayment(res.data);
  //       })
  //       .catch((err) => console.log("err"));
  //   };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Would you like to delete..?");
    if (confirmDelete) {
      console.log("Attempting to delete the user ", id);
      axios
        .delete(`http://localhost:8003/Invoice/${id}`)
        .then((res) => {
          console.log("deleted :", res.data);

          const newData = invoice.filter((item) => item.id !== id);
          setInvoice(newData);
        })
        .catch((err) => console.error("error deleting error", err));
    }
  };

  // Form fetch details
  const [form, setForm] = useState({
    // invoiceDate: "",
    // itemDescription: "",
    // itemRate: "",
    // itemQuantity: "",
    // itemDiscount: "",
    // itemNetAmount: "",
    cashAmount: "",
    cardamount: "",
    creditamount: "",
    totalCashAmount: 0,
    totalCardAmount: 0,
    totalCredid: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newForm = { ...form, [name]: value };

    setForm(newForm);
  };

  const handleSubmitpay = (e) => {
    e.preventDefault();

    // Calculate the new item net amount
    // const itemNetAmount = parseFloat(form.itemNetAmount);
    // const itemDiscount = parseFloat(form.itemDiscount);

    const cashAmount = parseFloat(form.cashAmount);
    const cardamount = parseFloat(form.cardamount);
    const creditamount = parseFloat(form.creditamount);

    // Fetch the current total amount from the server
    axios
      .get("http://localhost:8003/paymentDetails")
      .then((res) => {
        const currentInvoices = res.data;

        // Get the latest invoice's total amount if exists
        const lastInvoice =
          currentInvoices.length > 0
            ? currentInvoices[currentInvoices.length - 1]
            : {};

        // Ensure default values if fields are missing
        // const currentTotalAmount = parseFloat(lastInvoice.totalAmount) || 0;
        // const currentDisAmount = parseFloat(lastInvoice.totalDiscount) || 0;
        // const currentNetAmount = parseFloat(lastInvoice.totalNetAmount) || 0;

        const currentCashAmount = parseFloat(lastInvoice.totalCashAmount) || 0;
        const currentCardAmount = parseFloat(lastInvoice.totalCardAmount) || 0;
        const currentCreditAmount = parseFloat(lastInvoice.totalCredid) || 0;

        // Calculate the new total amounts
        // const newTotalAmount = currentTotalAmount + itemNetAmount;
        // const newDisAmount = currentDisAmount + itemDiscount;
        // const newNetAmount = currentNetAmount + itemNetAmount;

        const newCashAmount = currentCashAmount + cashAmount;
        const newCardAmount = currentCardAmount + cardamount;
        const newCreditAmount = currentCreditAmount + creditamount;

        // Create the newUser object with the updated total amounts
        const newUser = {
          ...form,
          //   totalAmount: newTotalAmount.toFixed(2),
          //   totalDiscount: newDisAmount.toFixed(2),
          //   totalNetAmount: newNetAmount.toFixed(2),

          totalCashAmount: newCashAmount.toFixed(2),
          totalCardAmount: newCardAmount.toFixed(2),
          totalCredid: newCreditAmount.toFixed(2),
        };

        axios
          .post("http://localhost:8003/paymentDetails", newUser)
          .then((res) => {
            console.log("Form submitted successfully:", newUser);
            alert("Form Submitted Successfully.");
            fetchInvoices(); // Fetch the updated invoice list after submission
            fetchPayment();
            // Clear the form
            setForm({
              //   itemDescription: "",
              //   itemRate: "",
              //   itemQuantity: "",
              //   itemDiscount: "",
              //   itemNetAmount: "",
              cashAmount: "",
              cardamount: "",
              creditamount: "",
            });
          })
          .catch((err) => {
            console.error("Error submitting form:", err);
            alert("Form submission failed. Please try again.");
          });
      })
      .catch((err) => {
        console.error("Error fetching current invoices:", err);
      });
  };
  const fetchPayment = () => {
    axios
      .get("http://localhost:8003/Payment")
      .then((res) => {
        setPayment(res.data);
      })
      .catch((err) => console.log("err"));
  };

  return (
    <div>
      <div className="invoice">
        <div className="headersec">
          <div className="head">
            <h1>Invoice</h1>
            <p>Logo Consulting Pvt Ltd</p>
          </div>
          <hr />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              backgroundColor: "gray",
            }}
          >
            <h4>
              Invoice No: {invoice.reduce((acc, inv) => parseFloat(inv.id), 0)}
            </h4>
            <h4>Date: {formatDate(new Date())}</h4>
          </div>
          <div className="details">
            <div>
              <h6>
                Total amount:
                {invoice
                  .reduce((acc, inv) => parseFloat(inv.totalAmount), 0)
                  .toFixed(2)}
              </h6>
              <h6>
                Total Discount:
                {invoice
                  .reduce((acc, inv) => parseFloat(inv.totalDiscount), 0)
                  .toFixed(2)}
              </h6>
              <h6>
                Total Net amount:{" "}
                {invoice
                  .reduce((acc, inv) => parseFloat(inv.totalNetAmount), 0)
                  .toFixed(2)}
              </h6>
            </div>
            <div>
              <h6>
                Total Cash amount:
                {payment
                  .reduce((acc, inv) => parseFloat(inv.cashAmount), 0)
                  .toFixed(2)}
              </h6>
              <h6>
                Total Card amount:
                {payment
                  .reduce((acc, inv) => parseFloat(inv.cardamount), 0)
                  .toFixed(2)}
              </h6>
              <h6>
                Total Credit amount:
                {payment
                  .reduce((acc, inv) => parseFloat(inv.creditamount), 0)
                  .toFixed(2)}
              </h6>
            </div>
          </div>
        </div>
        {/* Head section end */}
        <div className="table-responsive">
          <table className="table mt-5 border table-striped">
            <thead>
              <tr>
                <th scope="col">Item Description</th>
                <th scope="col">Item Rate Amount</th>
                <th scope="col">Item Quantity</th>
                <th scope="col">Item Discount</th>
                <th scope="col">Item Net Amount</th>
                {/* <th scope="col">Cash Amount</th>
                <th scope="col">Card Amount</th>
                <th scope="col">Credit Amount</th> */}
              </tr>
            </thead>
            <tbody>
              {invoice.map((item) => (
                <tr key={item.id} className="justify-content-center">
                  <td className="text-center align-middle">
                    {item.itemDescription}
                  </td>
                  <td className="text-center align-middle">{item.itemRate}</td>
                  <td className="text-center align-middle">
                    {item.itemQuantity}
                  </td>
                  <td className="text-center align-middle">
                    {item.itemDiscount}
                  </td>
                  <td className="text-center align-middle">
                    {item.itemNetAmount}
                  </td>
                  {/* <td className="text-center align-middle">
                    {item.cashAmount}
                  </td>
                  <td className="text-center align-middle">
                    {item.cardamount}
                  </td>
                  <td className="text-center align-middle">
                    {item.creditamount}
                  </td> */}
                  <td>
                    <button
                      type="delete"
                      className="btn btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="invoiceform">
          {/* Form section */}
          <form onSubmit={handleSubmitpay} className="mx-1 mx-md-4">
            <div className="row">
              <div className="col m-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Cash Amount"
                  name="cashAmount"
                  value={form.cashAmount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col m-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Card Amount"
                  name="cardamount"
                  value={form.cardamount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col m-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Credit Amount"
                  name="creditamount"
                  value={form.creditamount}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="btn-group">
              <button type="submit" className="btn m-1 btn-primary">
                Add Item
              </button>
              <button
                className="btn m-2 btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#editForm"
              >
                Preview
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BillGenerate;
