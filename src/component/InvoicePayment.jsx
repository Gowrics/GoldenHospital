import React from "react";

const InvoicePayment = (invoice = [], fetchInvoices, handleDelete) => {
  return (
    <div>
      <div className="headersec">
        <div className="head">
          <h1>Logo Consulting Pvt Ltd</h1>
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
          <h4>Date: </h4>
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
        </div>
      </div>
    </div>
  );
};

export default InvoicePayment;
