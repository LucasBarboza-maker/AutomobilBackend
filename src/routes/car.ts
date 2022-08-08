import { Router } from 'express';
import * as controller from '../controllers/carController'
import * as authController from '../controllers/authController'
//const userController = require('./../controllers/userController');
//const authController = require('./../controllers/authController');


const carRouter = Router();


carRouter.route('/')
  .get(authController.protect, controller.getAllCars)
  .post(authController.protect, controller.createOne)

export {carRouter};