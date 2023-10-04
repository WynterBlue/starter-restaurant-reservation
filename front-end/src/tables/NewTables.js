import React, { useState } from "react";
import { useHistory } from "react-router-dom/";
import { createTable } from "../utils/api";

function NewTable() {
  const history = useHistory();
  let initialFormData = {
    table_name: "",
    capacity: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  function handleInput(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const result = {
        ...formData,
        capacity: Number(formData.capacity)
    }
    createTable(result)
      .then(() => history.push(`/dashboard`))
      .then(() => setFormData({ ...initialFormData }))
      .catch();
  };

  return (
    <main>
      <p>New Reservation Page</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="table_name">
          Table Name:
          <input
            id="table_name"
            type="text"
            name="table_name"
            minlength="2"
            onChange={handleInput}
            value={formData.table_name}
            required
          />
        </label>
        <br />
        <label htmlFor="capacity">
          Capacity:
          <input
            id="capacity"
            type="number"
            name="capacity"
            min="1"
            onChange={handleInput}
            value={formData.capacity}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
        <button onClick={() => history.goBack()} type="cancel">
          Cancel
        </button>
      </form>
    </main>
  );
}

export default NewTable;
