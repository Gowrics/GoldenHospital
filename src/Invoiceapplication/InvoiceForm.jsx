import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const InvoiceForm = ({ addInvoice }) => {
  const [form, setForm] = useState({
    itemDescription: "",
    itemRate: "",
    itemQuantity: "",
    itemDiscount: "",
    itemNetAmount: "",
  });

  // Ensure calculations happen immediately when form state changes
  useEffect(() => {
    const calculateAmounts = () => {
      const itemRate = parseFloat(form.itemRate) || 0;
      const itemQuantity = parseInt(form.itemQuantity) || 0;
      const itemDiscount = (itemRate * itemQuantity * 10) / 100;
      const itemNetAmount = itemRate * itemQuantity - itemDiscount;

      setForm((prevForm) => ({
        ...prevForm,
        itemDiscount: itemDiscount.toFixed(2),
        itemNetAmount: itemNetAmount.toFixed(2),
      }));
    };

    calculateAmounts();
  }, [form.itemRate, form.itemQuantity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addInvoice(form);
    setForm({
      itemDescription: "",
      itemRate: "",
      itemQuantity: "",
      itemDiscount: "",
      itemNetAmount: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="itemDescription" className="form-label">
          Item Description
        </label>
        <input
          type="text"
          className="form-control"
          id="itemDescription"
          name="itemDescription"
          value={form.itemDescription}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="itemRate" className="form-label">
          Item Rate
        </label>
        <input
          type="number"
          className="form-control"
          id="itemRate"
          name="itemRate"
          value={form.itemRate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="itemQuantity" className="form-label">
          Item Quantity
        </label>
        <input
          type="number"
          className="form-control"
          id="itemQuantity"
          name="itemQuantity"
          value={form.itemQuantity}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="itemDiscount" className="form-label">
          Item Discount
        </label>
        <input
          type="number"
          className="form-control"
          id="itemDiscount"
          name="itemDiscount"
          value={form.itemDiscount}
          readOnly
        />
      </div>
      <div className="mb-3">
        <label htmlFor="itemNetAmount" className="form-label">
          Item Net Amount
        </label>
        <input
          type="number"
          className="form-control"
          id="itemNetAmount"
          name="itemNetAmount"
          value={form.itemNetAmount}
          readOnly
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Invoice
      </button>
      <Link to="/invoice-bill" className="btn btn-primary">
        Bill Generate
      </Link>
    </form>
  );
};

export default InvoiceForm;
