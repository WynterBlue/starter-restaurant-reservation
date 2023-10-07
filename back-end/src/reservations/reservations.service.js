const knex = require("../db/connection");

function search(mobile_number) {
    return knex("reservations")
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_date");
  }

function list(){
    return knex("reservations").select("*")
}

function listByDate(date){
    return knex("reservations")
        .select("*")
        .where({reservation_date: date})
        .whereNotIn("status", ["finished", "canceled"])
}

function readReservation(reservationId){
    return knex("reservations")
        .select("*")
        .where({reservation_id: reservationId})
        .first()
}

function create(reservation){
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((createdReservations) => createdReservations[0])
}

function update(reservation_id, status){
    return knex("reservations")
        .select("*")
        .where({reservation_id: reservation_id})
        .update({status: status}, "*")
        .then((updatedStatus) => updatedStatus[0])
}



module.exports = {
    list,
    listByDate,
    create,
    readReservation,
    update,
    search
}