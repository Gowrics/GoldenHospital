import React, { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import InvoiceItem from "./Reusable/InvoiceItem";

const InvoiceForm = () => {
  const [state, setState] = useState({
    isOpen: false,
    currency: "₹",
    currentDate: "",
    invoiceNumber: 1,
    billTo: "",
    billToAddress: "",
    billToEmail: "",
    billFrom: "Gowri",
    billFromEmail: "gowrics2012@gmail.com",
    billFromAddress: "BasilHut,Chennai",
    notes: "",
    subTotal: "0.00",
    taxRate: 0,
    taxAmount: "0.00",
    discountRate: 0,
    discountAmount: "0.00",
  });
  const [total, setTotal] = useState(0.0);

  const [items, setItems] = useState([
    {
      id: 0,
      name: "",
      description: "",
      price: 1.0,
      quantity: 1,
    },
  ]);
  const onChange = (event) => {
    setState((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Form>
      <Row>
        <Col md={8} lg={9}>
          <Card className="d-flex p-4 p-xl-5 my-3 m-xl-4">
            <div className="d-flex flex-row justify-content-between">
              <div className="d-flex flex-row mb-3">
                <div className="mb-2">
                  <span className="fw-bold">current&nbsp;Date:&nbsp;</span>
                  <span className="current-date">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="d-flex flex-row mb-3">
                <div className="mb-2">
                  <span className="fw-bold">Invoice&nbsp;Number:&nbsp;</span>
                  <span className="current-date">{state.invoiceNumber}</span>
                </div>
              </div>
            </div>
            <hr className="my-4 " />
            <Row>
              <Col>
                <Form.Label className="fw-bold">Customer Details:</Form.Label>
                <Form.Control
                  placeholder="name"
                  value={state.billTo}
                  type="text"
                  name="billTo"
                  className="my-2"
                  onChange={onChange}
                  autoComplete="name"
                  required={true}
                />

                <Form.Control
                  placeholder="enter email"
                  value={state.billToEmail}
                  type="text"
                  name="billToEmail"
                  className="my-2"
                  onChange={onChange}
                  autoComplete="email"
                />

                <Form.Control
                  placeholder="enter address"
                  value={state.billToAddress}
                  type="text"
                  name="billToAddress"
                  className="my-2"
                  onChange={onChange}
                  autoComplete="address"
                  required={true}
                />
              </Col>
              <Col>
                <Form.Label className="fw-bold">Bill from:</Form.Label>
                <Form.Control
                  value={state.billFrom}
                  className="my-2"
                  disabled={true}
                />
                <Form.Control
                  value={state.billFromEmail}
                  className="my-2"
                  disabled={true}
                />
                <Form.Control
                  value={state.billFromAddress}
                  className="my-2"
                  disabled={true}
                />
              </Col>
            </Row>
            <InvoiceItem />
          </Card>
        </Col>
      </Row>
    </Form>
  );
};

export default InvoiceForm;
