import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const InvoiceBill = () => {
  const location = useLocation();
  const { invoices } = location.state || { invoices: [] };

  const [payment, setPayment] = useState({
    cashAmount: "",
    cardAmount: "",
    creditAmount: "",
  });

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const totalNetAmount = invoices
    .reduce((sum, invoice) => sum + parseFloat(invoice.itemNetAmount || 0), 0)
    .toFixed(2);
  const totalDiscount = invoices
    .reduce((sum, invoice) => sum + parseFloat(invoice.itemDiscount || 0), 0)
    .toFixed(2);
  const totalCashAmount = parseFloat(payment.cashAmount || 0).toFixed(2);
  const totalCardAmount = parseFloat(payment.cardAmount || 0).toFixed(2);
  const totalCreditAmount = parseFloat(payment.creditAmount || 0).toFixed(2);

  return (
    <div>
      <h1>Generated Invoice Bill</h1>
      <div className="header">
        <p>Invoice Number: {invoices.length}</p>
        <p>Invoice Date: {formatDate(new Date())}</p>
        <p>Total Net Amount: {totalNetAmount}</p>
        <p>Total Discount Amount: {totalDiscount}</p>
        <p>Total Cash Amount: {totalCashAmount}</p>
        <p>Total Card Amount: {totalCardAmount}</p>
        <p>Total Credit Amount: {totalCreditAmount}</p>
      </div>
      <form>
        <div className="mb-3">
          <label htmlFor="cashAmount" className="form-label">
            Cash Amount
          </label>
          <input
            type="number"
            className="form-control"
            id="cashAmount"
            name="cashAmount"
            value={payment.cashAmount}
            onChange={handlePaymentChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cardAmount" className="form-label">
            Card Amount
          </label>
          <input
            type="number"
            className="form-control"
            id="cardAmount"
            name="cardAmount"
            value={payment.cardAmount}
            onChange={handlePaymentChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="creditAmount" className="form-label">
            Credit Amount
          </label>
          <input
            type="number"
            className="form-control"
            id="creditAmount"
            name="creditAmount"
            value={payment.creditAmount}
            onChange={handlePaymentChange}
          />
        </div>
      </form>
      <table className="table mt-5 border table-striped">
        <thead>
          <tr>
            <th scope="col">Item Description</th>
            <th scope="col">Item Rate</th>
            <th scope="col">Item Quantity</th>
            <th scope="col">Item Discount</th>
            <th scope="col">Item Net Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => (
            <tr key={index}>
              <td>{invoice.itemDescription}</td>
              <td>{invoice.itemRate}</td>
              <td>{invoice.itemQuantity}</td>
              <td>{invoice.itemDiscount}</td>
              <td>{invoice.itemNetAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceBill;
