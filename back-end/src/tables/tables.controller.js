const service = require("./tables.service");
const {readReservation} = require("../reservations/reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
///////////////////validaton
async function reservationExists(req, res, next){
    const reservation = await readReservation(res.locals.data.reservation_id)
    if(reservation){
        res.locals.reservation = reservation
      return next()
    }
    next({ status: 404, message: `Reservation ${req.body.data.reservation_id} cannot be found.` });
  }
async function tableIsValid(req, res, next) {
    const {table_id} = req.params
  const table = await service.read(table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    status: 404,
    message: `Table ${table_id} does not exist.`,
  });
}
async function validTableCapacity(req, res, next) {
    const {table} = res.locals
    const {reservation} = res.locals
    if (table.capacity >= reservation.people){
        return next()
    }
    next({ status: 400, message: `Invalid capacity.` });
}
function validateData(req, res, next) {
  const { data } = req.body;
  if (data) {
    res.locals.data = data;
    return next();
  }
  next({ status: 400, message: `Data is missing.` });
}
function validateTableName(req, res, next) {
  const { table_name } = res.locals.data;
  if (table_name !== undefined && table_name.length > 1) {
    return next();
  }
  next({ status: 400, message: `Form must include a valid table_name.` });
}
function validCapacity(req, res, next) {
  const { capacity } = res.locals.data;
  if (capacity == undefined || capacity == "" || !Number.isInteger(capacity)) {
    next({ status: 400, message: `Form must include a valid capacity.` });
  }
  return next();
}
function tableIsFree(req, res, next) {
    const {table} = res.locals
    if (!table.reservation_id){

        return next()
    }
    return next({ status: 400, message: `Table is occupied.` });
}
function tableIsOccupied(req, res, next) {
  const {table} = res.locals
  if (table.reservation_id){

      return next()
  }
  return next({ status: 400, message: `Table is not occupied.` });
}
function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data } = res.locals;
    if (data[propertyName] !== undefined && data[propertyName] !== "") {
      return next();
    }
    next({ status: 400, message: `Form must include a valid ${propertyName}` });
  };
}
///////////////////
async function list(req, res, next) {
  const data = await service.list();
  res.json({ data });
}

async function read(req, res, next){
  const data = res.locals.table
  res.json({data})
}

async function create(req, res, next) {
  const data = await service.create(res.locals.data);
  res.status(201).json({ data });
}

async function update(req, res, next) {
  const updatedTable = {
    ...req.body.data,
    table_id: res.locals.table.table_id,
    reservation_id: res.locals.data.reservation_id
  };
  const data = await service.update(updatedTable);
  res.json({ data });
}

async function destroy(req, res, next){
  const {table} = res.locals
  const result = await service.destroy(table.reservation_id)
  res.sendStatus(200)
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    validateData,
    validateTableName,
    validCapacity,
    asyncErrorBoundary(create),
  ],
  read: [tableIsValid, asyncErrorBoundary(read)],
  update: [
    validateData,
    bodyDataHas("reservation_id"),
    reservationExists,
    tableIsValid,
    validTableCapacity,
    tableIsFree,
    asyncErrorBoundary(update)
],
delete: [tableIsValid, tableIsOccupied, asyncErrorBoundary(destroy)]
};
