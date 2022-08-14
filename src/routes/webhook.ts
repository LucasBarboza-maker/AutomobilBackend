import { Router, raw } from 'express';
import * as controller from '../controllers/webHookController'
//const userController = require('./../controllers/userController');
//const authController = require('./../controllers/authController');


const webHookRouter = Router();


webHookRouter.route('/')
  .post(raw({type: 'application/json'}), controller.webhookHandle)

export {webHookRouter};