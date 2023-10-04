import React from "react";

function ReservationDisplay({reservation}){
    const {first_name, last_name, mobile_number, people, reservation_date, reservation_id, reservation_time} = reservation

    return (
        <div className="border">
            <div>
                <p>{first_name +" "+ last_name}</p>
                <p>{mobile_number}</p>
                <p>{people}</p>
                <p>{reservation_date + " " + reservation_time}</p>
                <p>{reservation_id}</p>
            </div>
            <div>
            <a href={`/reservations/${reservation_id}/seat`}>Seat</a>
            </div>
        </div>
    )
}

export default ReservationDisplay