import React from "react";

const Bill = () => {
  return (
    <div>
      <div className="invoice">
        <div className="headersec">
          <div className="head">
            <h1>Invoice</h1>
            <p>Logo Consulting Pvt Ltd</p>
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
            <h4>Invoicexcs No:</h4>
            <h4>Date:</h4>
          </div>
          <div className="details">
            <div>
              <h6>Total amount:</h6>
              <h6>Total Discount:</h6>
              <h6>Total Net amount: </h6>
            </div>
            <div>
              <h6>Total Cash amount:</h6>
              <h6>Total Card amount:</h6>
              <h6>Total Credit amount:</h6>
            </div>
          </div>
        </div>
        {/* Head section end */}
        <div className="table-responsive">
          <table className="table mt-5 border table-striped">
            <thead>
              <tr>
                <th scope="col">Invoice Date</th>
                <th scope="col">Item Description</th>
                <th scope="col">Item Rate Amount</th>
                <th scope="col">Item Quantity</th>
                <th scope="col">Item Discount</th>
                <th scope="col">Item Net Amount</th>
                {/* <th scope="col">Cash Amount</th>
                <th scope="col">Card Amount</th>
                <th scope="col">Credit Amount</th> */}
              </tr>
            </thead>
            <tbody>
              {invoice.map((item) => (
                <tr key={item.id} className="justify-content-center">
                  <td className="text-center align-middle">
                    {item.invoiceDate}
                  </td>
                  <td className="text-center align-middle">
                    {item.itemDescription}
                  </td>
                  <td className="text-center align-middle">{item.itemRate}</td>
                  <td className="text-center align-middle">
                    {item.itemQuantity}
                  </td>
                  <td className="text-center align-middle">
                    {item.itemDiscount}
                  </td>
                  <td className="text-center align-middle">
                    {item.itemNetAmount}
                  </td>
                  {/* <td className="text-center align-middle">
                    {item.cashAmount}
                  </td>
                  <td className="text-center align-middle">
                    {item.cardamount}
                  </td>
                  <td className="text-center align-middle">
                    {item.creditamount}
                  </td> */}
                  <td>
                    <button
                      type="delete"
                      className="btn btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="invoiceform">
          Form section
          {/* <form onSubmit={handleSubmit} className="mx-1 mx-md-4"> */}
          <div className="row">
            <div className="col m-2">
              <input
                type="number"
                className="form-control"
                placeholder="Cash Amount"
                name="cashAmount"
                //   value={form.cashAmount}
                //   onChange={handleChange}
                required
              />
            </div>
            <div className="col m-2">
              <input
                type="number"
                className="form-control"
                placeholder="Card Amount"
                name="cardamount"
                //   value={form.cardamount}
                //   onChange={handleChange}
                required
              />
            </div>
            <div className="col m-2">
              <input
                type="number"
                className="form-control"
                placeholder="Credit Amount"
                name="creditamount"
                //   value={form.creditamount}
                //   onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="btn-group">
            <button type="submit" className="btn m-1 btn-primary">
              Add Item
            </button>
            <button
              className="btn m-2 btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#editForm"
            >
              Preview
            </button>
          </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};

export default Bill;
