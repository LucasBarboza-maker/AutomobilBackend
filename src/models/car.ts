import { model, Schema, Model, Document } from 'mongoose'
import validator from 'validator';

interface ICarDocument extends Document {
  model: string,
  photos: [string],
  documentPhoto: string,
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
  cityLatLong: { lat: number, long: number },
  user: Schema.Types.ObjectId
}

interface ICar {
  model: string,
  photos: [string],
  documentPhoto: string,
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
  cityLatLong: { lat: number, long: number },
  user: Schema.Types.ObjectId
}

const CarSchema = new Schema<ICarDocument>({
  model: {
    type: String,
    required:[true, 'A user must have a model name'],
    trim: true,
  },
  photos:{ 
    type:[String],
    maxLength:3,
    minLength:3,
    required: [true, 'You must upload 3 photos of your car']
  },
  documentPhoto:{
    type:String,
    required: true
  },
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
    require:[true, 'Please, select the time unit to rent']
  },
  dailyRentPrice: {
    type: Number,
    required: [true, 'Please, you need to choose the daily price'],
    validate:[validator.isNumeric, 'Please only number in daily rent']
  },
  monthlyRentPrice:{
    type: Number,
    required: [true, 'Please, you need to choose the monthly price'],
    validate:[validator.isNumeric, 'Please only number in monthly rent']
  },
  country:{
    type:String,
    required:[true, 'Please, select a country'],
    validate:[validator.isAlpha, 'Please, only letters in country name']
  },
  region: {
    type:String,
    required:[true, 'Please, select a region(state)'],
    validate:[validator.isAlpha, 'Please, only letters in region name']
  },
  city: {
    type:String,
    required:[true, 'Please, select a city'],
    validate:[validator.isAlpha, 'Please, only letters in city name']
  },
  neighborhood: {
    type:String,
    required:[true, 'Please, select a neighborhood'],
    validate:[validator.isAlpha, 'Please, only letters in a neighborhood name']
  },
  number: {
    type:Number,
    required:[true, 'Please, select a country'],
    validate:[validator.isNumeric, 'Please, only letters in country name']
  },
  cityLatLong: { 
    lat: {type: Number, required: [true, 'Is missing latitude']}, validate:[validator.isNumeric, 'Please, only numbers in latitude'], 
    long: {type: Number, require:[true, 'Is missing longitude'], validate:[validator.isNumeric, 'Please, only numbers in longitude']} },
  user: Schema.Types.ObjectId
})


const Car: Model<ICarDocument> = model('User', CarSchema);

export {Car, ICar, ICarDocument}