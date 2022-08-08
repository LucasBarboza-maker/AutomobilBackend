import { catchAsync } from "@utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { Car } from "src/models/car";
import * as factory from '../services/handlerFactory'

export const getAllCars = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const result = await factory.getAll(Car)(req.params, req.query)

  if(result.errors != undefined){
    throw result
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: result
    }
  });

})

export const createOne = catchAsync(async (req:Request, res: Response, next: NextFunction) => {

  const userId = req.body.user._id;
  delete req.body.user
  req.body.user = userId

  const result = await factory.createOne(Car)(req.body)

  if(result.errors != undefined){
    throw result
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: result
    }
  });

}) 