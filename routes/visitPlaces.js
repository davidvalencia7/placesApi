const express = require('express')
let router = express.Router()

const authenticateOwner = require('../middlewares/authenticateOwner')
const visitController = require('../controllers/VisitController')
const findPlaceMiddleware = require('../middlewares/findPlacesMiddleware')


router.route('/:id/visits')
    .get(findPlaceMiddleware, visitController.index)
    .post(findPlaceMiddleware,visitController.create)


router.route('/:visit_id')
    .delete(visitController.find, authenticateOwner, visitController.destroy)


module.exports = router