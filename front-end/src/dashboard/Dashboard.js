import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError); 
    return () => abortController.abort();
  }
  const history = useHistory()

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <section>
      {JSON.stringify(reservations)}
      </section>
      <div>
        <Link to={`/`}>Today</Link>
        <button onClick={() => history.push(`dashboard?date=${previous(date)}`)}>Previous</button>
        <button onClick={() => history.push(`dashboard?date=${next(date)}`)}>Next</button>
      </div>

    </main>
  );
}

export default Dashboard;
