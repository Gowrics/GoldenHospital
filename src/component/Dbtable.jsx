import { useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { Button } from "react-bootstrap";

DataTable.use(DT);

function Dbtable() {
  // Demo data
  const [tableData, setTableData] = useState([
    [
      "Tiger Nixon",
      "System Architect",
      "Edinburgh",
      "5421",
      "2011-04-25",
      "$320,800",
    ],
    [
      "Garrett Winters",
      "Accountant",
      "Tokyo",
      "8422",
      "2011-07-25",
      "$170,750",
    ],
    [
      "Ashton Cox",
      "Junior Technical Author",
      "San Francisco",
      "1562",
      "2009-01-12",
      "$86,000",
    ],
    [
      "Cedric Kelly",
      "Senior Javascript Developer",
      "Edinburgh",
      "6224",
      "2012-03-29",
      "$433,060",
    ],
  ]);
  const doClick = () => {
    alert("hiiii");
  };
  // const nextTableData = tableData.slice();

  // nextTableData.push({
  //   move: nextTableData.length + 1,
  //   player: xIsNext ? "X" : "0",
  //   position: idx,
  //   time: new Date(),
  // });

  // setTableData(nextTableData);
  return (
    <>
      <div>
        <h1>Simple table</h1>
        <a href="https://datatables.net">DataTable</a> in a React application.
        Full documentation is{" "}
        <a href="https://datatables.net/manual/react">
          available in the DataTables manual
        </a>
        <DataTable
          slots={{
            6: (data, row) => <Button onClick={doClick}>Click me!</Button>,
          }}
          data={tableData}
          className="display"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Office</th>
              <th>Extn.</th>
              <th>Start date</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
        </DataTable>
      </div>
    </>
  );
}

export default Dbtable;
