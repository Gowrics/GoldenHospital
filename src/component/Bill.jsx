import React from "react";

const Bill = () => {
    const [form1, setForm1] = useState({
      invoiceId: "1e33",
      invoiceDate: new Date().toLocaleDateString(),
      cashAmount: "",
      cardamount: "0",
      creditamount: "0",
      totalCashAmount: "5400.00",
      totalCardAmount: "0.00",
      totalCredid: "0.00",
      totalAmount: 0,
      totalDiscount: 0,
      totalNetAmount: 0,
    });
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      let newForm1 = { ...form1, [name]: value };
  
      // if (name === "itemRate" || name === "itemQuantity") {
      //   const itemRate =
      //     name === "itemRate" ? parseFloat(value) : parseFloat(form.itemRate);
      //   const itemQuantity =
      //     name === "itemQuantity"
      //       ? parseFloat(value)
      //       : parseFloat(form.itemQuantity);
      //   const itemDiscount = (itemRate * itemQuantity * 10) / 100;
      //   const itemNetAmount = itemRate * itemQuantity - itemDiscount;
  
      //   newForm = {
      //     ...newForm,
      //     itemDiscount: itemDiscount.toFixed(2),
      //     itemNetAmount: itemNetAmount.toFixed(2),
      //   };
      // }
  
      setForm1(newForm1);
    };
  

    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Calculate the new item net amount
      // const itemNetAmount = parseFloat(form.itemNetAmount);
      // const itemDiscount = parseFloat(form.itemDiscount);
  
      const cashAmount = parseFloat(form1.cashAmount);
      const cardamount = parseFloat(form1.cardamount);
      const creditamount = parseFloat(form1.creditamount);
  
      // Fetch the current total amount from the server
      axios
        .get("http://localhost:8003/Payment")
        .then((res) => {
          const currentInvoices = res.data;
  
          // Get the latest invoice's total amount if exists
          const lastInvoice =
            currentInvoices.length > 0
              ? currentInvoices[currentInvoices.length - 1]
              : {};
  
          // Ensure default values if fields are missing
          // const currentTotalAmount = parseFloat(lastInvoice.totalAmount) || 0;
          // const currentDisAmount = parseFloat(lastInvoice.totalDiscount) || 0;
          // const currentNetAmount = parseFloat(lastInvoice.totalNetAmount) || 0;
  
          const currentCashAmount = parseFloat(lastInvoice.totalCashAmount) || 0;
          const currentCardAmount = parseFloat(lastInvoice.totalCardAmount) || 0;
          const currentCreditAmount = parseFloat(lastInvoice.totalCredid) || 0;
  
          // Calculate the new total amounts
          // const newTotalAmount = currentTotalAmount + itemNetAmount;
          // const newDisAmount = currentDisAmount + itemDiscount;
          // const newNetAmount = currentNetAmount + itemNetAmount;
  
          const newCashAmount = currentCashAmount + cashAmount;
          const newCardAmount = currentCardAmount + cardamount;
          const newCreditAmount = currentCreditAmount + creditamount;
  
          // Create the newUser object with the updated total amounts
          const newUser = {
            ...form1,
            totalAmount: newTotalAmount.toFixed(2),
            totalDiscount: newDisAmount.toFixed(2),
            totalNetAmount: newNetAmount.toFixed(2),
            // totalCashAmount: newCashAmount.toFixed(2),
            // totalCardAmount: newCardAmount.toFixed(2),
            // totalCredid: newCreditAmount.toFixed(2),
          };
  
          console.log("New Total Amount:", newTotalAmount);
  
          axios
            .post("http://localhost:8003/Payment", newUser)
            .then((res) => {
              console.log("Form submitted successfully:", newUser);
              alert("Form Submitted Successfully.");
              fetchInvoices(); // Fetch the updated invoice list after submission
  
              // Clear the form
              setForm1({
                itemDescription: "",
                itemRate: "",
                itemQuantity: "",
                itemDiscount: "",
                itemNetAmount: "",
                totalAmount: 0,
              });
            })
            .catch((err) => {
              console.error("Error submitting form:", err);
              alert("Form submission failed. Please try again.");
            });
        })
        .catch((err) => {
          console.error("Error fetching current invoices:", err);
        });
    };
  

    
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
          <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Bill;
