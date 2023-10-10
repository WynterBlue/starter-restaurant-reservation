import React, { useEffect, useState } from "react";
import { readReservation, updateReservation } from "../utils/api";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import formatReservationDate from "../utils/format-reservation-date";
import ReservationForm from "./ReservationForm";

function EditReservation(){
    const [currentReservation, setCurrentReservation] = useState({})

    const {params} = useRouteMatch()
    const reservationId = params.reservation_id

    useEffect(() => { //get current reservation
        readReservation(reservationId).then((data) => {
                setCurrentReservation(formatReservationDate(data))
            })
    }, [])

      async function editReservation(currentReservation) {
       updateReservation(currentReservation)
      }


    return(
        <main><ReservationForm headerText={"Edit Reservation Page"} formData={currentReservation} setFormData={setCurrentReservation} handleSubmit={editReservation}/></main>
    )
}

export default EditReservation