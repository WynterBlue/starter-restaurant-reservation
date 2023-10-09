import React, { useState } from "react";
import { searchReservations } from "../utils/api";
import ReservationDisplay from "../reservations/ReservationDisplay";

function NewSearch() {
  const [searchData, setSearchData] = useState({
    mobile_number: "",
  });
  const [foundReservations, setFoundReservations] = useState([]);

  function handleInput(event) {
    const { name, value } = event.target;
    setSearchData({
      ...searchData,
      [name]: value,
    });
  }
  const handleFind = () => {
    const abortController = new AbortController();
    console.log(searchData.mobile_number)
    searchReservations(searchData.mobile_number, abortController.signal)
      .then((data) => setFoundReservations(data))
      .then(() => console.log(foundReservations));
  };
  return (
    <div>
      <label for="search">Search by Phone Number:</label>
      <input
        type="search"
        id="search"
        name="mobile_number"
        placeholder="Enter a customer's phone number"
        onChange={handleInput}
        value={searchData.mobile_number}
      />
      <button type="submit" onClick={handleFind}>Find</button>
      {foundReservations.length > 0 ? (
            foundReservations.map((reservation) => (
              <ReservationDisplay reservation={reservation} />
            ))
          ) : (
            <p>No reservations found.</p>
          )}
    </div>
  );
}

export default NewSearch;
