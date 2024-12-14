import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
import axios from "axios";
import { Link } from "react-router-dom";

const InvoiceForm = () => {
  const [form, setForm] = useState({
    invoiceDate: "",
    itemDescription: "",
    itemRate: "",
    itemQuantity: "",
    itemDiscount: "",
    itemNetAmount: "",
    cashAmount: "",
    cardamount: "",
    creditamount: "",
  });

  const [totalForm, setTotalForm] = useState({
    totalAmount: "0",
    totalDiscount: "0",
    totalNetAmount: "0",
    totalCashAmount: "0",
    totalCardAmount: "0",
    totalCredid: "0",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    let newForm = { ...form, [name]: value };
    if (name === "itemRate" || name === "itemQuantity") {
      const itemRate =
        name === "itemRate" ? parseFloat(value) : parseFloat(form.itemRate);
      const itemQuantity =
        name === "itemQuantity"
          ? parseFloat(value)
          : parseFloat(form.itemQuantity);
      const itemDiscount = (itemRate * itemQuantity * 10) / 100;
      const itemNetAmount = itemRate * itemQuantity - itemDiscount;
      newForm = {
        ...newForm,
        itemDiscount: itemDiscount.toFixed(2),
        itemNetAmount: itemNetAmount.toFixed(2),
      };
    }
    setForm(newForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { ...form };
    console.log("Form submitted:", form);
    axios.post("http://localhost:8003/Invoice", newUser).then((res) => {
      console.log("Form submitted successfully:", res.data);
      alert("Form Submitted Successfully..");
    });
  };
  //total amounts calculate
  const totalAmountCalc = (e) => {
    e.preventDefault();
    const newUser = { ...totalForm };
    console.log("Form submitted:", totalForm);
    axios
      .get("http://localhost:8003/Invoice")
      .then((res) => {
        console.log("Form submittedcvc:", res.data);
      })
      .catch((err) => console.log("err"));
  };

  return (
    <section className="vh-100">
      <div className="container h-80">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
              Invoice Form
            </p>

            <form
              onSubmit={handleSubmit}
              className=" mx-1 mx-md-4 border p-5 bg-secondary"
            >
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Invoice Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="invoiceDate"
                    value={form.invoiceDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Item Description</label>
                  <input
                    type="text"
                    className="form-control"
                    name="itemDescription"
                    value={form.itemDescription}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Item Rate</label>
                  <input
                    type="number"
                    className="form-control"
                    name="itemRate"
                    value={form.itemRate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Item Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    name="itemQuantity"
                    value={form.itemQuantity}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Item Discount Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    name="itemDiscount"
                    value={form.itemDiscount}
                    readOnly
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Item Net Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    name="itemNetAmount"
                    value={form.itemNetAmount}
                    readOnly
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label className="form-label">Cash Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    name="cashAmount"
                    value={form.cashAmount}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Card Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    name="cardamount"
                    value={form.cardamount}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Credit Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    name="creditamount"
                    value={form.creditamount}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center mx-4   mb-3 mb-lg-4">
                <button type="submit" className="btn btn-primary m-1 btn-lg">
                  Submit
                </button>
                <Link
                  className="btn btn-primary m-1 btn-lg"
                  to="/InvoiceElement"
                >
                  Preview
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvoiceForm;
