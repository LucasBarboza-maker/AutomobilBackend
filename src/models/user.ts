import { model, Schema, Model, Document } from 'mongoose'

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
  isUserIdentified?: boolean,
  lastModificationDate?: Date,
  passwordChangedAt?: Date,
  role?: string
}

const UserSchema = new Schema<IUser>({
  name: {type: String, required: true},
  surname: {type: String, required: true},
  email: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  birth: {type: Date, required: true},
  password: {type: String, required: true},
  passwordConfirm: {type: String},
  photo: {type: String},
  termsAndAgree: {type: Boolean, required:true},
  isUserIdentified: {type: Boolean, default:false},
  lastModificationDate:{type:Date, default: new Date()},
  passwordChangedAt: {type:Date, default: new Date()},
  role: {type: String, enum: ['user', 'admin'], default:'user', required:true}
})

const User: Model<IUser> = model('User', UserSchema);

export {User, IUser}
