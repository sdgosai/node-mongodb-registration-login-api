const express = require('express');
const router =  new express.Router();
const userController = require("../controller/usercontroller");

router.post('/rgister', userController.addRegisterData);
router.post('/login', userController.addLoginData);

module.exports = router;