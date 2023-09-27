/**
 * List handler for reservation resources
 */
const reservationService = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
/////////////////// validation
function bodyDataHas(propertyName) {
  return function (req, res, next) {
    
    const { data = {} } = req.body.data;
    if (data[propertyName] !== undefined && data[propertyName] !== '') {
      res.locals.data = data
      return next();
    }
    next({ status: 400, message: `Form must include a valid ${propertyName}` });
  };
}
///////////////////
async function list(req, res) {
  const date = req.query.date
  if (date){
    const reservations  = await reservationService.listByDate(date)
    const data = reservations.sort((a, b) =>  a.reservation_time.localeCompare(b.reservation_time))
    res.json({data})
  } else{
    const data = await reservationService.list()
    res.json({data});
  }
}


async function read(req, res, next) {
  console.log(res.params)

    const data = await reservationService.read(req.params.reservationId)
    res.json({data})
  
}

async function create(req, res, next) {
  const data = await reservationService.create(req.body.data)
  console.log(req.body)
  res.status(201).json({data})
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: asyncErrorBoundary(read),
  create: asyncErrorBoundary(create)
};
