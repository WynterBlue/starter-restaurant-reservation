import React, { useState } from "react";
import { useHistory } from "react-router-dom/";
import { createReservation } from "../utils/api";


function NewReservation(){
    const history = useHistory()
    let initialFormData = {
        first_name: '',
        last_name: '',
        mobile_number: '',
        reservation_date: '',
        reservation_time: '',
        people: ''
    }

    const [errorMessage, setErrorMessage] = useState(null)
    const [formData, setFormData] = useState(initialFormData)
    
    function handleInput(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event => {
        event.preventDefault()
        console.log("Submitted:", formData)
        if(formData.people < 1){
            setErrorMessage('Not enough people')
            return 
        }
        if(formData.reservation_date){
            const date = new Date()
            const dateString = formData.reservation_date + " " + formData.reservation_time 
            const dateObj = new Date(dateString)
            if (dateObj < date){
                setErrorMessage('Please choose a future date.')
                return
              }
              else if (dateObj.getUTCDay() == 2){
                setErrorMessage("Sorry, we're closed on Tuesdays.")
                return
              }
        }
        if(formData.reservation_time){
            const reservationTime = formData.reservation_time
            const openTime = "10:30"
            const closeResTime = "21:30"
            if(reservationTime < openTime || reservationTime > closeResTime){// if valid reservation time
                setErrorMessage(`Invalid reservation_time.`)
                return
              }
        }
        console.log(errorMessage)
        const result = {
            ...formData,
            people: Number(formData.people)
        }
        createReservation(result)
            .then(() => history.push(`/dashboard?date=${formData.reservation_date}`))
            .then(() => setFormData({...initialFormData}))
            .catch(setErrorMessage)
    })

    console.log(errorMessage) 
    return (
        <main>
            <p>New Reservation Page</p>
             <form className="" onSubmit={handleSubmit}> 
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
                        id="reservation_date"
                        type="date"
                        name="reservation_date"
                        onChange={handleInput}
                        value={formData.reservation_date}
                        required
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
                <button className="btn-danger" onClick={() => history.goBack()} type="cancel">Cancel</button>
            </form>

        </main>
    )
}

export default NewReservation