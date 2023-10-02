const knex = require("../db/connection");

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

module.exports = {
    list,
    listByDate,
    create,
    readReservation
}