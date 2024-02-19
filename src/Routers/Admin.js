const express = require('express');

const router = express.Router();
const AdminController = require('../controller/Admin');
const passport = require('passport');

router.post('/adminLogin',AdminController.loginAdmin  )
router.post('/registerAdmin', AdminController.registerAdmin)
router.get('/logOut', passport.authenticate('jwt',{ session : false }) , AdminController.logUserOut )
router.get('/protected',  passport.authenticate('jwt' , { session : false })  ,AdminController.protectedRoot)

module.exports = router