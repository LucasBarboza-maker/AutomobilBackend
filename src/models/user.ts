import { model, Schema, Model, Document } from 'mongoose'
import { myValidator } from '@utils/validators'
import validator from 'validator';
import { AppError } from '@utils/appError';

interface IUser extends Document {
  name:string,
  surname: string,
  email: string,
  phoneNumber: string,
  birth: Date,
  password: string,
  passwordConfirm: string,
  photo?: string,
  termsAndAgree: boolean,
  active?: boolean,
  lastModificationDate?: Date,
  passwordChangedAt?: Date,
  role?: string
}

const UserSchema = new Schema<IUser>({
name: {
  type: String, 
  required:[true, 'A user must have a name'],
  trim:true,
  validate: myValidator['notNumber'],
  maxlength:30
},  
  surname: {
    type: String, 
    validate: myValidator['notNumber'],
    trim:true,
    required: [true, 'A user must have a surname'],
    maxLength:30
  },
  email: {
    type: String, 
    required: true,
    validate:[validator.isEmail, 'Please, must be an valid email'],
    trim: true
  },
  phoneNumber: {
    type: String, 
    required: true,
    validate:[validator.isNumeric, 'Please only numbers in telephone']
  },
  birth: {
    type: Date, 
    required: true,
  },
  password: {
    type: String, 
    required:[true, 'A user must have a password'],
    validate:myValidator['isPassword'],
    trim:true
  },
  passwordConfirm: {
    type: String,
    required:[true, 'A user must have a password'],
    trim:true
  },
  photo: {type: String},
  termsAndAgree: {type: Boolean, required:true},
  active: {type: Boolean, default:false},
  lastModificationDate:{type:Date, default: new Date()},
  passwordChangedAt: {type:Date, default: new Date()},
  role: {type: String, enum: ['user', 'admin'], default:'user', required:true}
})

UserSchema.pre('save', function(next){
  if(this.password != this.passwordConfirm) return next(new AppError("The password doesn't match with password confirmation", 422))

  next()
})

const User: Model<IUser> = model('User', UserSchema);

export {User, IUser}
