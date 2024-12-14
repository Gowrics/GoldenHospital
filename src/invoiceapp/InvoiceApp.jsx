import React from "react";
import InvoiceForm from "./InvoiceForm";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const InvoiceApp = () => {
  return (
    <div className="invoiceApp d-flex flex-column aligh-item-center justify-content-center w-100">
      <Container>
        <InvoiceForm />
      </Container>
    </div>
  );
};

export default InvoiceApp;
