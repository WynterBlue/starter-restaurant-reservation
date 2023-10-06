import React from "react";
import { updateReservation } from "../utils/api";

function ReservationDisplay({reservation}){
    const {first_name, last_name, mobile_number, people, reservation_date, reservation_id, reservation_time, status} = reservation
    
    const handleSeating = () => {
        updateReservation(reservation_id, "booked")
            .then(() => console.log("it worked"))
    }

    return (
        <div>
            {status !== "finished" && 
                    <div className="border">
                    <div>
                        <p>{first_name +" "+ last_name}</p>
                        <p>{mobile_number}</p>
                        <p>{people}</p>
                        <p>{reservation_date + " " + reservation_time}</p>
                        <p>{reservation_id}</p>
                        <p data-reservation-id-status={reservation_id}>{status}</p>
                    </div>
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
                </div>}
        </div>
    )
}

export default ReservationDisplay