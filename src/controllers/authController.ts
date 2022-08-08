import { Request, Response, NextFunction } from "express";
import { catchAsync } from '../utils/catchAsync'
import { createSendToken } from '@utils/token';
import { Document } from "mongoose";
import * as jwt from 'jsonwebtoken';
import * as UserService from '../services/userService';
import * as GlobalService from '../services/handlerFactory';

import { AppError } from "@utils/appError";
import { User } from "src/models/user";

export const SignUp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const result: Document = await UserService.SignUp(req.body);

  if (result.errors != undefined) {
    throw result
  }

  //const url = `${req.protocol}//${req.get('host')}/me`;
  //await new Email(response, url).sendWelcome();

  createSendToken(result, 201, res);
})

export const Login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await UserService.Login(req.body, next);

  createSendToken(result, 200, res);

})

export const protect = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401))
  }

  const decoded: any = await jwt.verify(token, `${process.env.JWT_SECRET}`)

  const freshUser = await GlobalService.getOne(User, null)({ id: decoded.id }, next);

  console.log(freshUser)

  if (!freshUser) {
    return next(new AppError('User belonging to the token no longer exist', 401));
  }

  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password! Please log in again.', 401));
  }

  freshUser.password = "",
  freshUser.passwordConfirm = ""
  
  req.body.user = freshUser;
  res.locals.user = freshUser;
  next();

})
