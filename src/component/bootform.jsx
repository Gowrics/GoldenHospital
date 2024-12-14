import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SimpleForm = ({ form, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="simple-form mx-1 mx-md-4">
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="date"
            className="form-control"
            name="invoiceDate"
            value={form.invoiceDate}
            onChange={handleChange}
            placeholder="Invoice Date"
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            name="itemDescription"
            value={form.itemDescription}
            onChange={handleChange}
            placeholder="Item Description"
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="number"
            className="form-control"
            name="itemRate"
            value={form.itemRate}
            onChange={handleChange}
            placeholder="Item Rate"
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="number"
            className="form-control"
            name="itemQuantity"
            value={form.itemQuantity}
            onChange={handleChange}
            placeholder="Item Quantity"
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="number"
            className="form-control"
            name="itemDiscount"
            value={form.itemDiscount}
            placeholder="Item Discount"
            readOnly
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="number"
            className="form-control"
            name="itemNetAmount"
            value={form.itemNetAmount}
            placeholder="Item Net Amount"
            readOnly
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            name="cashAmount"
            value={form.cashAmount}
            onChange={handleChange}
            placeholder="Cash Amount"
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            name="cardamount"
            value={form.cardamount}
            onChange={handleChange}
            placeholder="Card Amount"
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            name="creditamount"
            value={form.creditamount}
            onChange={handleChange}
            placeholder="Credit Amount"
            required
          />
        </div>
      </div>
      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
        <button type="submit" className="btn btn-primary btn-lg">
          Submit
        </button>
      </div>
    </form>
  );
};

export default SimpleForm;
