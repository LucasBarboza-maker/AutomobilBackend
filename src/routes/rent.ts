import { Router } from 'express';
import * as controller from '../controllers/rentController'
import * as authController from '../controllers/authController'
//const userController = require('./../controllers/userController');
//const authController = require('./../controllers/authController');


const rentRouter = Router();


rentRouter.route('/checkout/:carId')
  .post(authController.protect, controller.getCheckoutSession)

export {rentRouter};