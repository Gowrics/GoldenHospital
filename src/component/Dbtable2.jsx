import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import "datatables.net-select-dt";

DataTable.use(DT);

function Dbtable2() {
  const columns = [
    { data: "name" },
    { data: "position" },
    { data: "office" },
    { data: "extn" },
    { data: "start_date" },
    { data: "salary" },
  ];
  let xhrEvent = function (e, settings, json, xhr) {
    console.log("Ajax request:", e, settings, json, xhr);
  };

  let drawEvent = function (e) {
    console.log("Draw action", e);
  };

  return (
    <DataTable
      ajax="/data.json"
      columns={columns}
      className="display"
      onXhr={xhrEvent}
      onDraw={drawEvent}
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
export default Dbtable2;
