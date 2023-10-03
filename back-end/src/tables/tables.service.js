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


function update(updatedTable) {
    return knex("tables")
        .select("*")
        .where({table_id: updatedTable.table_id })
        .update(updatedTable, "*")
}



module.exports = {
    list,
    create,
    read,
    update,
}