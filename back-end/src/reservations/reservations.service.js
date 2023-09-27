const knex = require("../db/connection");

function list(){
    return knex("reservations").select("*")
}

function listByDate(date){
    return knex("reservations")
        .select("*")
        .where({reservation_date: date})
}

function read(reservationId){
    return knex("reservations")
        .select("*")
        .where({reservation_id: reservationId})
        .first()
}

module.exports = {
    list,
    listByDate,
    read
}