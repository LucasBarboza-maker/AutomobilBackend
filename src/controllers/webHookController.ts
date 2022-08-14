import { catchAsync } from "@utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import { stripeConfig } from "@config/index";
import * as factory from '../services/handlerFactory'
import Stripe from 'stripe';
import { Car } from "src/models/car";
import { AppError } from "@utils/appError";
import { Rent } from "src/models/rent";

const stripe = new Stripe(stripeConfig.PRIVATE_KEY, { apiVersion: '2022-08-01' });

export const webhookHandle = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, `${sig}`, stripeConfig.WEBHOOK_LOCAL);
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  let paymentIntent: any

  switch (event.type) {
    case 'payment_intent.succeeded':
      paymentIntent = event.data.object;

      try {
        await factory.updateOne(Car)({ id: paymentIntent.metadata.car }, { rented: true }, next)
        await factory.createOne(Rent)(paymentIntent.metadata)
      } catch (err) {
        console.log(err);
      }
      break;
    default:
      next(new AppError('Event not identified', 400))

  }

})