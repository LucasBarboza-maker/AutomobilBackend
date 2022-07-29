import { AppError } from "@utils/appError";
import { Request, Response } from "express";

const handleCastErrorDB = (err: any) => {
  const message = `Invalid ${err.path}: ${err.value}.`
  return new AppError(message, 400);
}

const handleDuplicateFieldsDB = (err: any) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value! `
  return new AppError(message, 400);
}

const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
}

const handleJWTExpired = () => new AppError("Your token has expired, please log in again", 401);

const handleJWTError = () => new AppError("Invalid token. Please log in again", 401);

const sendErrorDev = (err: any, req: Request, res: Response) => {

  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    })
  }
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message
  })


}


const sendErrorProd = (err: any, req: Request, res: Response) => {
  //Operational, trusted error: send message to the client
  if (req.originalUrl.startsWith('/api')) {

    if (err.isOperational) {

      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      })

      //Programming or other unknown error: don't leak error details
    }

    //1) Log error
    console.log('Error', err);

    //2) Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong'
    })

  }


  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message
    })

    //Programming or other unknown error: don't leak error details
  }

  //1) Log error
  console.log('Error', err);

  //2) Send generic message
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later'
  })


}

function globalErrorHandler(err: any, req: Request, res: Response, next: any) {
  console.log(process.env.NODE_ENV)
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';

  if (process.env.NODE_ENV === 'dev') {
    sendErrorDev(err, req, res);

  } else if (process.env.NODE_ENV === 'prod') {

    let error = err;

    if (error.name === 'CastError') error = handleCastErrorDB(error)
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError") error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpired();

    sendErrorProd(error, req, res);

  }

}

export { globalErrorHandler }