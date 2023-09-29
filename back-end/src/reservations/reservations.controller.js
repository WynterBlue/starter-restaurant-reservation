/**
 * List handler for reservation resources
 */
const reservationService = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
/////////////////// validation
async function reservationExists(req, res, next){
  const reservation = await reservationService.read(req.params.reservationId)
  if(reservation){
    res.locals.reservation = reservation
    return next()
  }
  next({ status: 404, message: `Reservation ${req.params.reservationId} cannot be found.` });
}
function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data } = res.locals;
    if (data[propertyName] !== undefined && data[propertyName] !== '') {
      return next();
    }
    next({ status: 400, message: `Form must include a valid ${propertyName}` });
  };
}
function validateData(req, res, next){
  const {data} = req.body
  const foundData = data
  if (foundData){
    res.locals.data = data
    return next()
  }
  next({ status: 400, message: `Data is missing.` });
}
function peopleIsValid(req, res, next){
  const { people } = res.locals.data
  if (people < 1 || !Number.isInteger(people) || !people){// test is checking for string numbers, form sends numbers as strings
      return next({
          status: 400,
          message: `'people' is not valid.`
      });
  }
  next();
}
function dateIsValid(req, res, next){
  const {reservation_date} = req.body.data
  const dateObj = new Date(reservation_date)
  const date = new Date()
  if (dateObj == 'Invalid Date'){
    next({ status: 400, message: `Invalid reservation_date.` });
  } else if (dateObj.getDay() == 1){
    next({ status: 400, message: `Sorry, we're closed on Tuesdays.` });
  } else if (dateObj < date){
    next({ status: 400, message: `Please make a reservation for a future date.` });
  }
  else {
    next()
  }
}
function timeIsValid(req, res, next){
  const {reservation_time} = req.body.data
  const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (timePattern.test(reservation_time)){
    return next()
  }
  next({ status: 400, message: `Invalid reservation_time.` });
}
///////////////////
async function list(req, res) {
  const date = req.query.date
  if (date){ //if there's a date query, list by date
    const reservations  = await reservationService.listByDate(date)
    const data = reservations.sort((a, b) =>  a.reservation_time.localeCompare(b.reservation_time))
    res.json({data})
  } else{
    const data = await reservationService.list()
    res.json({data});
  }
}


async function read(req, res, next) {
    const data = res.locals.reservation
    res.json({data})
}

async function create(req, res, next) {
  const data = await reservationService.create(req.body.data)
  res.status(201).json({data})
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [reservationExists, asyncErrorBoundary(read)],
  create: [
    validateData,
    bodyDataHas('first_name'),
    bodyDataHas('last_name'),
    bodyDataHas('mobile_number'),
    bodyDataHas('reservation_date'),
    dateIsValid,
    bodyDataHas('reservation_time'),
    timeIsValid,
    bodyDataHas('people'),
    peopleIsValid,
    asyncErrorBoundary(create)]
};
