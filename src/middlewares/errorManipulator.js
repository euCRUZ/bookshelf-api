import mongoose from "mongoose"
import IncorrectReq from "../errors/IncorrectReq.js"
import ValidationError from "../errors/ValidationError.js"
import BaseError from "../errors/baseError.js"
import NotFound from "../errors/notFound.js"

const errorManipulator = (error, req, res, next) => {
  if (error instanceof mongoose.Error.CastError) {
    new IncorrectReq().sendResponse(res)
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ValidationError().sendResponse(res)
  } else if (error instanceof NotFound) {
    error.sendResponse(res)
  } else {
    new BaseError().sendResponse(res)
  }
}

export default errorManipulator
