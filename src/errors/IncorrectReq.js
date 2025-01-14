import BaseError from "./baseError.js"

class IncorrectReq extends BaseError {
  constructor(message = "One or more provided data are incorrect") {
    super(message, 400)
  }
}

export default IncorrectReq
