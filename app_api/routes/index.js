const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env. JWT_SECRET,
    userProperty: 'payload'
});
const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');
router 
    .route('/trips')
    .get (tripsController.tripsList)
    .post (tripsController.tripsAddTrip);
router 
    .route('/trips/:tripCode')
    .get (tripsController.tripsFindCode)
    .put(tripsController.tripsUpdateTrip);
router
    .route('/login')
    .post(authController.login)
router
    .route('/register')
    .post(authController.register)
module.exports = router;