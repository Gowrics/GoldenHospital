import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import "datatables.net-select-dt";

DataTable.use(DT);

function Dbtable3() {
  const columns = [
    { data: "name" },
    { data: "position" },
    { data: "office" },
    { data: "extn" },
    { data: "start_date" },
    { data: "salary" },
  ];
  const rowCallback = (row, data, index) => {
    // Apply the conditional style if extn is 5407
    if (data.extn === 5407) {
      row.style.backgroundColor = "lightgreen";
    }
  };

  return (
    <DataTable
      ajax="/data.json"
      columns={columns}
      className="display"
      rowCallback={rowCallback}
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Office</th>
          <th>Extn.</th>
          <th>Start date</th>
          <th>Salary</th>
        </tr>
      </thead>
    </DataTable>
  );
}
export default Dbtable3;
