import {model, Schema, Model, Document, IfEquals} from 'mongoose'

interface IUser {
  name: string,
  surname: string,
  email: string,
  phoneNumber: string,
  birth: Date,
  password: string,
  confirmPassword: string,
  photo: string,
  termsAndAgree: boolean,
  isUserIdentified: boolean,
  lastModificationDate: Date,
}

const UserSchema = new Schema<IUser>({
  name: {type: String, required: true},
  surname: {type: String, required: true},
  email: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  birth: {type: Date, required: true},
  password: {type: String, required: true},
  photo: {type: String},
  termsAndAgree: {type: Boolean, required:true},
  isUserIdentified: {type: Boolean, default:false},
  lastModificationDate:{type:Date, default: new Date()},
})

const User: Model<IUser> = model('User', UserSchema);

export {User}
