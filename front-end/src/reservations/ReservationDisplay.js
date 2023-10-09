import React from "react";
import { updateReservationStatus } from "../utils/api";

function ReservationDisplay({reservation, loadDashboard}){
    const {first_name, last_name, mobile_number, people, reservation_date, reservation_id, reservation_time, status} = reservation
    
    const handleSeating = () => {
        updateReservationStatus(reservation_id, "booked")
            .then(() => console.log("it worked"))
    }
    const handleCancel = () => {
        const result = window.confirm(
            "Do you want to cancel this reservation? This cannot be undone."
          );
          if (result) {
            updateReservationStatus(reservation_id, "cancelled")
            .then(() => loadDashboard())
          }
    }

    return (
        <div>
            {status !== "finished" && status !=="cancelled" && 
                    <div className="border">
                        <div>
                        {status == "booked" && (
                        <a 
                        href={`/reservations/${reservation_id}/seat`}
                        onClick={handleSeating}//change reservation to seated (PUT)
                        >
                            Seat
                        </a>
                        )
                        }
                    </div>
                    <div>
                        <p>{first_name +" "+ last_name}</p>
                        <p>{mobile_number}</p>
                        <p>{people}</p>
                        <p>{reservation_date + " " + reservation_time}</p>
                        <p>{reservation_id}</p>
                        <p data-reservation-id-status={reservation_id}>{status}</p>
                    </div>
                    <a href={`/reservations/${reservation_id}/edit`}>Edit</a>
                    <button data-reservation-id-cancel={reservation_id} onClick={handleCancel}>Cancel</button>
                </div>}
        </div>
    )
}

export default ReservationDisplay