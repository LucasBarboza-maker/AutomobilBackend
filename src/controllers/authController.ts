import { Request, Response, NextFunction } from "express";
import { catchAsync } from '../utils/catchAsync'
import { createSendToken } from '@utils/token';
import { Document } from "mongoose";

import UserService from '../services/userService'



export const SignUp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const result:Document = await UserService.SignUp(req.body);

  if(result.errors != undefined){
    throw result
  }

  //const url = `${req.protocol}//${req.get('host')}/me`;
  //await new Email(response, url).sendWelcome();

  createSendToken(result, 201, res);
})
