import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { listTables, updateTable } from "../utils/api";
import { readReservation } from "../utils/api";

function ReservationSeat() {
  /////////////////setup
  const history = useHistory();
  const { reservation_id } = useParams();
  const [reservation, setReservation] = useState("");
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  ///////////////////

  useEffect(() => {
    //get available tables
    listTables()
      .then((data) => {
        const freeTables = data.filter((table) => table.reservation_id == null);
        setTables(freeTables);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    //get the reservation
    readReservation(reservation_id).then((data) => setReservation(data));
    if (!reservation_id) {
      return <p>Loading...</p>;
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedTable) {
      setErrorMessage("Please select a table.");
      return;
    }
    const capacity = selectedTable.split("-")[1].trim();
    const tableId = selectedTable.split("-")[0].trim();
    if (reservation.people > Number(capacity)) {
      //check if table can seat people WIP
      setErrorMessage("Please select a bigger table.");
      return;
    }
    const requestData =  { reservation_id: reservation_id };
    updateTable(tableId, requestData)
      .then(() => {
        history.push("/dashboard");
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Failed to assign the table.");
      });
  };
  return (
    <main>
      <p>Reservation Seat</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="table_id">
          Table Number:
          <select
            id="table_id"
            name="table_id"
            onChange={(e) => setSelectedTable(e.target.value)}
            value={selectedTable}
            required
          >
            <option value="" disabled>
              Select a table
            </option>
            {tables.map((table) => (
              <option
                key={table.table_id}
                value={`${table.table_id} - ${table.capacity}`}
              >
                {table.table_name} - {table.capacity}
              </option>
            ))}
          </select>
        </label>
        <br />
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit">Submit</button>
        <button onClick={() => history.goBack()} type="cancel">Cancel</button>
      </form>
    </main>
  );
}

export default ReservationSeat;
