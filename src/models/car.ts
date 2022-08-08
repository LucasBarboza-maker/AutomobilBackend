import { model, Schema, Model, Document } from 'mongoose'
import validator from 'validator';

interface ICarDocument extends Document {
  model: string,
 // photos: [string],
 // documentPhoto: string,
  type: string,
  fuelType: string,
  canBeUsedToJob: string,
  unityOfTimeWhichCanBeRented: string,
  dailyRentPrice: number,
  monthlyRentPrice: number,
  country: string,
  region: string,
  city: string,
  neighborhood: string,
  number: number,
  //cityLatLong: { lat: number, long: number },
  user: Schema.Types.ObjectId
}

interface ICar {
  model: string,
 // photos: [string],
 // documentPhoto: string,
  type: string,
  fuelType: string,
  canBeUsedToJob: string,
  unityOfTimeWhichCanBeRented: string,
  dailyRentPrice: number,
  monthlyRentPrice: number,
  country: string,
  region: string,
  city: string,
  neighborhood: string,
  number: number,
  //cityLatLong: { lat: number, long: number },
  user: Schema.Types.ObjectId
}

const CarSchema = new Schema<ICarDocument>({
  model: {
    type: String,
    required:[true, 'A user must have a model name'],
    trim: true,
  },
  // photos:{ 
  //   type:[String],
  //   maxLength:3,
  //   minLength:3,
  //   required: [true, 'You must upload 3 photos of your car']
  // },
  // documentPhoto:{
  //   type:String,
  //   required: true
  // },
  type:{
    type:String,
    required: [true, 'Please choose a vehicle type'],
    enum: ['car', 'van', 'motocycle']
  },
  fuelType:{
    type:String,
    required: [true, 'Please, choose a vehicle fuel'],
    enum: ['petrol', 'gas', 'diesel', 'other']
  },
  canBeUsedToJob:{
    type:String,
    required:[true, 'Please, choose the main utilization of the vehicle'],
    enum:['tour', 'job', 'both']   
  },
  unityOfTimeWhichCanBeRented:{
    type:String,
    require:[true, 'Please, select the time unit to rent'],
    enum:['daily', 'monthly', 'undefined']   
  },
  dailyRentPrice: {
    type: Number,
    required: [true, 'Please, you need to choose the daily price'],
  },
  monthlyRentPrice:{
    type: Number,
    required: [true, 'Please, you need to choose the monthly price'],
  },
  country:{
    type:String,
    required:[true, 'Please, select a country'],
    validate:[validator.isAlpha, 'Please, only letters in country name']
  },
  region: {
    type:String,
    required:[true, 'Please, select a region(state)'],
  },
  city: {
    type:String,
    required:[true, 'Please, select a city'],
  },
  neighborhood: {
    type:String,
    required:[true, 'Please, select a neighborhood'],
  },
  number: {
    type:Number,
    required:[true, 'Please, select a country'],
  },
  user: Schema.Types.ObjectId
})


const Car: Model<ICarDocument> = model('Car', CarSchema);

export {Car, ICar, ICarDocument}