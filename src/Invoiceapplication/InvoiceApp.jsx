import React, { useState } from "react";
import InvoiceForm from "./InvoiceForm";
import InvoiceList from "./InvoiceList";

const InvoiceApp = () => {
  const [invoices, setInvoices] = useState([]);

  const addInvoice = (invoice) => {
    setInvoices([...invoices, invoice]);
  };

  const deleteInvoice = (index) => {
    const newInvoices = [...invoices];
    newInvoices.splice(index, 1);
    setInvoices(newInvoices);
  };

  return (
    <div className="container">
      <h1>Invoice Generation App</h1>
      <InvoiceForm addInvoice={addInvoice} />
      <InvoiceList invoices={invoices} deleteInvoice={deleteInvoice} />
    </div>
  );
};

export default InvoiceApp;
