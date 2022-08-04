//import AppError from '../utils/appError'
import { AppError } from '@utils/appError';
import { NextFunction } from 'express';
import { User, IUser, IUserDocument } from '../models/user'

export const SignUp = async (user: IUser) => {
  const passwordChangedAt = user.passwordChangedAt ? user.passwordChangedAt : null;
  const role = user.role ? user.role : 'user';

  const newUser: IUserDocument = await User.create({
    name: user.name,
    surname: user.surname,
    email: user.email,
    password: user.password,
    passwordConfirm: user.passwordConfirm,
    passwordChangedAt: passwordChangedAt,
    termsAndAgree: user.termsAndAgree,
    birth: user.birth,
    phoneNumber: user.phoneNumber,
    role: role
  });

  return newUser;

};

export const Login = async (body: IUser, next: NextFunction) => {
  const { email, password } = body;

  //1) Check if email and password actually exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  //2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  return user
}

