const express = require('express')
let router = express.Router()

const authenticateOwner = require('../middlewares/authenticateOwner')
const applicationsController = require('../controllers/ApplicationsController')

const jwtMiddleware = require('express-jwt')
const secrets = require('../config/secrets')

router.route('/')
    .get(jwtMiddleware({secret : secrets.jwtSecret, algorithms: ['HS256']}), applicationsController.index)
    .post(applicationsController.create)

router.route('/:id')
    .delete(applicationsController.find, applicationsController.destroy)


module.exports = router