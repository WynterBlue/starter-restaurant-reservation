import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom/";


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

        setFormData({...initialFormData})
    })
    return (
        <main>
            <p>New Reservation Page</p>
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
                <button type="submit">Submit</button>
                <button onClick={() => history.push("/")} type="cancel">Cancel</button>
            </form>
        </main>
    )
}

export default NewReservation