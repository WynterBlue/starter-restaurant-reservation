import React, { useState } from "react";
import { createReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";
// this is a change

function NewReservation(){
    let initialFormData = {
        first_name: '',
        last_name: '',
        mobile_number: '',
        reservation_date: '',
        reservation_time: '',
        people: ''
    }
    const [formData, setFormData] = useState(initialFormData)
    async function addReservation(newReservation) {
        await createReservation(newReservation)     

    }
    return (
        <main>
            <ReservationForm headerText={"New Reservation Page"} formData={formData} setFormData={setFormData} handleSubmit={addReservation}/>
        </main>
    )
}

export default NewReservation