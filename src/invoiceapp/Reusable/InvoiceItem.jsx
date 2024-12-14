import React from "react";
import { Button, Table } from "react-bootstrap";

const InvoiceItem = () => {
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price/Rate</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
      <Button className="fw-bold"> Add Item</Button>
    </div>
  );
};

export default InvoiceItem;
