import { catchAsync } from "@utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import * as rentService from '../services/rentService';
import * as factory from '../services/handlerFactory'
import { Car } from "src/models/car";

export const getCheckoutSession = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const carId = req.params.carId
  const car = await factory.getOne(Car, {
    path: 'user',
    select: '-__v -passwordChangedAt'
  })({id:carId}, next)

  if (car.errors != undefined) {
    throw car
  }

  const session = await rentService.getCheckoutSession(req, car);

  //const url = `${req.protocol}//${req.get('host')}/me`;
  //await new Email(response, url).sendWelcome();
  res.json({
    status: 'success',
    data: session
  })
})