import React, { useEffect, useState } from "react";
import { readReservation, updateReservation } from "../utils/api";
import { useHistory, useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import formatReservationDate from "../utils/format-reservation-date";

function EditReservation(){
    const history = useHistory()
    const [errorMessage, setErrorMessage] = useState(null)
    const {params} = useRouteMatch()
    const reservationId = params.reservation_id
    const [currentReservation, setCurrentReservation] = useState({})
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        mobile_number: '',
        reservation_date: '',
        reservation_time: '',
        people: ''
    })

    useEffect(() => {
        readReservation(reservationId).then((data) => {
                // setCurrentReservation(data)
                setFormData(formatReservationDate(data))
            })
    }, [reservationId])

    function handleInput(event) {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
      }

      function handleSubmit(event) {
        event.preventDefault(); // prevents page from refreshing by default
        console.log(formData); //sanity check
       updateReservation(formData).then(() => history.push(`/dashboard?date=${formData.reservation_date}`));
      }

    if (!reservationId) {
        return <p>Loading...</p>;
      }
    return(
        <main>
        <p>Edit Reservation Page</p>
         <form onSubmit={handleSubmit}> 
            <label htmlFor="first_name">
                First Name:
                <input 
                    id="first_name"
                    type="text"
                    name="first_name"
                    onChange={handleInput}
                    value={formData.first_name}
                    required
                />
            </label>
            <br/>
            <label htmlFor="last_name">
                Last Name:
                <input 
                    id="last_name"
                    type="text"
                    name="last_name"
                    onChange={handleInput}
                    value={formData.last_name}
                    required
                />
                
            </label>
            <br/>
            <label htmlFor="mobile_number">
                Mobile Number:
                <input 
                    id="mobile_number"
                    type="tel"
                    // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    placeholder="012-345-6789"
                    name="mobile_number"
                    onChange={handleInput}
                    value={formData.mobile_number}
                    required
                />                  
            </label>
            <br/>
            <label htmlFor="reservation_date">
                Reservation Date:
                <input 
                    type="date"
                    id="reservation_date"
                    name="reservation_date"
                    placeholder="Reservation Date"
                    onChange={handleInput}
                    value={formData.reservation_date}
                />                    
            </label>
            <br/>
            <label htmlFor="reservation_time">
                Reservation Time:
                <input 
                    id="reservation_time"
                    type="time"
                    name="reservation_time"
                    onChange={handleInput}
                    value={formData.reservation_time}
                    required
                />      
            </label>
            <br/>
            <label htmlFor="people">
                People:
                <input 
                    id="people"
                    type="number"
                    name="people"
                    onChange={handleInput}
                    value={formData.people}
                    required
                />  
            </label>
            <br/>
            {errorMessage && <p className="alert alert-danger">{errorMessage.message || errorMessage}</p>}
            <button type="submit">Submit</button>
            <button className="btn-danger" onClick={() => history.push(`/dashboard?date=${formData.reservation_date}`)} type="cancel">Cancel</button>
        </form>

    </main>
    )
}

export default EditReservation