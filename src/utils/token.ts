import * as jwt from 'jsonwebtoken';
import {tokenInfo} from '@config/index' 
import { Response } from 'express';


interface ICookieOptions {
  expires: Date,
  httpOnly: boolean,
  secure?:boolean
}

const signToken = (id:string) => {
  return jwt.sign({ id }, tokenInfo.JWT_SECRET, {
      expiresIn: tokenInfo.JWT_EXPIRES_IN
  });
}

const createSendToken = (user:any, statusCode:number, res:Response) => {
  const token = signToken(user._id)

  const cookieOptions : ICookieOptions = {
      expires: new Date(Date.now() + tokenInfo.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
      httpOnly: true
  };

  if (process.env.NODE_ENV === 'prod') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions)

  user.password = '';
  user.passwordConfirm = '';

  res.status(statusCode).json({
      status: 'success',
      token,
      data: {
          user: user
      }
  })
}

export {createSendToken}