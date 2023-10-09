import React from "react";
import { updateReservationStatus } from "../utils/api";

function ReservationDisplay({ reservation, loadDashboard }) {
  const {
    first_name,
    last_name,
    mobile_number,
    people,
    reservation_date,
    reservation_id,
    reservation_time,
    status,
  } = reservation;

  const handleSeating = () => {
    updateReservationStatus(reservation_id, "booked").then(() =>
      console.log("it worked")
    );
  };
  const handleCancel = () => {
    const result = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );
    if (result) {
      updateReservationStatus(reservation_id, "cancelled").then(() =>
        loadDashboard()
      );
    }
  };

  return (
    <div>
      {status !== "finished" && status !== "cancelled" && (
        <div className="border rounded m-2">
          <div>
            <div className="d-flex text-white p-2">
              <p>{first_name + " " + last_name}</p>
              <p data-reservation-id-status={reservation_id}>{status}</p>
            </div>
            <div className="p-2">
              <p>Reserved for: {reservation_date + " " + reservation_time}</p>
              <p>Mobile Number: {mobile_number}</p>
              <p>People: {people}</p>
            </div>
          </div>
          <div className="d-flex justify-content-around">
            <a className="btn btn-primary" href={`/reservations/${reservation_id}/edit`}>Edit</a>
            <button
            className="btn btn-danger"
              data-reservation-id-cancel={reservation_id}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <div >
              {status == "booked" && (
                <a
                  className="btn btn-light "
                  href={`/reservations/${reservation_id}/seat`}
                  onClick={handleSeating} //change reservation to seated (PUT)
                >
                  Seat
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReservationDisplay;
