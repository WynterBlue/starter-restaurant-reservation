/**
 * List handler for reservation resources
 */
const reservationService = require("./reservations.service")

async function list(req, res) {
  const date = req.query.date
  if (date){
    const data = await reservationService.listByDate(date)
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

module.exports = {
  list,
  read
};
