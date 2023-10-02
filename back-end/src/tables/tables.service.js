const knex = require("../db/connection")

function list() {
    return knex("tables").select("*").orderBy('table_name')
}

function create(table){
    return knex("tables")
        .insert(table)
        .returning("*")
        .then((createdTable) => createdTable[0])
}

function read(table_id){
    return knex("tables").select("*").where({table_id}).first()
}


function update(updatedTable, reservationId) {
    return knex("tables")
        .select("*")
        .where({reservation_id: reservationId })
        .update(updatedTable, "*")
}



module.exports = {
    list,
    create,
    read,
    update,
}