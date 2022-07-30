import { Request, Response } from "express";
import { catchAsync } from '../utils/catchAsync'
import { createSendToken } from '@utils/token';

import UserService from '../services/userService'


export const SignUp = catchAsync(async (req: Request, res: Response) => {

  const response = await UserService.SignUp(req.body);

  //const url = `${req.protocol}//${req.get('host')}/me`;
  //await new Email(response, url).sendWelcome();

  createSendToken(response, 201, res);
})
