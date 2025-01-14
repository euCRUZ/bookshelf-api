import mongoose from "mongoose"
import BaseError from "../errors/baseError.js"
import IncorrectReq from "../errors/IncorrectReq.js"
import ValidationError from "../errors/ValidationError.js"

const errorManipulator = (error, req, res, next) => {
  if (error instanceof mongoose.Error.CastError) {
    new IncorrectReq().sendResponse(res)
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ValidationError().sendResponse(res)
  } else {
    new BaseError().sendResponse(res)
  }
}

export default errorManipulator
