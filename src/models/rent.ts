import { model, Schema, Model, Document } from 'mongoose'

interface IRentDocument extends Document {
  client: Schema.Types.ObjectId
  car: Schema.Types.ObjectId,
  usedFor:{
    type:string,
    enum:['job', 'tour', 'both']
  },
  rentTime: Date,
  timeToReturn: Date,

}