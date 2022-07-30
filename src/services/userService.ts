//import AppError from '../utils/appError'
import { User, IUser } from '../models/user'

const SignUp = async (user: any) => {
  try {
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
  } catch (err) {
    console.log(err)
    return err
  }
};

export = { SignUp }