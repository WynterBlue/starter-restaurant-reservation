import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next } from "../utils/date-time";
import ReservationDisplay from "../reservations/ReservationDisplay";
import TableDisplay from "../tables/TableDisplay";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadDashboard, [date]);
  useEffect(() => {
    listTables()
      .then((data) => setTables(data))
      .catch(setTablesError);
  }, []);
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
  }
  const history = useHistory();
  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <section>
      <div class="d-flex justify-content-around">
        <div>
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <ReservationDisplay reservation={reservation} />
            ))
          ) : (
            <p>There are no reservations.</p>
          )}
        </div>
        <ErrorAlert error={tablesError} />
        <div>
          {tables.length > 0 ? (
            tables.map((table) => <TableDisplay table={table} setTables={setTables} setTablesError={setTablesError} loadDashboard={loadDashboard}/>)
          ) : (
            <p>There are no tables.</p>
          )}
        </div>
      </div>
      <div>
        <Link to={`/`}>Today</Link>
        <button
          onClick={() => history.push(`dashboard?date=${previous(date)}`)}
        >
          Previous
        </button>
        <button onClick={() => history.push(`dashboard?date=${next(date)}`)}>
          Next
        </button>
      </div>
      </section>
      
    </main>
  );
}

export default Dashboard;
