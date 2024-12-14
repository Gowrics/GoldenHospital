import React, { useState, useEffect } from "react";
import axios from "axios";
import InvoiceElement from "./InvoiceElement";
import InvoicePayment from "./InvoicePayment";
const ParentComponent = () => {
  const [invoice, setInvoice] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = () => {
    axios
      .get("http://localhost:8003/Invoice")
      .then((res) => {
        setInvoice(res.data);
      })
      .catch((err) => console.log("err"));
  };

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

  return (
    <div>
      <InvoiceElement
        invoice={invoice}
        fetchInvoices={fetchInvoices}
        handleDelete={handleDelete}
      />
      <InvoicePayment invoice={invoice} />
    </div>
  );
};

export default ParentComponent;
