import {model, Schema, Model, Document} from 'mongoose'

interface IUser extends Document {
  name: string,
  surname: string,
  email: string,
  phoneNumber: string,
  birth: Date,
  password: string,
  confirmPassword: string,
  photo: string,
  termsAndAgree: boolean,
  isUserIdentified: boolean
}

const UserSchema: Schema = new Schema({
  name: {type: String, required: true},
  surname: {type: String, required: true},
  email: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  birth: {type: String, required: true},
  password: {type: String, required: true},
  photo: {type: String},
  termsAndAgree: {type: Boolean, required:true},
  isUserIndetified: {type: Boolean, default:false}
})

const User: Model<IUser> = model('User', UserSchema);
