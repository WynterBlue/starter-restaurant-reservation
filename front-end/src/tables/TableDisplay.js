import React from "react";
import { deleteResTable } from "../utils/api";
import { listTables } from "../utils/api";

function TableDisplay({ table, setTables, setTablesError }) {
  const { table_id, table_name, reservation_id } = table;

  const handDelete = (id) => {
    const result = window.confirm("Is this table ready to seat new guests? This cannot be undone.")
    if(result){
        deleteResTable(id) //remove reservation_id
        .then(() => listTables() //get tables again
        .then((data) => setTables(data))
        .catch(setTablesError))
        //change reservation status to finished US-06
    }
}
console.log(reservation_id)
  return (
    <div className="border">
      <p>{table_name}</p>
      {reservation_id ? (
        <div>
          <p data-table-id-status={table_id}>Occupied</p>
          <button data-table-id-finish={table_id} onClick={() => handDelete(table_id)}>Finish</button>
        </div>
      ) : (
        <div><p data-table-id-status={table_id}>Free</p></div>
      )}
    </div>
  );
}

export default TableDisplay;
