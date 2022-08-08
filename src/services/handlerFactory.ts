import { APIFeatures } from "@utils/apiFeatures";
import { AppError } from "@utils/appError";
import { NextFunction } from "express";
import { Document, Model } from "mongoose";

export const deleteOne = (Model: any) => async (id: string, next: NextFunction) => {

  const doc = await Model.findByIdAndDelete(id)

  if (!doc) {
    return next(new AppError('No document found with that ID', 404))
  }

  return doc

}

export const updateOne = (Model: any) => async (params: any, body: any, next: any) => {

  const doc = await Model.findByIdAndUpdate(params.id, body, {
    new: true,
    runValidators: true
  })

  if (!doc) {
    return next(new AppError('No document found with that ID', 404))
  }

  return doc
};

export const createOne = (Model: any) => async (body: any) => {

  const doc:Document = await Model.create(body);

  return doc
}

export const getOne = (Model: any, popOptions: any) => async (params: any, next: NextFunction) => {
  let query = Model.findById(params.id);

  if (popOptions) query = query.populate(popOptions);
  
  const doc = await query;

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  return doc

}

export const getAll = (Model: any) => async (params: any, query: any) => {

  let filter = {};

  if (params.tourId) filter = { tour: params.tourId }


  const features = new APIFeatures(Model.find(filter), query)
    .filter()
    .sort()
    .limitFields()
    .paginate()

  const doc = await features.query;

  return doc

}