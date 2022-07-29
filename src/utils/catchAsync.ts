import { Request, Response } from 'express'

function catchAsync(fn: any) {
  return (req: Request, res: Response, next: any) => {
    fn(req, res, next).catch(next)
  };
}

export { catchAsync }