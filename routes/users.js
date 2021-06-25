const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/SessionsController')
const usersController = require('../controllers/UsersController')

router.route('/')
  .get(usersController.myplaces)
  .post(usersController.create,
    sessionController.generateToken,
    sessionController.sendToken
    )


module.exports = router;
