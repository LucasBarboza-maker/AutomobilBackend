//import AppError from '../utils/appError'
import { User } from '../models/user'
import {Request, Response} from 'express'


const SignUp = (user: any) => {

  console.log(user);

  return {msg: "Teste user"}

  // const passwordChangedAt = req.body.passwordChangedAt ? req.body.passwordChangedAt : null;
  // const role = req.body.role ? req.body.role : 'user';

  // const newUser = await User.create({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password,
  //   passwordConfirm: req.body.passwordConfirm,
  //   passwordChangedAt: passwordChangedAt,
  //   role: role
  // });

  // const url = `${req.protocol}//${req.get('host')}/me`;
  // await new Email(newUser, url).sendWelcome();

  // createSendToken(newUser, 201, res);
};

export = {SignUp}