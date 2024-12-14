import React from "react";

const InvoiceList = ({ invoices, deleteInvoice }) => {
  return (
    <div className="mt-5">
      <h2>Invoices</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Item Description</th>
            <th>Item Rate</th>
            <th>Item Quantity</th>
            <th>Item Discount</th>
            <th>Item Net Amount</th>
            <th>Actions</th>
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
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteInvoice(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;
