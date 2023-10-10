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
import "./Dashboard.css"
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
 

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);


    listTables(abortController.signal)
      .then((data) => setTables(data))
      .catch(setTablesError);

    return () => abortController.abort()
  }
  const history = useHistory();
  return (
    <main>
      <h1>Reservations</h1>
      <div className="d-md-flex mb-3 justify-content-center">
        <h4 className="mb-0">Reservations for date {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <section>
      <div className="d-flex justify-content-center"> 
          <button
            onClick={() => history.push(`dashboard?date=${previous(date)}`)}
          >
            Previous
          </button>
          <Link to={`/`}>Today</Link>
          <button onClick={() => history.push(`dashboard?date=${next(date)}`)}>
            Next
          </button>
        </div>
        <div class="d-flex justify-content-around">
          <div class="d-flex">
            {reservations.length > 0 ? (
              reservations.map((reservation) => (
                <ReservationDisplay
                  reservation={reservation}
                  loadDashboard={loadDashboard}
                />
              ))
            ) : (
              <p>There are no reservations.</p>
            )}
          </div>
          <ErrorAlert error={tablesError} />
        </div>
        <div>
        <div>
            {tables.length > 0 ? (
              tables.map((table) => (
                <TableDisplay
                  table={table}
                  setTables={setTables}
                  setTablesError={setTablesError}
                  loadDashboard={loadDashboard}
                />
              ))
            ) : (
              <p>There are no tables.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
