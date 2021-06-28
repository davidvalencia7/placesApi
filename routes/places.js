const express = require('express')
const { MulterError } = require('multer')

let router = express.Router()

const placesController = require('../controllers/PlacesController')

const findPlaceMiddleware = require('../middlewares/findPlacesMiddleware')
const authenticateOwner = require('../middlewares/authenticateOwner')

router.route('/')
    .get(placesController.index)
    .post(
        placesController.multerMiddleware(),
        placesController.create,
        placesController.saveImage
    )

    router.route('/:slug')
    .get(findPlaceMiddleware, placesController.show)
    .put(findPlaceMiddleware, authenticateOwner, placesController.update)
    .delete(findPlaceMiddleware, authenticateOwner, placesController.destroy)



module.exports = router