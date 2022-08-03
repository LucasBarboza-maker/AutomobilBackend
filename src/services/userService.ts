//import AppError from '../utils/appError'
import { User, IUser } from '../models/user'

const SignUp = async (user: any) => {
  const passwordChangedAt = user.passwordChangedAt ? user.passwordChangedAt : null;
  const role = user.role ? user.role : 'user';

  const newUser: IUser = await User.create({
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

export = { SignUp }