//import AppError from '../utils/appError'
import Stripe from 'stripe';
import { stripeConfig } from '@config/index'
import { ICarDocument } from 'src/models/car';
import { Request } from 'express-serve-static-core';

const stripe = new Stripe(stripeConfig.PRIVATE_KEY, { apiVersion: '2022-08-01' });

export const getCheckoutSession = async (req: Request, car: ICarDocument) => {

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?car=${car._id}&user=${req.body.user.id}&price=${car.dailyRentPrice}`,
    cancel_url: `${req.protocol}://${req.get('host')}`,
    customer_email: req.body.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        price_data: {
          currency: "brl",
          unit_amount: car.dailyRentPrice * 100,
          product_data: {
            name: `${car.model} Car`,
          },
        },
        quantity: 1,
      }
    ],
    mode:'payment'
  })

  return session

};
