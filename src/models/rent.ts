import { model, Schema, Model, Document } from 'mongoose'

interface IRentDocument extends Document {
  client: Schema.Types.ObjectId
  car: Schema.Types.ObjectId,
  usedFor: string,
  rentTime: Date,
  timeToReturn: Date,

}

interface IRent {
  client: string
  car: Schema.Types.ObjectId,
  usedFor: string,
  rentTime: Date,
  timeToReturn: Date,
}

const RentSchema = new Schema<IRentDocument>({
  client:{
    type: Schema.Types.ObjectId,
    required:true
  },
  car:{ 
    type:Schema.Types.ObjectId,
    required:true
  },
  usedFor:{
    type:String,
    required:true
  },
  rentTime:{
    type:Date,
    required:true
  },
  timeToReturn:{
   type:Date,
   required:true
  }
})


const Rent: Model<IRentDocument> = model('Rent', RentSchema);

export {Rent, IRent, IRentDocument}