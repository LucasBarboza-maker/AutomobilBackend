import { Request, Response } from "express";
import { catchAsync } from '../utils/catchAsync'

import UserService from '../services/userService'


export const SignUp = catchAsync(async (
  req: Request,
  res: Response
): Promise<Response> => {
  const response = await UserService.SignUp(req.body);
  return res.json(response)
})
